import { ModelError } from "howso-openapi-client/models";
export declare class ProblemError extends Error {
    readonly code?: string;
    constructor(message?: string, code?: string);
}
export declare class ApiError extends ProblemError implements ModelError {
    private readonly problem;
    constructor(problem: ModelError);
    get status(): number | undefined;
    get type(): string | undefined;
    get title(): string | undefined;
    get detail(): string | undefined;
    static fromJson(json: unknown): ApiError;
}
export declare class ValidationError extends ProblemError {
}
export declare class TimeoutError extends ProblemError {
}
export declare class RetriableError extends ProblemError {
}
