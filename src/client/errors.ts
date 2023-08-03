import { ModelError, ModelErrorFromJSON } from "howso-openapi-client/models";

export class ProblemError extends Error {
  public readonly code?: string;

  constructor(message?: string, code?: string) {
    super(message);
    this.code = code;
  }
}

export class ApiError extends ProblemError implements ModelError {
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

  static fromJson(json: unknown): ApiError {
    const error = ModelErrorFromJSON(json);
    return new ApiError(error);
  }
}

export class ValidationError extends ProblemError {}

export class TimeoutError extends ProblemError {}

export class RetriableError extends ProblemError {}
