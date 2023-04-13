import { ModelError } from "diveplane-openapi-client/models";
export declare class DiveplaneError extends Error {
    readonly code?: string;
    constructor(message?: string, code?: string);
}
export declare class DiveplaneApiError extends DiveplaneError implements ModelError {
    private readonly problem;
    constructor(problem: ModelError);
    get status(): number | undefined;
    get type(): string | undefined;
    get title(): string | undefined;
    get detail(): string | undefined;
    static fromJson(json: unknown): DiveplaneApiError;
}
export declare class ValidationError extends DiveplaneError {
}
export declare class TimeoutError extends DiveplaneError {
}
