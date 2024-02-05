var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fetchEventSource, EventStreamContentType } from "@microsoft/fetch-event-source";
import { TaskOperationsApi, TraineeManagementApi, SessionManagementApi, TraineeOperationsApi, TraineeFeatureOperationsApi, TraineeCaseOperationsApi, TraineeSessionManagementApi, } from "@howso/openapi-client/apis";
import { Configuration } from "@howso/openapi-client/runtime";
import { ProblemError, ApiError, RetriableError } from "../errors.js";
import { BaseClient } from "../capabilities/index.js";
import { CacheMap } from "../utilities/index.js";
export class PlatformClient extends BaseClient {
    constructor(options) {
        super();
        this.config = new Configuration(Object.assign({}, options));
        this.traineeCache = new CacheMap();
        this.api = {
            task: new TaskOperationsApi(this.config),
            trainee: new TraineeManagementApi(this.config),
            traineeOperations: new TraineeOperationsApi(this.config),
            traineeCases: new TraineeCaseOperationsApi(this.config),
            traineeFeatures: new TraineeFeatureOperationsApi(this.config),
            traineeSession: new TraineeSessionManagementApi(this.config),
            session: new SessionManagementApi(this.config),
        };
    }
    /**
     * Wait for a long running task to complete and return its result.
     * @param action The pending action to wait for.
     * @returns The result of the action.
     */
    waitForAction(action, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            if (!action.action_id) {
                throw new ProblemError("Invalid async response received from server.");
            }
            const basePath = this.config.basePath;
            let retries = 0;
            // Subscribe to action events
            const ctrl = new AbortController();
            // If external signal aborts, also abort our signal
            (_a = options === null || options === void 0 ? void 0 : options.signal) === null || _a === void 0 ? void 0 : _a.addEventListener("abort", () => ctrl.abort());
            try {
                const accessToken = this.config.accessToken ? yield this.config.accessToken() : "";
                yield fetchEventSource(`${basePath}/v3/operations/actions/${action.action_id}/subscribe/`, {
                    // openWhenHidden: true, // TODO: Support last event id retry in API
                    credentials: "include",
                    headers: {
                        Authorization: accessToken,
                    },
                    signal: ctrl.signal,
                    onopen(response) {
                        var _a;
                        return __awaiter(this, void 0, void 0, function* () {
                            if (response.ok && ((_a = response.headers.get("content-type")) === null || _a === void 0 ? void 0 : _a.startsWith(EventStreamContentType))) {
                                retries = 0;
                                return; // Successfully opened
                            }
                            else if (retries >= 5 || (response.status >= 400 && response.status < 500 && response.status !== 429)) {
                                // client-side errors are usually non-retriable:
                                throw new ApiError({
                                    status: response.status,
                                    detail: `Failed to wait for action: ${action.operation_type}`,
                                });
                            }
                            else {
                                // Try to establish connection again
                                retries += 1;
                                throw new RetriableError();
                            }
                        });
                    },
                    onmessage(ev) {
                        const status = ev.data;
                        if (["complete", "failed", "expired", "cancelled"].includes(status)) {
                            ctrl.abort();
                        }
                    },
                    onclose() {
                        // If the server closes the connection unexpectedly, retry
                        throw new RetriableError();
                    },
                    onerror(err) {
                        if (err instanceof RetriableError) {
                            // Automatically retry
                            return;
                        }
                        throw err;
                    },
                });
            }
            catch (err) {
                if (((_b = options === null || options === void 0 ? void 0 : options.signal) === null || _b === void 0 ? void 0 : _b.aborted) || !ctrl.signal.aborted) {
                    // If we haven't aborted to close the request ourselves
                    if (options === null || options === void 0 ? void 0 : options.onFailWait) {
                        options.onFailWait();
                    }
                    throw err;
                }
            }
            // Retrieve the output
            let state;
            try {
                state = yield this.api.task.getActionOutput(action.action_id, { signal: options === null || options === void 0 ? void 0 : options.signal });
            }
            catch (err) {
                if (options === null || options === void 0 ? void 0 : options.onFailWait) {
                    options.onFailWait();
                }
                throw err;
            }
            switch (state.status) {
                case "complete":
                    break;
                case "pending": // TODO: attempt retries before raising timed out
                case "expired":
                    throw new ProblemError(`The operation '${state.operation_type}' timed out.`);
                case "cancelled":
                    throw new ProblemError(`The operation '${state.operation_type}' was cancelled before it could be completed.`);
                case "failed": {
                    throw ApiError.fromJson(state.output);
                }
                default:
                    throw new ProblemError("Unexpected async action status received.");
            }
            return state.output;
        });
    }
    setup() {
        return __awaiter(this, void 0, void 0, function* () {
            // Nothing to do
        });
    }
    getActiveSession(initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.activeSession == null) {
                this.activeSession = yield this.api.session.getActiveSession(initOverrides);
            }
            return this.activeSession;
        });
    }
    beginSession(name = "default", metadata, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.session.beginSession({ name, metadata }, initOverrides);
        });
    }
    getTraineeSessions(traineeId, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            const sessions = (yield this.api.traineeSession.getTraineeSessions(traineeId, initOverrides));
            return sessions !== null && sessions !== void 0 ? sessions : [];
        });
    }
    acquireTraineeResources(traineeId, request, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            const action = yield this.api.trainee.acquireTraineeResources(traineeId, request, initOverrides);
            yield this.waitForAction(action, { signal: initOverrides === null || initOverrides === void 0 ? void 0 : initOverrides.signal });
        });
    }
    releaseTraineeResources(traineeId, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.trainee.releaseTraineeResources(traineeId, initOverrides);
        });
    }
    createTrainee(trainee, options = {}, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = Object.assign({ trainee: trainee }, options);
            const response = yield this.api.trainee.createTrainee(request, initOverrides);
            return this.waitForAction(response, {
                signal: initOverrides === null || initOverrides === void 0 ? void 0 : initOverrides.signal,
                onFailWait: () => __awaiter(this, void 0, void 0, function* () {
                    // If we fail to wait for trainee or request is aborted, delete the trainee resource
                    if (response === null || response === void 0 ? void 0 : response.trainee_id) {
                        this.deleteTrainee(response.trainee_id);
                    }
                }),
            });
        });
    }
    updateTrainee(_trainee, _initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getTrainee(traineeId, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.api.trainee.getTrainee(traineeId, initOverrides));
        });
    }
    deleteTrainee(traineeId, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.trainee.deleteTrainee(traineeId, initOverrides);
        });
    }
    listTrainees(_keywords, _initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    train(traineeId, request, initOverrides) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const run_async = (_a = request.run_async) !== null && _a !== void 0 ? _a : ((_b = request.cases) === null || _b === void 0 ? void 0 : _b.length) > 100;
            let response = yield this.api.traineeOperations.train(traineeId, Object.assign({ run_async }, request), initOverrides);
            if (isAsyncAcceptedResponse(response)) {
                response = yield this.waitForAction(response, { signal: initOverrides === null || initOverrides === void 0 ? void 0 : initOverrides.signal });
            }
            if (response.status === "analyze") {
                yield this.autoAnalyze(traineeId, initOverrides);
            }
        });
    }
    analyze(traineeId, request, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.api.traineeOperations.analyze(traineeId, request, initOverrides);
            if (isAsyncAcceptedResponse(response)) {
                yield this.waitForAction(response, { signal: initOverrides === null || initOverrides === void 0 ? void 0 : initOverrides.signal });
            }
        });
    }
    setAutoAnalyzeParams(traineeId, request, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.traineeOperations.setAutoAnalyzeParams(traineeId, request, initOverrides);
        });
    }
    autoAnalyze(traineeId, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.api.traineeOperations.autoAnalyze(traineeId, initOverrides);
            if (isAsyncAcceptedResponse(response)) {
                yield this.waitForAction(response, { signal: initOverrides === null || initOverrides === void 0 ? void 0 : initOverrides.signal });
            }
        });
    }
    getCases(traineeId, request, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.traineeCases.getCases(traineeId, request, initOverrides);
        });
    }
    getNumTrainingCases(traineeId, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.api.traineeCases.getNumTrainingCases(traineeId, initOverrides);
            return response.count || 0;
        });
    }
    setFeatureAttributes(traineeId, attributes, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.traineeFeatures.setFeatureAttributes(traineeId, attributes, initOverrides);
        });
    }
    getFeatureAttributes(traineeId, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.traineeFeatures.getFeatureAttributes(traineeId, initOverrides);
        });
    }
    react(traineeId, request, initOverrides) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const run_async = (_a = request.run_async) !== null && _a !== void 0 ? _a : true;
            const response = yield this.api.traineeOperations.react(traineeId, Object.assign({ run_async }, request), initOverrides);
            if (isAsyncAcceptedResponse(response)) {
                return yield this.waitForAction(response, { signal: initOverrides === null || initOverrides === void 0 ? void 0 : initOverrides.signal });
            }
            return response;
        });
    }
    reactSeries(_traineeId, _request, _initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    reactGroup(_traineeId, _request, _initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    reactIntoFeatures(_traineeId, _request, _initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    reactIntoTrainee(_traineeId, _request, _initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getPredictionStats(traineeId, request, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.api.traineeFeatures.getPredictionStats(traineeId, request, initOverrides);
            if (isAsyncAcceptedResponse(response)) {
                return yield this.waitForAction(response, { signal: initOverrides === null || initOverrides === void 0 ? void 0 : initOverrides.signal });
            }
            return response;
        });
    }
    getMarginalStats(traineeId, request, initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.traineeFeatures.getMarginalStats(traineeId, request, initOverrides);
        });
    }
    getFeatureConviction(_traineeId, _request, _initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getFeatureContributions(_traineeId, _request, _initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getFeatureResiduals(_traineeId, _request, _initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getFeatureMda(_traineeId, _request, _initOverrides) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
}
PlatformClient.capabilities = {
    supportsAuthentication: true,
    // supportsAccounts: true,
    // supportsProjects: true,
    supportsTrainees: true,
    // supportsSessions: true,
    // supportsTrace: true,
};
/**
 * Type assertion for AsyncActionAccepted responses.
 * @param response The response object.
 * @returns True if response is an AsyncActionAccepted response object.
 */
function isAsyncAcceptedResponse(obj) {
    if (obj != null &&
        typeof (obj === null || obj === void 0 ? void 0 : obj.action_id) === "string" &&
        typeof (obj === null || obj === void 0 ? void 0 : obj.operation_type) === "string") {
        return true;
    }
    return false;
}
