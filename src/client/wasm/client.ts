import type {
  AmalgamRequest,
  AmalgamResponseBody,
  AmalgamCommand,
  AmalgamCoreResponse,
} from "@howso/amalgam-lang/worker";
import type { Capabilities, ITraineeClient, ISessionClient } from "../capabilities/index.js";

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
  TraineeIdentity,
  ReactGroupRequest,
  ReactGroupResponse,
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
  TraineeToJSON,
  TraineeFromJSON,
  TrainRequestToJSON,
  ReactRequestToJSON,
  ReactResponseFromJSON,
  ReactSeriesRequestToJSON,
  ReactSeriesResponseFromJSON,
  ReactGroupRequestToJSON,
  ReactGroupResponseFromJSON,
  ReactIntoFeaturesRequestToJSON,
  ReactIntoFeaturesResponseFromJSON,
  ReactIntoTraineeRequestToJSON,
  ReactIntoTraineeResponseFromJSON,
  FeatureConvictionRequestToJSON,
  FeatureContributionsRequestToJSON,
  FeatureResidualsRequestToJSON,
  FeatureMdaRequestToJSON,
  AnalyzeRequestToJSON,
  ReactGroupResponseContent,
} from "@howso/openapi-client/models";
import { RequiredError, mapValues } from "@howso/openapi-client/runtime";
import { v4 as uuid } from "uuid";

import { Trainee } from "../../trainees/index.js";
import { BaseClient, TraineeBaseCache } from "../capabilities/index.js";
import { ProblemError } from "../errors.js";
import { CacheMap, isNode, batcher, BatchOptions } from "../utilities/index.js";
import { FileSystemClient } from "./files.js";

export interface TraineeCache extends TraineeBaseCache {
  entityId: string;
}

export interface ClientOptions {
  trace?: boolean;
  // Browser only
  migrationsUri?: string | URL;
  coreEntityUri?: string | URL;
  traineeEntityUri?: string | URL;
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

  protected readonly traineeCache: CacheMap<TraineeCache>;
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
    this.traineeCache = new CacheMap<TraineeCache>();
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
    const response = (await this.dispatch({
      type: "request",
      command: "executeEntityJson",
      parameters: [this.handle, label, data],
    })) as AmalgamCoreResponse<R>;
    if (throwErrors) {
      for (const err of response.errors) {
        throw new ProblemError(err?.message || "An unknown error occurred.", err?.code);
      }
    }
    return response;
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
   * Automatically resolve a trainee and ensure it is loaded given an identifier.
   * @param traineeId The trainee identifier.
   * @returns The trainee object.
   */
  protected async autoResolveTrainee(traineeId: string): Promise<Trainee> {
    if (traineeId == null) {
      throw new TypeError("A trainee identifier is required.");
    }
    if (!this.traineeCache.has(traineeId)) {
      await this.acquireTraineeResources(traineeId);
    }
    const cached = this.traineeCache.get(traineeId);
    if (cached == null) {
      throw new ProblemError(`Trainee "${traineeId}" not found.`);
    }
    return cached.trainee;
  }

  /**
   * Automatically persist trainee object when appropriate based on persistence level.
   * @param traineeId The trainee identifier.
   */
  protected async autoPersistTrainee(traineeId: string): Promise<void> {
    const cached = this.traineeCache.get(traineeId);
    if (cached?.trainee?.persistence == "always") {
      await this.execute("save", {
        trainee: traineeId,
        filename: this.fs.sanitizeFilename(traineeId),
        filepath: this.fs.traineeDir,
      });
    }
  }

  /**
   * Retrieve the trainees that are currently loaded in core.
   * @returns List of trainee identifiers.
   */
  protected async loadedTrainees(): Promise<string[]> {
    const { content = [] } = await this.execute<string[]>("get_loaded_trainees", {});
    return content;
  }

  /**
   * Constructs trainee object from it's core metadata.
   * @param traineeId The trainee identifier.
   * @returns The trainee object.
   */
  protected async getTraineeFromCore(traineeId: string): Promise<Trainee> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { content: metadata } = await this.execute<Partial<Trainee> | null>("get_metadata", { trainee: traineeId });
    if (metadata == null) {
      throw new ProblemError(`Trainee ${traineeId} not found.`);
    }
    const { content: features = {} } = await this.execute("get_feature_attributes", { trainee: traineeId });
    return TraineeFromJSON({
      features,
      id: traineeId,
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
        if (this.options.coreEntityUri == null || this.options.traineeEntityUri == null) {
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
        await this.fs.createLazyFile(this.fs.libDir, "howso.caml", String(this.options.coreEntityUri), true, false);
        await this.fs.createLazyFile(
          this.fs.libDir,
          "trainee_template.caml",
          String(this.options.traineeEntityUri),
          true,
          false,
        );
      }

      // Load the core entity
      // TODO - Call getEntities to check if loaded or not
      const loaded = await this.dispatch({
        type: "request",
        command: "loadEntity",
        parameters: [this.handle, this.fs.join(this.fs.libDir, "howso.caml")],
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
   * @param traineeId The trainee identifier.
   * @returns The list of session identities.
   */
  public async getTraineeSessions(traineeId: string): Promise<Required<SessionIdentity>[]> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const { content } = await this.execute<Required<SessionIdentity>[]>("get_sessions", {
      trainee: trainee.id,
      attributes: ["id", "name"],
    });
    return content ?? [];
  }

  /**
   * Acquire resources for a trainee.
   * @param traineeId The trainee identifier.
   * @param uri A URI to the trainee file.
   */
  public async acquireTraineeResources(traineeId: string, uri?: string): Promise<void> {
    if (this.traineeCache.has(traineeId)) {
      // Already acquired
      return;
    }

    if (uri) {
      // Prepare the file on the virtual file system
      await this.fs.createLazyFile(this.fs.traineeDir, `${this.fs.sanitizeFilename(traineeId)}.caml`, uri, true, false);
    }

    // Load trainee only if entity not already in core
    const loaded = await this.loadedTrainees();
    if (loaded.indexOf(traineeId) == -1) {
      // Only call load if not already loaded
      await this.execute("load", {
        trainee: traineeId,
        filename: this.fs.sanitizeFilename(traineeId),
        filepath: this.fs.traineeDir,
      });
    }

    // Cache the trainee
    const trainee = await this.getTraineeFromCore(traineeId);
    this.traineeCache.set(traineeId, { trainee, entityId: this.handle });
  }

  /**
   * Releases resources for a trainee.
   * @param traineeId The trainee identifier.
   */
  public async releaseTraineeResources(traineeId: string): Promise<void> {
    if (traineeId == null) {
      throw new ProblemError("A trainee id is required.");
    }

    // Check if trainee already loaded
    const cached = this.traineeCache.get(traineeId);
    if (cached?.entityId == this.handle) {
      if (["allow", "always"].indexOf(String(cached.trainee.persistence)) != -1) {
        // Auto save the trainee
        await this.execute("save", {
          trainee: traineeId,
          filename: this.fs.sanitizeFilename(traineeId),
          filepath: this.fs.traineeDir,
        });
      } else if (cached.trainee.persistence == "never") {
        throw new ProblemError(
          "Trainees set to never persist may not have their resources released. Delete the trainee instead.",
        );
      }
    }
    this.traineeCache.discard(traineeId);
    await this.execute("delete", { trainee: traineeId });
  }

  /**
   * Create a new trainee.
   * @param trainee The trainee identifier.
   * @returns The new trainee object.
   */
  public async createTrainee(trainee: Omit<Trainee, "id">): Promise<Trainee> {
    const traineeId = trainee.name || uuid();

    // Create the trainee entity
    const created = await this.execute<boolean>("create_trainee", {
      trainee: traineeId,
      filepath: this.fs.libDir,
      trainee_template_filename: "trainee_template",
      file_extension: "caml",
    });
    if (!created) {
      throw new ProblemError(
        `Could not create a trainee with id '${traineeId}'. Either the trainee template file was not found or the trainee already exists.`,
      );
    }
    const { features = {}, ...props } = TraineeToJSON(trainee);

    // Set trainee metadata
    const metadata = {
      name: props.name,
      metadata: props.metadata,
      default_context_features: props.default_context_features,
      default_action_features: props.default_action_features,
      persistence: props.persistence || "allow",
    };
    await this.execute("set_metadata", { trainee: traineeId, metadata });

    // Set the feature attributes
    await this.execute("set_feature_attributes", { trainee: traineeId, features });
    const { content: allFeatures = features } = await this.execute("get_feature_attributes", { trainee: traineeId });

    // Build, cache and return new trainee object
    const newTrainee: Trainee = TraineeFromJSON({ ...metadata, id: traineeId, features: allFeatures }) as Trainee;
    this.traineeCache.set(traineeId, { trainee: newTrainee, entityId: this.handle });
    return newTrainee;
  }

  /**
   * Update a trainee's properties.
   * @param _trainee The trainee identifier.
   */
  public async updateTrainee(_trainee: Trainee): Promise<Trainee> {
    throw new Error("Method not implemented.");
  }

  /**
   * Retrieve a trainee.
   * @param traineeId The trainee identifier.
   * @returns The trainee object.
   */
  public async getTrainee(traineeId: string): Promise<Trainee> {
    await this.autoResolveTrainee(traineeId);
    return await this.getTraineeFromCore(traineeId);
  }

  /**
   * Deletes a trainee.
   * @param traineeId The trainee identifier.
   */
  public async deleteTrainee(traineeId: string): Promise<void> {
    await this.execute("delete", { trainee: traineeId });
    this.traineeCache.discard(traineeId);

    const filename = this.fs.sanitizeFilename(traineeId);
    this.fs.unlink(this.fs.join(this.fs.traineeDir, `${filename}.${this.fs.entityExt}`));
    this.fs.unlink(this.fs.join(this.fs.traineeDir, `${filename}Version.txt`));
  }

  /**
   * List existing trainees.
   * @param _keywords Keywords to filter the list of trainees by.
   */
  public async listTrainees(_keywords: string | string[]): Promise<TraineeIdentity[]> {
    throw new Error("Method not implemented.");
  }

  /**
   * Set the trainee's feature attributes.
   * @param traineeId The trainee identifier.
   * @param attributes The trainee's new feature attributes.
   */
  public async setFeatureAttributes(traineeId: string, attributes: Record<string, FeatureAttributes>): Promise<void> {
    const trainee = await this.autoResolveTrainee(traineeId);
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
   * @param traineeId The trainee identifier.
   * @returns The feature attributes object.
   */
  public async getFeatureAttributes(traineeId: string): Promise<Record<string, FeatureAttributes>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const { content } = await this.execute<Record<string, FeatureAttributes>>("get_feature_attributes", {
      trainee: trainee.id,
    });
    return mapValues(content, FeatureAttributesFromJSON);
  }

  /**
   * Train data into the trainee.
   * @param traineeId The trainee identifier.
   * @param request The train parameters.
   */
  public async train(traineeId: string, request: TrainRequest): Promise<void> {
    const trainee = await this.autoResolveTrainee(traineeId);
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

    await this.autoPersistTrainee(trainee.id);
    if (autoAnalyze) {
      this.autoAnalyze(trainee.id);
    }
  }

  /**
   * Run an auto analyze on the trainee.
   * @param traineeId The trainee identifier.
   */
  public async autoAnalyze(traineeId: string): Promise<void> {
    const trainee = await this.autoResolveTrainee(traineeId);
    await this.execute("auto_analyze", { trainee: trainee.id });
    await this.autoPersistTrainee(trainee.id);
  }

  /**
   * Set the parameters use by auto analyze.
   * @param traineeId The trainee identifier.
   * @param request The analysis parameters.
   */
  public async setAutoAnalyzeParams(traineeId: string, request: SetAutoAnalyzeParamsRequest = {}): Promise<void> {
    const { experimental_options, ...rest } = request;
    const trainee = await this.autoResolveTrainee(traineeId);
    await this.execute("set_auto_analyze_params", {
      trainee: trainee.id,
      ...SetAutoAnalyzeParamsRequestToJSON(rest),
      ...experimental_options,
    });
    await this.autoPersistTrainee(traineeId);
  }

  /**
   * Analyze the trainee.
   * @param traineeId The trainee identifier.
   * @param request The analysis parameters.
   */
  public async analyze(traineeId: string, request: AnalyzeRequest = {}): Promise<void> {
    const { experimental_options, ...rest } = request;
    const trainee = await this.autoResolveTrainee(traineeId);
    await this.execute("analyze", {
      trainee: trainee.id,
      ...AnalyzeRequestToJSON(rest),
      ...experimental_options,
    });
  }

  /**
   * Retrieve cases from a trainee.
   * @param traineeId The trainee identifier.
   * @param request The get parameters.
   * @returns The cases response.
   */
  public async getCases(traineeId: string, request?: CasesRequest): Promise<Cases> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const { content } = await this.execute<Cases>("get_cases", {
      trainee: trainee.id,
      ...CasesRequestToJSON(request),
    });
    return content;
  }

  /**
   * Retrieve the number of trained cases in a trainee.
   * @param traineeId The trainee identifier.
   * @returns The number of trained cases.
   */
  public async getNumTrainingCases(traineeId: string): Promise<number> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const { content } = await this.execute<CaseCountResponse>("get_num_training_cases", { trainee: trainee.id });
    return content?.count || 0;
  }

  /**
   * React to a trainee.
   * @param traineeId The trainee identifier.
   * @param request The react parameters.
   * @returns The react response.
   */
  public async react(traineeId: string, request: ReactRequest): Promise<ReactResponse> {
    const trainee = await this.autoResolveTrainee(traineeId);
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
   * @param traineeId The trainee identifier.
   * @param request The react series parameters.
   * @returns The react series response.
   */
  public async reactSeries(traineeId: string, request: ReactSeriesRequest): Promise<ReactSeriesResponse> {
    const trainee = await this.autoResolveTrainee(traineeId);
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
   * Compute metrics for different set(s) of cases.
   * @param traineeId The trainee identifier.
   * @param request The react group request.
   * @returns The metric results for each set of cases.
   */
  public async reactGroup(traineeId: string, request: ReactGroupRequest): Promise<ReactGroupResponse> {
    const trainee = await this.autoResolveTrainee(traineeId);
    if (Array.isArray(request?.trainees_to_compare)) {
      // Ensure all trainees being compared are available
      for (const otherTraineeId of request.trainees_to_compare) {
        await this.autoResolveTrainee(otherTraineeId);
      }
    }
    const { warnings = [], content } = await this.execute<ReactGroupResponseContent>("batch_react_group", {
      trainee: trainee.id,
      ...ReactGroupRequestToJSON(request),
    });
    return ReactGroupResponseFromJSON({ warnings, content });
  }

  /**
   * Calculate metrics and store them into the model to the specified features.
   * @param traineeId The trainee identifier.
   * @param request The react into features request.
   * @returns The react into features response.
   */
  public async reactIntoFeatures(
    traineeId: string,
    request: ReactIntoFeaturesRequest,
  ): Promise<ReactIntoFeaturesResponse> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const { warnings = [] } = await this.execute<never>("react_into_features", {
      trainee: trainee.id,
      ...ReactIntoFeaturesRequestToJSON(request),
    });
    return ReactIntoFeaturesResponseFromJSON({ warnings });
  }

  /**
   * Compute and cache specified feature interpretations.
   * @param traineeId The trainee identifier.
   * @param request The react into trainee request.
   * @returns The react into trainee response.
   */
  public async reactIntoTrainee(
    traineeId: string,
    request: ReactIntoTraineeRequest,
  ): Promise<ReactIntoTraineeResponse> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const { warnings = [] } = await this.execute<never>("react_into_trainee", {
      trainee: trainee.id,
      ...ReactIntoTraineeRequestToJSON(request),
    });
    return ReactIntoTraineeResponseFromJSON({ warnings });
  }

  /**
   * Get prediction stats of a trainee.
   * @param traineeId The trainee identifier.
   * @param request The prediction stats request.
   * @returns The prediction stats.
   */
  public async getPredictionStats(
    traineeId: string,
    request: FeaturePredictionStatsRequest,
  ): Promise<FeaturePredictionStats> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const { content, warnings = [] } = await this.execute<never>("get_prediction_stats", {
      trainee: trainee.id,
      ...FeaturePredictionStatsRequestToJSON(request),
    });
    return FeaturePredictionStatsFromJSON({ content, warnings });
  }

  /**
   * Get marginal stats of a trainee.
   * @param traineeId The trainee identifier.
   * @param request The marginal stats request.
   * @returns The marginal stats.
   */
  public async getMarginalStats(
    traineeId: string,
    request: FeatureMarginalStatsRequest,
  ): Promise<FeatureMarginalStats> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const { content, warnings = [] } = await this.execute<never>("get_marginal_stats", {
      trainee: trainee.id,
      ...FeatureMarginalStatsRequestToJSON(request),
    });
    return FeatureMarginalStatsFromJSON({ content, warnings });
  }

  /**
   * Get familiarity conviction for features.
   * @param traineeId The trainee identifier.
   * @param request The feature conviction request.
   * @returns A map of metric name to value.
   */
  public async getFeatureConviction(traineeId: string, request: FeatureConvictionRequest): Promise<FeatureConviction> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const { content } = await this.execute<Record<string, number>>("compute_conviction_of_features", {
      trainee: trainee.id,
      ...FeatureConvictionRequestToJSON(request),
    });
    return content;
  }

  /**
   * Get contributions for features.
   * @deprecated Use getPredictionStats instead.
   * @param traineeId The trainee identifier.
   * @param request The feature contributions request.
   * @returns A map of feature name to contribution value.
   */
  public async getFeatureContributions(
    traineeId: string,
    request: FeatureContributionsRequest,
  ): Promise<Record<string, number>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const { content } = await this.execute<Record<string, number>>("get_feature_contributions", {
      trainee: trainee.id,
      ...FeatureContributionsRequestToJSON(request),
    });
    return content;
  }

  /**
   * Get residuals for features.
   * @deprecated Use getPredictionStats instead.
   * @param traineeId The trainee identifier.
   * @param request The feature residuals request.
   * @returns A map of feature name to residual value.
   */
  public async getFeatureResiduals(
    traineeId: string,
    request: FeatureResidualsRequest,
  ): Promise<Record<string, number>> {
    const trainee = await this.autoResolveTrainee(traineeId);
    const { content } = await this.execute<Record<string, number>>("get_feature_residuals", {
      trainee: trainee.id,
      ...FeatureResidualsRequestToJSON(request),
    });
    return content;
  }

  /**
   * Get mean decrease in accuracy for features.
   * @deprecated Use getPredictionStats instead.
   * @param traineeId The trainee identifier.
   * @param request The feature MDA request.
   * @returns A map of feature name to MDA value.
   */
  public async getFeatureMda(traineeId: string, request: FeatureMdaRequest): Promise<Record<string, number>> {
    const trainee = await this.autoResolveTrainee(traineeId);
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
