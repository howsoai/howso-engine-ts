import type {
  // AsyncActionAccepted,
  // AsyncActionOutput,
  // AsyncActionFailedOutput,
  // GenericActionOutput,
  AnalyzeRequest,
  Cases,
  CasesRequest,
  FeatureAttributes,
  FeaturePredictionStats,
  FeaturePredictionStatsRequest,
  ReactRequest,
  ReactResponse,
  ReactSeriesRequest,
  ReactSeriesResponse,
  ReactGroupRequest,
  ReactGroupResponse,
  ReactIntoTraineeRequest,
  ReactIntoTraineeResponse,
  ReactIntoFeaturesRequest,
  ReactIntoFeaturesResponse,
  Session,
  SetAutoAnalyzeParamsRequest,
  TraineeAcquireResourcesRequest,
  TraineeIdentity,
  TrainRequest,
  FeatureConviction,
  FeatureConvictionRequest,
  FeatureResidualsRequest,
  FeatureContributionsRequest,
  FeatureMdaRequest,
} from "diveplane-openapi-client/models";
import { Configuration, ConfigurationParameters } from "diveplane-openapi-client/runtime";
import { TaskOperationsApi, TraineeManagementApi, SessionManagementApi } from "diveplane-openapi-client/apis";

import { Trainee } from "../../trainees/index.js";
// import { DiveplaneError, DiveplaneApiError } from "../errors.js";
import {
  Capabilities,
  DiveplaneBaseClient,
  TraineeBaseCache,
  ITraineeClient,
  ISessionClient,
} from "../capabilities/index.js";
import { CacheMap } from "../utilities/index.js";

export class DiveplaneClient extends DiveplaneBaseClient implements ITraineeClient, ISessionClient {
  public static readonly capabilities: Capabilities = {
    // supportsAuthentication: true,
    // supportsAccounts: true,
    // supportsProjects: true,
    // supportsTrainees: true,
    // supportsSessions: true,
    // supportsTrace: true,
  };
  protected readonly traineeCache: CacheMap<TraineeBaseCache>;
  protected readonly config: Configuration;
  protected readonly api: {
    readonly task: TaskOperationsApi;
    readonly trainee: TraineeManagementApi;
    readonly session: SessionManagementApi;
  };
  protected activeSession?: Session;

  constructor(options: ConfigurationParameters) {
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

  public setup(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async getActiveSession(): Promise<Readonly<Session>> {
    if (this.activeSession == null) {
      this.activeSession = await this.api.session.getActiveSession();
    }
    return this.activeSession;
  }

  public async beginSession(name = "default", metadata?: Record<string, unknown>): Promise<Session> {
    return await this.api.session.beginSession({ name, metadata });
  }

  public async acquireTraineeResources(traineeId: string, options?: TraineeAcquireResourcesRequest): Promise<void> {
    await this.api.trainee.acquireTraineeResources(traineeId, options);
    // await this.waitForAction<TrainActionOutput>(action);
  }

  public async releaseTraineeResources(_traineeId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async createTrainee(_trainee: Omit<Trainee, "id">): Promise<Trainee> {
    throw new Error("Method not implemented.");
  }

  public async updateTrainee(_trainee: Trainee): Promise<Trainee> {
    throw new Error("Method not implemented.");
  }

  public async getTrainee(_traineeId: string): Promise<Trainee> {
    throw new Error("Method not implemented.");
  }

  public async deleteTrainee(_traineeId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async listTrainees(_keywords: string | string[]): Promise<TraineeIdentity[]> {
    throw new Error("Method not implemented.");
  }

  public async train(_traineeId: string, _request: TrainRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async analyze(_traineeId: string, _request: AnalyzeRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async setAutoAnalyzeParams(_traineeId: string, _request: SetAutoAnalyzeParamsRequest): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async autoAnalyze(_traineeId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async getCases(_traineeId: string, _request?: CasesRequest | undefined): Promise<Cases> {
    throw new Error("Method not implemented.");
  }

  public async getNumTrainingCases(_traineeId: string): Promise<number> {
    throw new Error("Method not implemented.");
  }

  public async setFeatureAttributes(_traineeId: string, _attributes: Record<string, FeatureAttributes>): Promise<void> {
    throw new Error("Method not implemented.");
  }

  public async getFeatureAttributes(_traineeId: string): Promise<Record<string, FeatureAttributes>> {
    throw new Error("Method not implemented.");
  }

  public async react(_traineeId: string, _request: ReactRequest): Promise<ReactResponse> {
    throw new Error("Method not implemented.");
  }

  public async reactSeries(_traineeId: string, _request: ReactSeriesRequest): Promise<ReactSeriesResponse> {
    throw new Error("Method not implemented.");
  }

  public async reactGroup(_traineeId: string, _request: ReactGroupRequest): Promise<ReactGroupResponse> {
    throw new Error("Method not implemented.");
  }

  public async reactIntoFeatures(
    _traineeId: string,
    _request: ReactIntoFeaturesRequest
  ): Promise<ReactIntoFeaturesResponse> {
    throw new Error("Method not implemented.");
  }

  public async reactIntoTrainee(
    _traineeId: string,
    _request: ReactIntoTraineeRequest
  ): Promise<ReactIntoTraineeResponse> {
    throw new Error("Method not implemented.");
  }

  public async getPredictionStats(
    _traineeId: string,
    _request: FeaturePredictionStatsRequest
  ): Promise<FeaturePredictionStats> {
    throw new Error("Method not implemented.");
  }

  public async getFeatureConviction(
    _traineeId: string,
    _request: FeatureConvictionRequest
  ): Promise<FeatureConviction> {
    throw new Error("Method not implemented.");
  }

  public async getFeatureContributions(
    _traineeId: string,
    _request: FeatureContributionsRequest
  ): Promise<Record<string, number>> {
    throw new Error("Method not implemented.");
  }

  public async getFeatureResiduals(
    _traineeId: string,
    _request: FeatureResidualsRequest
  ): Promise<Record<string, number>> {
    throw new Error("Method not implemented.");
  }

  public async getFeatureMda(_traineeId: string, _request: FeatureMdaRequest): Promise<Record<string, number>> {
    throw new Error("Method not implemented.");
  }
}
