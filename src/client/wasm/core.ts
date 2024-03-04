import { AmalgamError } from "@howso/amalgam-lang";

export class AmalgamCoreError extends AmalgamError {
  constructor(message?: string, code?: string) {
    super(message, code);
    // Set the prototype explicitly
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "AmalgamCoreError";
  }
}

export class AmalgamCoreWarning {
  constructor(
    public readonly detail: string = "",
    public readonly code?: string,
  ) {}

  get message(): string {
    return this.detail;
  }
}

export interface AmalgamCoreResponse<R = unknown> {
  content: R;
  errors: AmalgamCoreError[];
  warnings: AmalgamCoreWarning[];
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

  if (data?.constructor == Object) {
    const errors: AmalgamCoreError[] = [];
    const warnings: AmalgamCoreWarning[] = [];

    // Collect warnings
    if (data.warnings?.length > 0) {
      for (const w of data.warnings) {
        warnings.push(new AmalgamCoreWarning(w?.detail, w?.code));
      }
    }

    // Collect errors
    if (data.status !== "ok") {
      if (data.errors?.length > 0) {
        for (const e of data.errors) {
          errors.push(new AmalgamCoreError(e?.detail, e?.code));
        }
      } else {
        errors.push(new AmalgamCoreError("An unknown error occurred."));
      }
      return { errors, warnings, content: data.payload };
    }

    return {
      errors,
      warnings,
      content: data.payload,
    };
  } else if (["string", "number", "bigint", "boolean"].indexOf(typeof data) != -1) {
    return { errors: [], warnings: [], content: data };
  }

  throw new AmalgamError("Malformed response received from core.");
}
