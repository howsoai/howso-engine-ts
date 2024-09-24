import type { Trainee } from "@/types";
import { DEFAULT_ERROR_MESSAGE, HowsoError, HowsoValidationError } from "./errors";
import type { CacheMap } from "./utilities/cache";

export interface ClientCache {
  trainee: Trainee;
}

export interface EngineResponse<R = unknown> {
  payload: R;
  errors: HowsoError[];
  warnings: string[];
}

export abstract class AbstractHowsoClient {
  protected abstract cache: CacheMap<ClientCache>;

  /**
   * Setup the client instance for interacting with the Howso Engine.
   */
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
  ): Promise<EngineResponse<R>>;

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
  protected processResponse<R = unknown>(data: any): EngineResponse<R> {
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
}
