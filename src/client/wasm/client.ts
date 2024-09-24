import type { Session, Trainee } from "@/types";
import {
  AmalgamError,
  type AmalgamCommand,
  type AmalgamOptions,
  type AmalgamRequest,
  type AmalgamResponseBody,
} from "@howso/amalgam-lang";
import { v4 as uuid } from "uuid";
import { ClientCache, EngineResponse } from "../base";
import { TraineeClient, type ISessionClient } from "../capabilities";
import { HowsoError, RequiredError } from "../errors";
import { batcher, BatchOptions, CacheMap, isNode } from "../utilities";
import { FileSystemClient } from "./files";

export interface ClientOptions {
  trace?: boolean;
  // Browser only
  migrationsUrl?: string | URL;
  /** Generic howso.caml file. This will not be loaded unless a function requires it such as `createTrainee` */
  howsoUrl?: string | URL;
  // Node only
  libPath?: string;
}

export class HowsoWasmClient extends TraineeClient implements ISessionClient {
  public readonly fs: FileSystemClient;
  protected activeSession?: Session;
  protected cache: CacheMap<ClientCache>;

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
    this.cache = new CacheMap();
    this.fs = new FileSystemClient(this.worker, options?.libPath);
  }

  /**
   * Execute an Engine entity request.
   * @param handle The identifier of the entity.
   * @param label The name of the method to execute.
   * @param data The data to pass to the method.
   * @param throwErrors If errors should be thrown automatically.
   * @returns The core response object.
   */
  public async execute<R, D = unknown>(
    handle: string,
    label: string,
    data: D,
    throwErrors = true,
  ): Promise<EngineResponse<R>> {
    const response = await this.dispatch({
      type: "request",
      command: "executeEntityJson",
      parameters: [handle, label, this.prepareRequest(data)],
    });
    try {
      const result = this.processResponse<R>(response);
      if (throwErrors && Array.isArray(result.errors)) {
        for (const err of result.errors) {
          throw new HowsoError(err?.message, err?.code);
        }
      }
      return result;
    } catch (reason) {
      if (reason instanceof AmalgamError || reason instanceof HowsoError) {
        throw reason;
      }

      const message = reason instanceof Error ? reason.message : `${reason}`;
      throw new Error(`${message} Label: ${label} Data: ${JSON.stringify(data)}`);
    }
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
   * TODO need to break out autoLoad and autoResolve
   *
   * @param traineeId The trainee identifier.
   * @returns The trainee object.
   */
  protected async autoResolveTrainee(traineeId: string): Promise<Trainee> {
    if (traineeId == null) {
      throw new TypeError("A trainee identifier is required.");
    }
    if (!this.cache.has(traineeId)) {
      await this.acquireTraineeResources(traineeId);
    }
    const cached = this.cache.get(traineeId);
    if (cached == null) {
      throw new HowsoError(`Trainee "${traineeId}" not found.`);
    }
    return cached.trainee;
  }

  /**
   * Automatically persist trainee object when appropriate based on persistence level.
   * @param traineeId The trainee identifier.
   */
  protected async autoPersistTrainee(traineeId: string): Promise<void> {
    const cached = this.cache.get(traineeId);
    if (cached?.trainee?.persistence === "always") {
      await this.persistTrainee(traineeId);
    }
  }

  /**
   * Persist trainee object
   * @param traineeId The trainee identifier.
   */
  protected async persistTrainee(traineeId: string): Promise<void> {
    const fileUri = this.fs.join(this.fs.traineeDir, this.fs.sanitizeFilename(traineeId));
    await this.dispatch({
      type: "request",
      command: "storeEntity",
      parameters: [traineeId, fileUri],
    });
  }

  /**
   * Retrieve the trainees that are currently loaded in core.
   * @returns List of trainee identifiers.
   */
  protected async getEntities(): Promise<string[]> {
    const entities = await this.dispatch({
      type: "request",
      command: "getEntities",
      parameters: [],
    });
    return entities;
  }

  /**
   * Constructs trainee object from it's core metadata after attempting automatic resolution.
   *
   * @param traineeId The trainee identifier.
   * @returns The trainee object.
   */
  protected async getTraineeFromCore(traineeId: string): Promise<Trainee> {
    await this.autoResolveTrainee(traineeId);
    return this._getTraineeFromCore(traineeId);
  }

  /**
   * Constructs trainee object from it's core metadata without attempting automatic resolution.
   *
   * @param traineeId The trainee identifier.
   * @returns The trainee object.
   */
  protected async _getTraineeFromCore(traineeId: string): Promise<Trainee> {
    const [metadata, features] = await Promise.all([
      this._getMetadata(traineeId),
      this._getFeatureAttributes(traineeId),
    ]);

    return TraineeFromJSON({
      features,
      id: traineeId,
      name: metadata.name,
      persistence: metadata.persistence,
      metadata: metadata.metadata,
    }) as Trainee;
  }

  /**
   * Setup client.
   * Prepares the file system and initializes the worker.
   * No trainee is loaded automatically during this process.
   */
  public async setup(): Promise<void> {
    // Initialize the Amalgam runtime
    const options: AmalgamOptions = { trace: this.options.trace };
    const ready = await this.dispatch({
      type: "request",
      command: "initialize",
      parameters: [options],
    });

    if (ready) {
      // Initialize the session
      await this.beginSession();
      return;
    }

    // Prepare the core files
    if (isNode) {
      // NodeJS
      if (this.options.libPath == null) {
        throw new HowsoError("Setup Failed - The client requires a file path to the library files.");
      }
    } else {
      // Browsers
      if (!this.options.howsoUrl) {
        throw new HowsoError("Setup Failed - The client requires a URL for the howso.caml.");
      }

      await this.fs.mkdir(this.fs.libDir);
      await this.fs.mkdir(this.fs.traineeDir);

      if (this.options.migrationsUrl != null) {
        await this.fs.mkdir(this.fs.migrationsDir);
        await this.fs.createLazyFile(
          this.fs.migrationsDir,
          `migrations.${this.fs.entityExt}`,
          String(this.options.migrationsUrl),
          true,
          false,
        );
      }
      await this.fs.createLazyFile(
        this.fs.libDir,
        `howso.${this.fs.entityExt}`,
        String(this.options.howsoUrl),
        true,
        false,
      );
    }
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
   * Acquire resources for a trainee.
   * @param traineeId The trainee identifier.
   * @param url A URL to the trainee file.
   */
  public async acquireTraineeResources(traineeId: string, url?: string): Promise<void> {
    if (this.traineeCache.has(traineeId)) {
      // Already acquired
      return;
    }

    const filename = `${this.fs.sanitizeFilename(traineeId)}.${this.fs.entityExt}`;
    if (url) {
      // Prepare the file on the virtual file system
      await this.fs.createLazyFile(this.fs.traineeDir, filename, url, true, false);
    }

    // Load trainee only if entity not already in core
    const loaded = await this.getEntities();
    if (loaded.indexOf(traineeId) == -1) {
      // Only call load if not already loaded
      await this.dispatch({
        type: "request",
        command: "loadEntity",
        parameters: [traineeId, this.fs.join(this.fs.traineeDir, filename)],
      });
    }

    // Get trainee details. Use the internal method to prevent auto resolution loops.
    const trainee = await this._getTraineeFromCore(traineeId);
    // Cache the trainee
    this.traineeCache.set(traineeId, { trainee });
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
    const trainee = await this.autoResolveTrainee(traineeId);
    const cached = this.traineeCache.get(trainee.id);
    if (cached) {
      if (["allow", "always"].indexOf(String(cached.trainee.persistence)) != -1) {
        // Auto persist the trainee
        await this.persistTrainee(traineeId);
      } else if (cached.trainee.persistence == "never") {
        throw new ProblemError(
          "Trainees set to never persist may not have their resources released. Delete the trainee instead.",
        );
      }
      this.traineeCache.discard(traineeId);
    }

    await this.dispatch({
      type: "request",
      command: "destroyEntity",
      parameters: [traineeId],
    });
  }

  /**
   * Create a new trainee.
   * @param trainee The trainee identifier.
   * @returns The new trainee object.
   */
  public async createTrainee(trainee: Omit<Trainee, "id">): Promise<Trainee> {
    const traineeId = trainee.name || uuid();
    // Load the core entity
    const howsoPath = this.fs.join(this.fs.libDir, `howso.${this.fs.entityExt}`);
    const loaded = await this.dispatch({
      type: "request",
      command: "loadEntity",
      parameters: [traineeId, howsoPath],
    });
    if (!loaded) {
      throw new ProblemError("Failed to load the amalgam entities.");
    }

    // Create the trainee entity
    const created = await this.execute<boolean>(traineeId, "initialize", {
      trainee_id: traineeId,
      filepath: howsoPath,
    });
    if (!created) {
      throw new ProblemError(
        `Could not create a trainee with id '${traineeId}'. Either the trainee template file was not found or the trainee already exists.`,
      );
    }
    const { features = {}, ...props } = TraineeToJSON({ ...trainee, id: traineeId });

    // Set trainee metadata
    const metadata = {
      name: props.name,
      metadata: props.metadata,
      persistence: props.persistence || "allow",
    };
    await this.execute(traineeId, "set_metadata", { metadata });

    // Set the feature attributes
    await this.execute(traineeId, "set_feature_attributes", { features });
    const allFeatures = await this._getFeatureAttributes(traineeId);

    // Build, cache and return new trainee object
    const newTrainee: Trainee = TraineeFromJSON({ ...metadata, id: traineeId, features: allFeatures }) as Trainee;
    this.traineeCache.set(traineeId, { trainee: newTrainee });
    return newTrainee;
  }

  /**
   * Update a trainee's properties.
   * @param trainee The trainee identifier.
   */
  public async updateTrainee(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    trainee: Trainee,
  ): Promise<Trainee> {
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
    // TODO need to use a someday function of autoResolve that doesn't call autoLoad here
    // const trainee = await this.autoResolveTrainee(traineeId);

    await this.dispatch({
      type: "request",
      command: "destroyEntity",
      parameters: [traineeId],
    });
    this.traineeCache.discard(traineeId);
    const filename = this.fs.sanitizeFilename(traineeId);
    this.fs.unlink(this.fs.join(this.fs.traineeDir, `${filename}.${this.fs.entityExt}`));
  }

  /**
   * List existing trainees.
   * @param keywords Keywords to filter the list of trainees by.
   */
  public async listTrainees(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    keywords: string | string[],
  ): Promise<TraineeIdentity[]> {
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
    await this.execute(traineeId, "set_feature_attributes", { features });
    trainee.features = await this._getFeatureAttributes(traineeId);
  }

  /**
   * Retrieve the trainee's feature attributes after attempting automatic resolution.
   *
   * @param traineeId The trainee identifier.
   * @returns The feature attributes object.
   */
  public async getFeatureAttributes(traineeId: string): Promise<Record<string, FeatureAttributes>> {
    await this.autoResolveTrainee(traineeId);
    return this._getFeatureAttributes(traineeId);
  }

  /**
   * Retrieve the trainee's feature attributes without attempting automatic resolution.
   *
   * @param traineeId The trainee identifier.
   * @returns The feature attributes object.
   */
  protected async _getFeatureAttributes(traineeId: string): Promise<Record<string, FeatureAttributes>> {
    const { content } = await this.execute<Record<string, FeatureAttributes>>(traineeId, "get_feature_attributes", {});
    return mapValues(content, FeatureAttributesFromJSON);
  }

  /**
   * Train data into the trainee.
   * @param traineeId The trainee identifier.
   * @param request The train parameters.
   */
  public async train(traineeId: string, request: TrainRequest): Promise<void> {
    const trainee = await this.autoResolveTrainee(traineeId);
    if (!trainee.id) {
      throw new Error(`trainee.id is undefined`);
    }
    const session = await this.getActiveSession();
    let autoAnalyze = false;

    const { cases = [], ...rest } = TrainRequestToJSON(request);

    // Add session metadata to trainee
    await this.execute(traineeId, "set_session_metadata", {
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
          const response = await this.execute<TrainResponse | null>(traineeId, "train", {
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
    if (!trainee.id) {
      throw new Error(`trainee.id is undefined`);
    }
    await this.execute(traineeId, "auto_analyze", {});
    await this.autoPersistTrainee(trainee.id);
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
    const { warnings = [], content } = await this.execute<ReactResponseContent>(traineeId, "batch_react", {
      action_values: actions,
      context_values: contexts,
      ...rest,
    });
    return ReactResponseFromJSON({ warnings, content });
  }

  /**
   * React to a trainee.
   * @param traineeId The trainee identifier.
   * @param request The react parameters.
   * @returns The react response.
   */
  public async reactAggregate(traineeId: string, request: ReactAggregateRequest): Promise<ReactAggregateResponse> {
    const trainee = await this.autoResolveTrainee(traineeId);
    this.preprocessReactRequest(trainee, request);
    const { warnings = [], content } = await this.execute<ReactAggregateResponseContent>(
      traineeId,
      "react_aggregate",
      ReactAggregateRequestToJSON(request),
    );
    return ReactAggregateResponseFromJSON({ warnings, content });
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
    const { warnings = [], content } = await this.execute<ReactSeriesResponseContent>(traineeId, "batch_react_series", {
      action_values: actions,
      context_values: contexts,
      ...rest,
    });
    return ReactSeriesResponseFromJSON({ warnings, content });
  }
}
