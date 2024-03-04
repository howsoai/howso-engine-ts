import { AmalgamError } from "@howso/amalgam-lang";
export declare class AmalgamCoreError extends AmalgamError {
    constructor(message?: string, code?: string);
}
export declare class AmalgamCoreWarning {
    readonly detail: string;
    readonly code?: string | undefined;
    constructor(detail?: string, code?: string | undefined);
    get message(): string;
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
export declare function prepareCoreRequest(payload: any): any;
/**
 * Prepare payload from a core response.
 * @param data The core response.
 * @returns The updated core response.
 */
export declare function prepareCoreResponse<R = unknown>(data: any): AmalgamCoreResponse<R>;
