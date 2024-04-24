import type { AmalgamRequest, AmalgamResponseBody, AmalgamCommand } from "@howso/amalgam-lang/worker";
import type { Capabilities, ITraineeClient, ISessionClient } from "../capabilities/index.js";
import { AmalgamCoreResponse, prepareCoreRequest, prepareCoreResponse } from "./core.js";
import { AmalgamOptions } from "@howso/amalgam-lang/wasm";
import {
  AnalyzeRequest,
  Cases,
  CasesRequest,
  CaseCountResponse,
  FeatureAttributes,
  FeaturePredictionStats,
  FeaturePredictionStatsRequest,
  FeatureMarginalStats,
  FeatureMarginalStatsRequest,
  TrainRequest,
  TrainResponse,
  ReactRequest,
  ReactResponse,
  ReactResponseContent,
  ReactSeriesRequest,
  ReactSeriesResponse,
  ReactSeriesResponseContent,
  Session,
  SessionIdentity,
  SetAutoAnalyzeParamsRequest,
  ReactIntoFeaturesRequest,
  ReactIntoFeaturesResponse,
  ReactIntoTraineeRequest,
  ReactIntoTraineeResponse,
  FeatureContributionsRequest,
  FeatureMdaRequest,
  FeatureConviction,
  FeatureConvictionRequest,
  FeatureResidualsRequest,
  CasesRequestToJSON,
  FeatureAttributesToJSON,
  FeatureAttributesFromJSON,
  FeaturePredictionStatsFromJSON,
  FeaturePredictionStatsRequestToJSON,
  FeatureMarginalStatsFromJSON,
  FeatureMarginalStatsRequestToJSON,
  SessionToJSON,
  SetAutoAnalyzeParamsRequestToJSON,
  TrainRequestToJSON,
  ReactRequestToJSON,
  ReactResponseFromJSON,
  ReactSeriesRequestToJSON,
  ReactSeriesResponseFromJSON,
  ReactIntoFeaturesRequestToJSON,
  ReactIntoFeaturesResponseFromJSON,
  ReactIntoTraineeRequestToJSON,
  ReactIntoTraineeResponseFromJSON,
  FeatureConvictionRequestToJSON,
  FeatureContributionsRequestToJSON,
  FeatureResidualsRequestToJSON,
  FeatureMdaRequestToJSON,
  AnalyzeRequestToJSON,
  TraineeFromJSON,
} from "@howso/openapi-client/models";
import { RequiredError, mapValues } from "@howso/openapi-client/runtime";
import { v4 as uuid } from "uuid";
import { Trainee } from "../../trainees/index.js";
import { BaseClient } from "../capabilities/index.js";
import { ProblemError } from "../errors.js";
import { isNode, batcher, BatchOptions } from "../utilities/index.js";
import { FileSystemClient } from "./files.js";

export interface ClientOptions {
  trace?: boolean;
  // Browser only
  migrationsUri?: string | URL;
  camlUri?: string | URL;
  // Node only
  libPath?: string;
}

export class WasmClient extends BaseClient implements ITraineeClient, ISessionClient {
  public static readonly capabilities: Readonly<Capabilities> = {
    supportsTrainees: true,
    supportsSessions: true,
    supportsTrace: true,
    supportsFileSystem: true,
  };
  public readonly fs: FileSystemClient;

  protected readonly handle: string = "handle";
  protected activeSession?: Session;

  constructor(
    protected readonly worker: Worker,
    protected readonly options: ClientOptions,
  ) {
    super();
    if (worker == null) {
      throw new RequiredError("worker", "A worker is required to instantiate a client.");
    }
    if (options == null) {
      throw new RequiredError("options", "Client options are required.");
    }
    this.fs = new FileSystemClient(this.worker, options?.libPath);
  }

  /**
   * Execute a core entity request.
   * @param label The core label.
   * @param data The request data.
   * @param throwErrors If core errors should be thrown or returned.
   * @returns The core response object.
   */
  protected async execute<R, D = unknown>(label: string, data: D, throwErrors = true): Promise<AmalgamCoreResponse<R>> {
    const response = await this.dispatch({
      type: "request",
      command: "executeEntityJson",
      parameters: [this.handle, label, prepareCoreRequest(data)],
    });
    const result = prepareCoreResponse<R>(response);
    if (throwErrors) {
      for (const err of result.errors) {
        throw new ProblemError(err?.message || "An unknown error occurred.", err?.code);
      }
    }
    return result;
  }

  /**
   * Dispatch an Amalgam operation.
   * @param request The operation request.
   * @returns The operation response.
   */
  protected dispatch<T extends AmalgamCommand = AmalgamCommand>(
    request: AmalgamRequest<T>,
  ): Promise<AmalgamResponseBody<T>> {
    return new Promise((resolve, reject) => {
      const channel = new MessageChannel();
      channel.port1.onmessage = (ev: MessageEvent) => {
        if (ev.data?.success) {
          resolve(ev.data.body);
        } else if (ev.data) {
          const error = ev.data.error;
          if (error instanceof Error && ev.data.body?.name) {
            error.name = ev.data.body.name;
          }
          reject(error);
        } else {
          reject();
        }
      };
      if (isNode) {
        this.worker.postMessage({ data: request, ports: [channel.port2] }, [channel.port2]);
      } else {
        this.worker.postMessage(request, [channel.port2]);
      }
    });
  }
  /**
   * Automatically persist trainee object when appropriate based on persistence level.
   */
  protected async autoPersistTrainee(): Promise<void> {
    const trainee = await this.getTrainee();
    if (trainee?.persistence == "always") {
      await this.execute("save", {
        filename: this.fs.join(this.fs.libDir, "trainee.caml"),
        filepath: this.fs.libDir,
      });
    }
  }

  /**
   * Constructs trainee object from it's core metadata.
   * @returns The trainee object.
   */
  public async getTrainee(): Promise<Trainee> {
    const { content: metadata } = await this.execute<Partial<Trainee> | null>("get_metadata", {});
    if (metadata == null) {
      throw new ProblemError(`metadata not found.`);
    }
    const { content: features = {} } = await this.execute("get_feature_attributes", {});
    return TraineeFromJSON({
      features,
      name: metadata.name,
      persistence: metadata.persistence,
      metadata: metadata.metadata,
      default_action_features: metadata.default_action_features || [],
      default_context_features: metadata.default_context_features || [],
    }) as Trainee;
  }

  /**
   * Setup client.
   * Prepares the file system and initializes the worker.
   */
  public async setup(): Promise<void> {
    // Initialize the Amalgam runtime
    const options: AmalgamOptions = { trace: this.options.trace };
    const ready = await this.dispatch({
      type: "request",
      command: "initialize",
      parameters: [options],
    });

    // Ready will be false on first initialize, otherwise worker is already setup
    if (!ready) {
      // Prepare the core files
      if (isNode) {
        // NodeJS
        if (this.options.libPath == null) {
          throw new ProblemError("Setup Failed - The client requires a file path to the library files.");
        }
      } else {
        // Browsers
        if (!this.options.camlUri) {
          throw new ProblemError("Setup Failed - The client requires a URI for the entity files.");
        }

        await this.fs.mkdir(this.fs.libDir);
        await this.fs.mkdir(this.fs.traineeDir);

        if (this.options.migrationsUri != null) {
          await this.fs.mkdir(this.fs.migrationsDir);
          await this.fs.createLazyFile(
            this.fs.migrationsDir,
            "migrations.caml",
            String(this.options.migrationsUri),
            true,
            false,
          );
        }
        await this.fs.createLazyFile(this.fs.libDir, "trainee.caml", String(this.options.camlUri), true, false);
        // await this.fs.createLazyFile(
        //   this.fs.libDir,
        //   "trainee_template.caml",
        //   String(this.options.traineeEntityUri),
        //   true,
        //   false,
        // );
      }

      // Load the trainee entity
      const loaded = await this.dispatch({
        type: "request",
        command: "loadEntity",
        parameters: [
          this.handle,
          this.fs.join(this.fs.libDir, "trainee.caml"),
          // More params
          false, // persist
          true, // load_contained
          false, // escape_filename
          false, // escape_contained_filenames
          // "", // write_log
          // "", // print_log
        ],
        //         status = self.amlg.load_entity(
        // handle=trainee_id,
        // amlg_path=str(self.howso_fully_qualified_path),
      });
      if (!loaded) {
        throw new ProblemError("Failed to load the amalgam entities.");
      }
    }

    // Initialize the session
    await this.beginSession();
  }

  /**
   * Retrieves the active session.
   * @returns The session object.
   */
  public async getActiveSession(): Promise<Readonly<Session>> {
    if (this.activeSession == null) {
      return await this.beginSession();
    } else {
      return this.activeSession;
    }
  }

  /**
   * Begins a new session.
   * @param name A name for the new session.
   * @param metadata Arbitrary metadata to include in the new session.
   * @returns The session object.
   */
  public async beginSession(name = "default", metadata: Record<string, unknown> = {}): Promise<Session> {
    this.activeSession = { id: uuid(), name, metadata, created_date: new Date(), modified_date: new Date() };
    return this.activeSession;
  }

  /**
   * Get all sessions in use by trainee.
   * @returns The list of session identities.
   */
  public async getTraineeSessions(): Promise<Required<SessionIdentity>[]> {
    const { content } = await this.execute<Required<SessionIdentity>[]>("get_sessions", {
      attributes: ["id", "name"],
    });
    return content ?? [];
  }

  /**
   * Set the trainee's feature attributes.
   * @param attributes The trainee's new feature attributes.
   */
  public async setFeatureAttributes(attributes: Record<string, FeatureAttributes>): Promise<void> {
    const trainee = await this.getTrainee();
    if (attributes == null) {
      throw new TypeError("Cannot set feature attributes to null.");
    }
    const features = mapValues(attributes, FeatureAttributesToJSON);
    await this.execute("set_feature_attributes", { trainee: trainee.id, features });
    const { content = features } = await this.execute<Record<string, FeatureAttributes>>("get_feature_attributes", {
      trainee: trainee.id,
    });
    trainee.features = mapValues(content, FeatureAttributesFromJSON);
  }

  /**
   * Retrieve the trainee's feature attributes.
   * @returns The feature attributes object.
   */
  public async getFeatureAttributes(): Promise<Record<string, FeatureAttributes>> {
    const trainee = await this.getTrainee();
    const { content } = await this.execute<Record<string, FeatureAttributes>>("get_feature_attributes", {
      trainee: trainee.id,
    });
    return mapValues(content, FeatureAttributesFromJSON);
  }

  /**
   * Train data into the trainee.
   * @param request The train parameters.
   */
  public async train(request: TrainRequest): Promise<void> {
    const trainee = await this.getTrainee();
    const session = await this.getActiveSession();
    let autoAnalyze = false;

    const { cases = [], ...rest } = TrainRequestToJSON(request);

    // Add session metadata to trainee
    await this.execute("set_session_metadata", {
      trainee: trainee.id,
      session: session.id,
      metadata: SessionToJSON(session),
    });

    const batchOptions: BatchOptions = { startSize: 100 };
    if (!isNode) {
      // WASM builds are currently sensitive to large request sizes and may throw memory errors
      batchOptions.startSize = 50;
      batchOptions.limits = [1, 50];
    }

    // Batch scale the requests
    await batcher(
      async function* (this: WasmClient, size: number) {
        let offset = 0;
        while (offset < cases.length) {
          const response = await this.execute<TrainResponse | null>("train", {
            trainee: trainee.id,
            input_cases: cases.slice(offset, offset + size),
            session: session.id,
            ...rest,
          });
          if (response.content?.status === "analyze") {
            autoAnalyze = true;
          }
          offset += size;
          size = yield;
        }
      }.bind(this),
      batchOptions,
    );

    await this.autoPersistTrainee();
    if (autoAnalyze) {
      this.autoAnalyze();
    }
  }

  /**
   * Run an auto analyze on the trainee.
   */
  public async autoAnalyze(): Promise<void> {
    const trainee = await this.getTrainee();
    await this.execute("auto_analyze", { trainee: trainee.id });
    await this.autoPersistTrainee();
  }

  /**
   * Set the parameters use by auto analyze.
   * @param request The analysis parameters.
   */
  public async setAutoAnalyzeParams(request: SetAutoAnalyzeParamsRequest = {}): Promise<void> {
    const { experimental_options, ...rest } = request;
    const trainee = await this.getTrainee();
    await this.execute("set_auto_analyze_params", {
      trainee: trainee.id,
      ...SetAutoAnalyzeParamsRequestToJSON(rest),
      ...experimental_options,
    });
    await this.autoPersistTrainee();
  }

  /**
   * Analyze the trainee.
   * @param request The analysis parameters.
   */
  public async analyze(request: AnalyzeRequest = {}): Promise<void> {
    const { experimental_options, ...rest } = request;
    const trainee = await this.getTrainee();
    await this.execute("analyze", {
      trainee: trainee.id,
      ...AnalyzeRequestToJSON(rest),
      ...experimental_options,
    });
  }

  /**
   * Retrieve cases from a trainee.
   * @param request The get parameters.
   * @returns The cases response.
   */
  public async getCases(request?: CasesRequest): Promise<Cases> {
    const trainee = await this.getTrainee();
    const { content } = await this.execute<Cases>("get_cases", {
      trainee: trainee.id,
      ...CasesRequestToJSON(request),
    });
    return content;
  }

  /**
   * Retrieve the number of trained cases in a trainee.
   * @returns The number of trained cases.
   */
  public async getNumTrainingCases(): Promise<number> {
    const trainee = await this.getTrainee();
    const { content } = await this.execute<CaseCountResponse>("get_num_training_cases", { trainee: trainee.id });
    return content?.count || 0;
  }

  /**
   * React to a trainee.
   * @param request The react parameters.
   * @returns The react response.
   */
  public async react(request: ReactRequest): Promise<ReactResponse> {
    const trainee = await this.getTrainee();
    this.preprocessReactRequest(trainee, request);
    const { actions, contexts, ...rest } = ReactRequestToJSON(request);
    const { warnings = [], content } = await this.execute<ReactResponseContent>("batch_react", {
      trainee: trainee.id,
      action_values: actions,
      context_values: contexts,
      ...rest,
    });
    return ReactResponseFromJSON({ warnings, content });
  }

  /**
   * React in series to a trainee.
   * @param request The react series parameters.
   * @returns The react series response.
   */
  public async reactSeries(request: ReactSeriesRequest): Promise<ReactSeriesResponse> {
    const trainee = await this.getTrainee();
    this.preprocessReactRequest(trainee, request);
    const { actions, contexts, ...rest } = ReactSeriesRequestToJSON(request);
    const { warnings = [], content } = await this.execute<ReactSeriesResponseContent>("batch_react_series", {
      trainee: trainee.id,
      action_values: actions,
      context_values: contexts,
      ...rest,
    });
    return ReactSeriesResponseFromJSON({ warnings, content });
  }

  /**
   * Calculate metrics and store them into the model to the specified features.
   * @param request The react into features request.
   * @returns The react into features response.
   */
  public async reactIntoFeatures(request: ReactIntoFeaturesRequest): Promise<ReactIntoFeaturesResponse> {
    const trainee = await this.getTrainee();
    const { warnings = [] } = await this.execute<never>("react_into_features", {
      trainee: trainee.id,
      ...ReactIntoFeaturesRequestToJSON(request),
    });
    return ReactIntoFeaturesResponseFromJSON({ warnings });
  }

  /**
   * Compute and cache specified feature interpretations.
   * @param request The react into trainee request.
   * @returns The react into trainee response.
   */
  public async reactIntoTrainee(request: ReactIntoTraineeRequest): Promise<ReactIntoTraineeResponse> {
    const trainee = await this.getTrainee();
    const { warnings = [] } = await this.execute<never>("react_into_trainee", {
      trainee: trainee.id,
      ...ReactIntoTraineeRequestToJSON(request),
    });
    return ReactIntoTraineeResponseFromJSON({ warnings });
  }

  /**
   * Get prediction stats of a trainee.
   * @param request The prediction stats request.
   * @returns The prediction stats.
   */
  public async getPredictionStats(request: FeaturePredictionStatsRequest): Promise<FeaturePredictionStats> {
    const trainee = await this.getTrainee();
    const { content, warnings = [] } = await this.execute<never>("get_prediction_stats", {
      trainee: trainee.id,
      ...FeaturePredictionStatsRequestToJSON(request),
    });
    return FeaturePredictionStatsFromJSON({ content, warnings });
  }

  /**
   * Get marginal stats of a trainee.
   * @param request The marginal stats request.
   * @returns The marginal stats.
   */
  public async getMarginalStats(request: FeatureMarginalStatsRequest): Promise<FeatureMarginalStats> {
    const trainee = await this.getTrainee();
    const { content, warnings = [] } = await this.execute<never>("get_marginal_stats", {
      trainee: trainee.id,
      ...FeatureMarginalStatsRequestToJSON(request),
    });
    return FeatureMarginalStatsFromJSON({ content, warnings });
  }

  /**
   * Get familiarity conviction for features.
   * @param request The feature conviction request.
   * @returns A map of metric name to value.
   */
  public async getFeatureConviction(request: FeatureConvictionRequest): Promise<FeatureConviction> {
    const trainee = await this.getTrainee();
    const { content } = await this.execute<Record<string, number>>("compute_conviction_of_features", {
      trainee: trainee.id,
      ...FeatureConvictionRequestToJSON(request),
    });
    return content;
  }

  /**
   * Get contributions for features.
   * @deprecated Use getPredictionStats instead.
   * @param request The feature contributions request.
   * @returns A map of feature name to contribution value.
   */
  public async getFeatureContributions(request: FeatureContributionsRequest): Promise<Record<string, number>> {
    const trainee = await this.getTrainee();
    const { content } = await this.execute<Record<string, number>>("get_feature_contributions", {
      trainee: trainee.id,
      ...FeatureContributionsRequestToJSON(request),
    });
    return content;
  }

  /**
   * Get residuals for features.
   * @deprecated Use getPredictionStats instead.
   * @param request The feature residuals request.
   * @returns A map of feature name to residual value.
   */
  public async getFeatureResiduals(request: FeatureResidualsRequest): Promise<Record<string, number>> {
    const trainee = await this.getTrainee();
    const { content } = await this.execute<Record<string, number>>("get_feature_residuals", {
      trainee: trainee.id,
      ...FeatureResidualsRequestToJSON(request),
    });
    return content;
  }

  /**
   * Get mean decrease in accuracy for features.
   * @deprecated Use getPredictionStats instead.
   * @param request The feature MDA request.
   * @returns A map of feature name to MDA value.
   */
  public async getFeatureMda(request: FeatureMdaRequest): Promise<Record<string, number>> {
    const trainee = await this.getTrainee();
    const { content } = await this.execute<Record<string, number>>("get_feature_mda", {
      trainee: trainee.id,
      ...FeatureMdaRequestToJSON(request),
    });
    return content;
  }

  /**
   * Preprocess a request for react or react series.
   * @param trainee The trainee identifier.
   * @param request The react request.
   */
  private preprocessReactRequest(trainee: Trainee, request: ReactRequest | ReactSeriesRequest): void {
    if (request.desired_conviction == null) {
      if (request.action_features == null) {
        request.action_features = trainee.default_action_features;
      }
      if (request.context_features == null) {
        request.context_features = trainee.default_context_features;
      }
    }
  }
}
