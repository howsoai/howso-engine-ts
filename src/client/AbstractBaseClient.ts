import type { Session, Trainee } from "../engine";
import type { BaseTrainee } from "../types";
import { DEFAULT_ERROR_MESSAGE, HowsoError, HowsoValidationError } from "./errors";
import type { CacheMap } from "./utilities/cache";
import { type Logger, nullLogger } from "./utilities/logger";

export interface ClientCache {
  trainee: Trainee;
}

export type ExecuteResponse<R = unknown> = {
  payload: R;
  errors: HowsoError[];
  warnings: string[];
};

export type AbstractBaseClientOptions = {
  /** Enable logging for operations through your own methods */
  logger?: Logger;
};

export abstract class AbstractBaseClient {
  protected abstract cache: CacheMap<ClientCache>;
  protected logger: Logger;

  constructor(options?: AbstractBaseClientOptions) {
    this.logger = options?.logger || nullLogger;
  }

  /**
   * Prepare payload for an Engine request.
   * @param payload The Engine payload.
   * @returns The updated Engine payload.
   */
  protected prepareRequest(payload: any) {
    if (!payload) {
      return payload;
    }

    // Remove null properties from payload
    const filtered = { ...payload };
    for (const key in filtered) {
      if (filtered[key as keyof typeof filtered] == null) {
        delete filtered[key as keyof typeof filtered];
      }
    }

    return filtered;
  }

  /**
   * Process payload from an Engine response.
   * @param data The Engine response.
   * @returns The updated Engine response.
   */
  protected processResponse<R = unknown>(data: any): ExecuteResponse<R> {
    if (!data) {
      throw new HowsoError("Null or empty response received from Engine.");
    }

    if (Array.isArray(data) && data.length == 2) {
      const errors: HowsoError[] = [];
      const warnings: string[] = [];
      const isSuccess = data[0];
      const value = data[1];

      if (isSuccess) {
        // Collect warnings
        if (Array.isArray(value?.warnings)) {
          for (const msg of value.warnings) {
            if (msg != null) warnings.push(msg);
          }
        }
      } else {
        // Collect errors
        if (value?.errors) {
          errors.push(new HowsoValidationError(value.detail, value.code, value.errors));
        } else {
          errors.push(new HowsoError(value.detail, value.code));
        }
        if (errors.length == 0) {
          errors.push(new HowsoError(DEFAULT_ERROR_MESSAGE));
        }
      }

      errors.forEach(this.logger.error);
      warnings.forEach(this.logger.warn);

      return {
        errors,
        warnings,
        payload: isSuccess ? value?.payload : undefined,
      };
    } else if (["string", "number", "bigint", "boolean"].indexOf(typeof data) != -1) {
      return { errors: [], warnings: [], payload: data };
    }

    throw new HowsoError("Malformed response received from Engine.");
  }

  /** Setup the client instance for interacting with the Howso Engine. */
  public abstract setup(): Promise<void>;

  /**
   * Execute a label of an Engine entity.
   * @param handle The identifier of the entity.
   * @param label The name of the method to execute.
   * @param data The data to pass to the method.
   * @param throwErrors If errors should be thrown automatically.
   */
  public abstract execute<R, D = unknown>(
    handle: string,
    label: string,
    data: D,
    throwErrors?: boolean,
  ): Promise<ExecuteResponse<R>>;

  /** Create a new Trainee. */
  public abstract createTrainee(properties: Omit<Trainee, "id">): Promise<Trainee>;

  /** Update an existing Trainee. */
  public abstract updateTrainee(trainee: BaseTrainee): Promise<Trainee>;

  /** Copy an existing Trainee. */
  public abstract copyTrainee(traineeId: string, name?: string): Promise<Trainee>;

  /** Get an existing Trainee by Id. */
  public abstract getTrainee(traineeId: string): Promise<Trainee>;

  /** Search existing Trainees. */
  public abstract queryTrainees(keywords: string | string[]): Promise<Trainee[]>;

  /** Delete a Trainee. */
  public abstract deleteTrainee(traineeId: string): Promise<void>;

  /** Acquire the resources for a Trainee. */
  public abstract acquireTraineeResources(traineeId: string): Promise<void>;

  /** Release the resources for a Trainee. */
  public abstract releaseTraineeResources(traineeId: string): Promise<void>;

  /** Persist a Trainee to storage. **/
  public abstract persistTrainee(traineeId: string): Promise<void>;

  /** Automatically resolve a Trainee and ensure it is loaded. */
  public abstract autoResolveTrainee(traineeId: string): Promise<Trainee>;

  /** Automatically persist Trainee object when appropriate based on persistence level. */
  public abstract autoPersistTrainee(traineeId: string): Promise<void>;

  /** Get active Session. */
  public abstract getActiveSession(): Promise<Readonly<Session>>;

  /** Begin a new Session. */
  public abstract beginSession(name?: string, metadata?: Record<string, any>): Promise<Session>;
}
