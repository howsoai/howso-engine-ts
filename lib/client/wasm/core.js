import { AmalgamError } from "@howso/amalgam-lang";
export class AmalgamCoreError extends AmalgamError {
    constructor(message, code) {
        super(message, code);
        // Set the prototype explicitly
        Object.setPrototypeOf(this, new.target.prototype);
        this.name = "AmalgamCoreError";
    }
}
export class AmalgamCoreWarning {
    constructor(detail = "", code) {
        this.detail = detail;
        this.code = code;
    }
    get message() {
        return this.detail;
    }
}
/**
 * Prepare payload for a core request.
 * @param payload The core payload.
 * @returns The updated core payload.
 */
export function prepareCoreRequest(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
payload) {
    if (!payload) {
        return payload;
    }
    // Remove null properties from payload
    const filtered = Object.assign({}, payload);
    for (const key in filtered) {
        if (filtered[key] == null) {
            delete filtered[key];
        }
    }
    return filtered;
}
/**
 * Prepare payload from a core response.
 * @param data The core response.
 * @returns The updated core response.
 */
export function prepareCoreResponse(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
data) {
    var _a, _b;
    if (!data) {
        throw new AmalgamError("Null or empty response received from core.");
    }
    if ((data === null || data === void 0 ? void 0 : data.constructor) == Object) {
        const errors = [];
        const warnings = [];
        // Collect warnings
        if (((_a = data.warnings) === null || _a === void 0 ? void 0 : _a.length) > 0) {
            for (const w of data.warnings) {
                warnings.push(new AmalgamCoreWarning(w === null || w === void 0 ? void 0 : w.detail, w === null || w === void 0 ? void 0 : w.code));
            }
        }
        // Collect errors
        if (data.status !== "ok") {
            if (((_b = data.errors) === null || _b === void 0 ? void 0 : _b.length) > 0) {
                for (const e of data.errors) {
                    errors.push(new AmalgamCoreError(e === null || e === void 0 ? void 0 : e.detail, e === null || e === void 0 ? void 0 : e.code));
                }
            }
            else {
                errors.push(new AmalgamCoreError("An unknown error occurred."));
            }
            return { errors, warnings, content: data.payload };
        }
        return {
            errors,
            warnings,
            content: data.payload,
        };
    }
    else if (["string", "number", "bigint", "boolean"].indexOf(typeof data) != -1) {
        return { errors: [], warnings: [], content: data };
    }
    throw new AmalgamError("Malformed response received from core.");
}
