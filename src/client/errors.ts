export const DEFAULT_ERROR_MESSAGE = "An unknown error ocurred.";

export interface ValidationErrorDetail {
  message: string;
  field?: string[];
  code?: string | null;
}

export interface ValidationErrorCollection {
  [key: string]: ValidationErrorCollection | ValidationErrorDetail[];
}

export class HowsoError extends Error {
  readonly code: string | null;
  readonly detail: string[];

  constructor(message: string | string[] = DEFAULT_ERROR_MESSAGE, code?: string | null) {
    if (Array.isArray(message)) {
      super(message[0]);
      this.detail = message;
    } else {
      super(message);
      this.detail = message ? [message] : [];
    }
    this.code = code || null;
    // Set the prototype explicitly
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "HowsoError";
  }
}

export class HowsoValidationError extends HowsoError {
  errors: ValidationErrorCollection | undefined;

  constructor(message?: string | string[], code?: string | null, errors?: ValidationErrorCollection) {
    super(message, code);
    this.errors = errors;
    // Set the prototype explicitly
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = "HowsoValidationError";
  }

  /**
   * Iterator for all validation error messages.
   */
  public *errorMessages() {
    function* traverse(
      path: string[],
      errors: ValidationErrorCollection | ValidationErrorDetail[],
    ): Generator<ValidationErrorDetail, void> {
      if (Array.isArray(errors)) {
        for (const item of errors) {
          const detail: ValidationErrorDetail = {
            message: item.message || DEFAULT_ERROR_MESSAGE,
            field: path,
          };
          if (item.code) {
            detail.code = item.code;
          }
          yield detail;
        }
      } else {
        for (const [key, value] of Object.entries(errors)) {
          yield* traverse([...path, key], value);
        }
      }
    }
    if (this.errors != null) {
      for (const item of traverse([], this.errors)) {
        yield item;
      }
    }
  }
}
