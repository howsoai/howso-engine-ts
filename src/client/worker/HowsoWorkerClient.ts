import {
  AmalgamError,
  type AmalgamCommand,
  type AmalgamOptions,
  type AmalgamRequest,
  type AmalgamResponseBody,
} from "@howso/amalgam-lang";
import type { Worker as NodeWorker } from "node:worker_threads";
import { v4 as uuid } from "uuid";
import { Session, Trainee } from "../../engine";
import type { BaseTrainee } from "../../types";
import {
  AbstractBaseClient,
  type AbstractBaseClientOptions,
  type ClientCache,
  type ExecuteResponse,
} from "../AbstractBaseClient";
import { HowsoError, RequiredError } from "../errors";
import { CacheMap } from "../utilities";
import { AbstractFileSystem } from "./filesystem";

export type ClientOptions = AbstractBaseClientOptions & {
  /** The Howso Engine caml file. This will not be loaded unless a function requires it, such as `createTrainee` */
  howsoUrl: string | URL;
  /** Trainee migrations caml file. This will not be loaded unless a function request it, such as `upgradeTrainee` */
  migrationsUrl?: string | URL;
  /** Enable tracing all Trainee operations for debugging. */
  trace?: boolean;
};

export class HowsoWorkerClient extends AbstractBaseClient {
  protected activeSession?: Session;
  protected cache: CacheMap<ClientCache>;

  constructor(
    protected readonly worker: Worker | NodeWorker,
    public readonly fs: AbstractFileSystem<Worker | NodeWorker>,
    protected readonly options: ClientOptions,
  ) {
    super(options);
    if (worker == null) {
      throw new RequiredError("worker", "A worker is required to instantiate a client.");
    }
    if (options == null) {
      throw new RequiredError("options", "Client options are required.");
    }
    this.cache = new CacheMap();
  }

  /**
   * Create a new client instance and run the required client setup process.
   */
  public static async create(
    worker: Worker | NodeWorker,
    fs: AbstractFileSystem<Worker | NodeWorker>,
    options: ClientOptions,
  ): Promise<HowsoWorkerClient> {
    const client = new HowsoWorkerClient(worker, fs, options);
    await client.setup();
    return client;
  }

  /**
   * Execute an Engine entity request.
   * @param handle The identifier of the entity.
   * @param label The name of the method to execute.
   * @param data The data to pass to the method.
   * @param throwErrors If errors should be thrown automatically.
   * @returns The Engine response object.
   */
  public async execute<R, D = unknown>(
    handle: string,
    label: string,
    data: D,
    throwErrors = true,
  ): Promise<ExecuteResponse<R>> {
    const response = await this.dispatch({
      type: "request",
      command: "executeEntityJson",
      parameters: [handle, label, this.prepareRequest(data)],
    });
    try {
      const result = this.processResponse<R>(response);
      if (throwErrors && Array.isArray(result.errors)) {
        for (const err of result.errors) {
          throw err;
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
      this.worker.postMessage(request, [
        // @ts-expect-error The port will match browser/nodejs depending on the context
        channel.port2,
      ]);
    });
  }

  /**
   * Retrieve the entities that are currently loaded in Engine.
   * @returns List of entity identifiers.
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
   * Constructs Trainee object from it's Engine metadata.
   *
   * @param traineeId The Trainee identifier.
   * @returns The Trainee object and its feature attributes.
   */
  protected async getTraineeFromEngine(traineeId: string): Promise<Trainee> {
    const { payload } = await this.execute<Record<string, any>>(traineeId, "get_metadata", {});
    if (!payload) {
      throw new HowsoError(`Trainee "${traineeId}" not found.`, "not_found");
    }
    return new Trainee(this, {
      id: traineeId,
      name: payload?.name,
      persistence: payload?.persistence ?? "allow",
      metadata: payload?.metadata,
    });
  }

  /**
   * Automatically resolve a Trainee and ensure it is loaded given an identifier.
   *
   * @param traineeId The Trainee identifier.
   * @returns The Trainee object.
   */
  public async autoResolveTrainee(traineeId: string): Promise<Trainee> {
    if (traineeId == null) {
      throw new TypeError("A Trainee identifier is required.");
    }
    await this.acquireTraineeResources(traineeId); // does nothing if already cached
    const cached = this.cache.get(traineeId);
    if (cached == null) {
      throw new HowsoError(`Trainee "${traineeId}" not found.`, "not_found");
    }
    return cached.trainee;
  }

  /**
   * Automatically persist Trainee object when appropriate based on persistence level.
   * @param traineeId The Trainee identifier.
   */
  public async autoPersistTrainee(traineeId: string): Promise<void> {
    const cached = this.cache.get(traineeId);
    if (cached?.trainee?.persistence === "always") {
      await this.persistTrainee(traineeId);
    }
  }

  /**
   * Setup client.
   * Prepares the file system and initializes the worker.
   * No Trainee is loaded automatically during this process.
   */
  public async setup(): Promise<void> {
    // Initialize the Amalgam runtime
    const options: AmalgamOptions = { trace: this.options.trace };
    await this.dispatch({
      type: "request",
      command: "initialize",
      parameters: [options],
    });

    // Create a default initial session
    await this.beginSession();

    // Prepare the Engine files
    if (!this.options.howsoUrl) {
      throw new HowsoError("The Howso client requires a URL for the howso.caml.", "setup_failed");
    }

    await this.fs.mkdir(this.fs.libDir);
    await this.fs.mkdir(this.fs.traineeDir);

    if (this.options.migrationsUrl != null) {
      await this.fs.mkdir(this.fs.migrationsDir);
      await this.fs.prepareFile(
        this.fs.migrationsDir,
        `migrations.${this.fs.entityExt}`,
        String(this.options.migrationsUrl),
      );
    }
    await this.fs.prepareFile(this.fs.libDir, `howso.${this.fs.entityExt}`, String(this.options.howsoUrl));
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
    this.activeSession = new Session(this, {
      id: uuid(),
      name,
      metadata,
      created_date: new Date(),
      modified_date: new Date(),
    });
    return this.activeSession;
  }

  /**
   * Persist Trainee object
   * @param traineeId The Trainee identifier.
   */
  public async persistTrainee(traineeId: string): Promise<void> {
    const fileUri = this.fs.join(this.fs.traineeDir, this.fs.traineeFilename(traineeId));
    await this.dispatch({
      type: "request",
      command: "storeEntity",
      parameters: [traineeId, fileUri],
    });
  }

  /**
   * Acquire resources for a Trainee.
   * @param traineeId The Trainee identifier.
   * @param url A URL to the Trainee file.
   */
  public async acquireTraineeResources(traineeId: string, url?: string): Promise<void> {
    if (this.cache.has(traineeId)) {
      // Already acquired
      return;
    }

    const filename = this.fs.traineeFilename(traineeId);
    const filePath = this.fs.join(this.fs.traineeDir, filename);
    if (url) {
      // Prepare the file on the virtual file system
      await this.fs.prepareFile(this.fs.traineeDir, filename, url);
    }

    const existingTrainees = await this.fs.readdir(this.fs.traineeDir);
    if (!existingTrainees.includes(filename)) {
      throw new HowsoError(`Trainee "${traineeId}" not found.`, "not_found");
    }

    // Load Trainee only if entity not already loaded
    const loaded = await this.getEntities();
    if (loaded.indexOf(traineeId) == -1) {
      // Only call load if not already loaded
      const status = await this.dispatch({
        type: "request",
        command: "loadEntity",
        parameters: [traineeId, filePath],
      });
      if (!status.loaded) {
        throw new HowsoError(`Failed to acquire the Trainee "${traineeId}": ${status.message}`);
      }
    }

    // Get Trainee details. Use the internal method to prevent auto resolution loops.
    const trainee = await this.getTraineeFromEngine(traineeId);
    // Cache the Trainee
    this.cache.set(traineeId, { trainee });
  }

  /**
   * Releases resources for a Trainee.
   * @param traineeId The Trainee identifier.
   */
  public async releaseTraineeResources(traineeId: string): Promise<void> {
    if (traineeId == null) {
      throw new HowsoError("A Trainee id is required.");
    }

    // Check if Trainee already loaded
    const cached = this.cache.get(traineeId);
    if (cached) {
      if (["allow", "always"].indexOf(String(cached.trainee.persistence)) != -1) {
        // Auto persist the trainee
        await this.persistTrainee(traineeId);
      } else if (cached.trainee.persistence == "never") {
        throw new HowsoError(
          "Trainees set to never persist may not have their resources released. Delete the Trainee instead.",
        );
      }
      this.cache.discard(traineeId);
    }

    await this.dispatch({
      type: "request",
      command: "destroyEntity",
      parameters: [traineeId],
    });
  }

  /**
   * Create a new Trainee.
   * @param properties The Trainee properties.
   * @returns The new Trainee object.
   */
  public async createTrainee(properties: Omit<BaseTrainee, "id">): Promise<Trainee> {
    const traineeId = properties.name || uuid();
    // Load the Engine entity
    const howsoPath = this.fs.join(this.fs.libDir, `howso.${this.fs.entityExt}`);
    const status = await this.dispatch({
      type: "request",
      command: "loadEntity",
      parameters: [traineeId, howsoPath],
    });
    if (!status.loaded) {
      throw new HowsoError(`Failed to initialize the Trainee "${traineeId}": ${status.message}`);
    }

    // Create the Trainee entity
    await this.execute<boolean>(traineeId, "initialize", {
      trainee_id: traineeId,
      filepath: howsoPath,
    });

    // Set Trainee metadata
    const metadata = {
      name: properties.name,
      metadata: properties.metadata || {},
      persistence: properties.persistence || "allow",
    };
    await this.execute(traineeId, "set_metadata", { metadata });

    // Build, cache and return new trainee object
    const newTrainee = new Trainee(this, { id: traineeId, ...metadata });
    this.cache.set(traineeId, { trainee: newTrainee });
    return newTrainee;
  }

  /**
   * Update a Trainee's properties.
   * @param trainee The Trainee to update.
   * @returns The updated Trainee object.
   */
  public async updateTrainee(trainee: BaseTrainee): Promise<Trainee> {
    await this.autoResolveTrainee(trainee.id);

    // Set Trainee metadata
    const metadata = {
      name: trainee.name,
      metadata: trainee.metadata || {},
      persistence: trainee.persistence || "allow",
    };
    await this.execute(trainee.id, "set_metadata", { metadata });

    const updatedTrainee = await this.getTraineeFromEngine(trainee.id);
    this.cache.set(trainee.id, { trainee: updatedTrainee });
    return updatedTrainee;
  }

  /**
   * Retrieve a Trainee.
   * @param traineeId The Trainee identifier.
   * @returns The Trainee object.
   */
  public async getTrainee(traineeId: string): Promise<Trainee> {
    await this.autoResolveTrainee(traineeId);
    return await this.getTraineeFromEngine(traineeId); // Get latest Trainee from Engine
  }

  /**
   * Copy a Trainee.
   * @param traineeId The Trainee identifier.
   * @param name The new Trainee name.
   * @returns The new Trainee object.
   */
  public async copyTrainee(traineeId: string, name?: string): Promise<Trainee> {
    await this.autoResolveTrainee(traineeId);
    const newTraineeId = name || uuid();
    const cloned = await this.dispatch({
      type: "request",
      command: "cloneEntity",
      parameters: [traineeId, newTraineeId],
    });
    if (!cloned) {
      throw new HowsoError(
        `Failed to copy the Trainee "${traineeId}". This may be due to incorrect filepaths to the Howso binaries, or a Trainee "${newTraineeId}" already exists.`,
      );
    }
    // Update the trainee metadata
    const { payload: metadata } = await this.execute<any>(newTraineeId, "get_metadata", {});
    metadata.name = name;
    await this.execute(newTraineeId, "set_metadata", { metadata });

    // Get fresh copy of the trainee object
    const newTrainee = await this.getTraineeFromEngine(newTraineeId);
    this.cache.set(newTraineeId, { trainee: newTrainee });
    return newTrainee;
  }

  /**
   * Deletes a Trainee.
   * @param traineeId The Trainee identifier.
   */
  public async deleteTrainee(traineeId: string): Promise<void> {
    await this.dispatch({
      type: "request",
      command: "destroyEntity",
      parameters: [traineeId],
    });
    this.cache.discard(traineeId);
    const filename = this.fs.traineeFilename(traineeId);
    const existingTrainees = await this.fs.readdir(this.fs.traineeDir);
    if (existingTrainees.includes(filename)) {
      await this.fs.unlink(this.fs.join(this.fs.traineeDir, filename));
    }
  }

  /**
   * Search existing Trainees.
   * @param keywords Keywords to filter the list of Trainees by.
   * @returns A list of Trainee objects.
   */
  public async queryTrainees(keywords?: string | string[]): Promise<Trainee[]> {
    const cache = this.cache.values();
    // Normalize keywords to array
    let search: string[];
    if (!keywords) {
      search = [];
    } else if (typeof keywords === "string") {
      search = keywords.split(/\s/g);
    } else {
      search = keywords;
    }

    function isMatch(value: string | null | undefined) {
      if (value == null) return false;
      if (search!.length) {
        return search.some((keyword) => value.toLowerCase().includes(keyword.toLowerCase()));
      }
      return true;
    }

    return cache.reduce<Trainee[]>((accumulator, value) => {
      if (isMatch(value.trainee.name) || isMatch(value.trainee.id)) {
        accumulator.push(value.trainee);
      }
      return accumulator;
    }, []);
  }
}
