import { ModelErrorFromJSON } from "diveplane-openapi-client/models";
export class DiveplaneError extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}
export class DiveplaneApiError extends DiveplaneError {
    constructor(problem) {
        super(problem === null || problem === void 0 ? void 0 : problem.detail, problem === null || problem === void 0 ? void 0 : problem.code);
        this.problem = problem;
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
    static fromJson(json) {
        const error = ModelErrorFromJSON(json);
        return new DiveplaneApiError(error);
    }
}
export class ValidationError extends DiveplaneError {
}
export class TimeoutError extends DiveplaneError {
}
