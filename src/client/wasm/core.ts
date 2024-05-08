import { AmalgamError } from "@howso/amalgam-lang";

export class AmalgamCoreError extends AmalgamError {
  constructor(message?: string, code?: string) {
    super(message, code);
    // Set the prototype explicitly
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "AmalgamCoreError";
  }
}

export interface AmalgamCoreResponse<R = unknown> {
  content: R;
  errors: AmalgamCoreError[];
  warnings: string[];
}

/**
 * Prepare payload for a core request.
 * @param payload The core payload.
 * @returns The updated core payload.
 */
export function prepareCoreRequest(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any,
) {
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
 * Prepare payload from a core response.
 * @param data The core response.
 * @returns The updated core response.
 */
export function prepareCoreResponse<R = unknown>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
): AmalgamCoreResponse<R> {
  if (!data) {
    throw new AmalgamError("Null or empty response received from core.");
  }

  if (Array.isArray(data) && data.length == 2) {
    const errors: AmalgamCoreError[] = [];
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
      if (value?.detail) {
        if (Array.isArray(value.detail)) {
          for (const msg of value.detail) {
            errors.push(new AmalgamCoreError(msg, value.code));
          }
        } else {
          errors.push(new AmalgamCoreError(value.detail, value.code));
        }
      }
      if (errors.length == 0) {
        errors.push(new AmalgamCoreError("An unknown error occurred."));
      }
    }

    return {
      errors,
      warnings,
      content: isSuccess ? value?.payload : undefined,
    };
  } else if (["string", "number", "bigint", "boolean"].indexOf(typeof data) != -1) {
    return { errors: [], warnings: [], content: data };
  }

  throw new AmalgamError("Malformed response received from core.");
}
