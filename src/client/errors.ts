import { ModelError, ModelErrorFromJSON } from "diveplane-openapi-client/models";

export class DiveplaneError extends Error {
  public readonly code?: string;

  constructor(message?: string, code?: string) {
    super(message);
    this.code = code;
  }
}

export class DiveplaneApiError extends DiveplaneError implements ModelError {
  constructor(private readonly problem: ModelError) {
    super(problem?.detail, problem?.code);
  }

  get status() {
    return this.problem.status;
  }

  get type() {
    return this.problem.type;
  }

  get title() {
    return this.problem.title;
  }

  get detail() {
    return this.problem.detail;
  }

  static fromJson(json: unknown): DiveplaneApiError {
    const error = ModelErrorFromJSON(json);
    return new DiveplaneApiError(error);
  }
}

export class ValidationError extends DiveplaneError {}

export class TimeoutError extends DiveplaneError {}
