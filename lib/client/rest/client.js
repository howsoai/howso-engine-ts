var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Configuration } from "diveplane-openapi-client/runtime";
import { TaskOperationsApi, TraineeManagementApi, SessionManagementApi } from "diveplane-openapi-client/apis";
// import { DiveplaneError, DiveplaneApiError } from "../errors.js";
import { DiveplaneBaseClient, } from "../capabilities/index.js";
import { CacheMap } from "../utilities/index.js";
export class DiveplaneClient extends DiveplaneBaseClient {
    constructor(options) {
        super();
        this.config = new Configuration(options);
        this.traineeCache = new CacheMap();
        this.api = {
            task: new TaskOperationsApi(this.config),
            trainee: new TraineeManagementApi(this.config),
            session: new SessionManagementApi(this.config),
        };
    }
    // protected async waitForAction<T extends GenericActionOutput = GenericActionOutput>(
    //   action: AsyncActionAccepted,
    //   options: { maxInterval?: number; maxWait?: number; maxRetries?: number }
    // ): Promise<T> {
    //   if (action.action_id != null) {
    //     options.maxInterval ??= 60;
    //     options.maxRetries ??= 3;
    //     let interval = 1;
    //     let polls = 1;
    //     let retries = 0;
    //     const startTime = new Date();
    //     let state: AsyncActionStatus | AsyncActionOutput;
    //     do {
    //       state = await this.api.task.getActionOutput(action.action_id);
    //       polls += 1;
    //       retries = 0;
    //       switch (state.status) {
    //         case "pending":
    //           if (polls > 0) {
    //             interval = Math.floor(1.15 ** (Math.min(polls, 60) - 1));
    //             interval = Math.max(1, Math.min(interval, options.maxInterval, 3600));
    //           }
    //           break;
    //         case "cancelled":
    //           throw new DiveplaneError(
    //             `The operation '${state.operation_type}' was cancelled before it could be completed.`
    //           );
    //         case "failed": {
    //           throw DiveplaneApiError.fromJson((state as AsyncActionFailedOutput).output);
    //         }
    //         case "complete":
    //           return (state as AsyncActionOutput).output;
    //         default:
    //           throw new DiveplaneError("Unexpected async action status received.");
    //       }
    //       await delay(interval);
    //     } while (state.status == "pending");
    //   } else {
    //     throw new DiveplaneError("Invalid async response received from server.");
    //   }
    // }
    setup() {
        throw new Error("Method not implemented.");
    }
    getActiveSession() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.activeSession == null) {
                this.activeSession = yield this.api.session.getActiveSession();
            }
            return this.activeSession;
        });
    }
    beginSession(name = "default", metadata) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.api.session.beginSession({ name, metadata });
        });
    }
    acquireTraineeResources(traineeId, options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.api.trainee.acquireTraineeResources(traineeId, options);
            // await this.waitForAction<TrainActionOutput>(action);
        });
    }
    releaseTraineeResources(_traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    createTrainee(_trainee) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    updateTrainee(_trainee) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getTrainee(_traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    deleteTrainee(_traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    listTrainees(_keywords) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    train(_traineeId, _request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    optimize(_traineeId, _request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    setAutoOptimize(_traineeId, _request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    autoOptimize(_traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getCases(_traineeId, _request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getNumTrainingCases(_traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    setFeatureAttributes(_traineeId, _attributes) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getFeatureAttributes(_traineeId) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    react(_traineeId, _request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    reactSeries(_traineeId, _request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    reactGroup(_traineeId, _request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    reactIntoFeatures(_traineeId, _request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    reactIntoTrainee(_traineeId, _request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getFeatureConviction(_traineeId, _request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getFeatureContributions(_traineeId, _request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getFeatureResiduals(_traineeId, _request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
    getFeatureMda(_traineeId, _request) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error("Method not implemented.");
        });
    }
}
DiveplaneClient.capabilities = {
// supportsAuthentication: true,
// supportsAccounts: true,
// supportsProjects: true,
// supportsTrainees: true,
// supportsSessions: true,
// supportsTrace: true,
};
