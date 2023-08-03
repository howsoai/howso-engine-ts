import { fetchEventSource, EventStreamContentType } from "@microsoft/fetch-event-source";

import type {
  AsyncActionAccepted,
  AsyncActionFailedOutput,
  AsyncActionCompleteOutput,
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
  TrainResponse,
  FeatureConviction,
  FeatureConvictionRequest,
  FeatureResidualsRequest,
  FeatureContributionsRequest,
  FeatureMdaRequest,
  FeatureMarginalStats,
  FeatureMarginalStatsRequest,
  TraineeRequest,
  TraineeCreateRequest,
} from "howso-openapi-client/models";
import {
  TaskOperationsApi,
  TraineeManagementApi,
  SessionManagementApi,
  TraineeOperationsApi,
  TraineeFeatureOperationsApi,
  TraineeCaseOperationsApi,
} from "howso-openapi-client/apis";
import { Configuration, ConfigurationParameters } from "howso-openapi-client/runtime";

import { Trainee } from "../../trainees/index.js";
import { ProblemError, ApiError, RetriableError } from "../errors.js";
import { Capabilities, BaseClient, TraineeBaseCache, ITraineeClient, ISessionClient } from "../capabilities/index.js";
import { CacheMap } from "../utilities/index.js";

type InitOverrides = RequestInit;

export class PlatformClient extends BaseClient implements ITraineeClient, ISessionClient {
  public static readonly capabilities: Capabilities = {
    supportsAuthentication: true,
    // supportsAccounts: true,
    // supportsProjects: true,
    supportsTrainees: true,
    // supportsSessions: true,
    // supportsTrace: true,
  };
  protected readonly traineeCache: CacheMap<TraineeBaseCache>;
  protected readonly config: Configuration;
  protected readonly api: {
    readonly task: TaskOperationsApi;
    readonly trainee: TraineeManagementApi;
    readonly traineeOperations: TraineeOperationsApi;
    readonly traineeCases: TraineeCaseOperationsApi;
    readonly traineeFeatures: TraineeFeatureOperationsApi;
    readonly session: SessionManagementApi;
  };
  protected activeSession?: Session;

  constructor(options: ConfigurationParameters) {
    super();
    this.config = new Configuration({
      ...options,
    });
    this.traineeCache = new CacheMap();
    this.api = {
      task: new TaskOperationsApi(this.config),
      trainee: new TraineeManagementApi(this.config),
      traineeOperations: new TraineeOperationsApi(this.config),
      traineeCases: new TraineeCaseOperationsApi(this.config),
      traineeFeatures: new TraineeFeatureOperationsApi(this.config),
      session: new SessionManagementApi(this.config),
    };
  }

  /**
   * Wait for a long running task to complete and return its result.
   * @param action The pending action to wait for.
   * @returns The result of the action.
   */
  protected async waitForAction<T = AsyncActionCompleteOutput["output"]>(
    action: AsyncActionAccepted,
    options?: { signal?: AbortSignal | null | undefined; onFailWait?: () => Promise<void> }
  ): Promise<T> {
    if (!action.action_id) {
      throw new ProblemError("Invalid async response received from server.");
    }
    const basePath = this.config.basePath.replace(new RegExp("/v2$"), "/v3");
    let retries = 0;

    // Subscribe to action events
    const ctrl = new AbortController();
    // If external signal aborts, also abort our signal
    options?.signal?.addEventListener("abort", () => ctrl.abort());

    try {
      const accessToken = this.config.accessToken ? await this.config.accessToken() : "";
      await fetchEventSource(`${basePath}/operations/actions/${action.action_id}/subscribe/`, {
        // openWhenHidden: true, // TODO: Support last event id retry in API
        credentials: "include",
        headers: {
          Authorization: accessToken,
        },
        signal: ctrl.signal,
        async onopen(response) {
          if (response.ok && response.headers.get("content-type")?.startsWith(EventStreamContentType)) {
            retries = 0;
            return; // Successfully opened
          } else if (retries >= 5 || (response.status >= 400 && response.status < 500 && response.status !== 429)) {
            // client-side errors are usually non-retriable:
            throw new ApiError({
              status: response.status,
              detail: `Failed to wait for action: ${action.operation_type}`,
            });
          } else {
            // Try to establish connection again
            retries += 1;
            throw new RetriableError();
          }
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
    } catch (err) {
      if (options?.signal?.aborted || !ctrl.signal.aborted) {
        // If we haven't aborted to close the request ourselves
        if (options?.onFailWait) {
          options.onFailWait();
        }
        throw err;
      }
    }

    // Retrieve the output
    let state;
    try {
      state = await this.api.task.getActionOutput(action.action_id, { signal: options?.signal });
    } catch (err) {
      if (options?.onFailWait) {
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
        throw ApiError.fromJson((state as AsyncActionFailedOutput).output);
      }
      default:
        throw new ProblemError("Unexpected async action status received.");
    }
    return (state as AsyncActionCompleteOutput).output;
  }

  public async setup(): Promise<void> {
    // Nothing to do
  }

  public async getActiveSession(initOverrides?: InitOverrides): Promise<Readonly<Session>> {
    if (this.activeSession == null) {
      this.activeSession = await this.api.session.getActiveSession(initOverrides);
    }
    return this.activeSession;
  }

  public async beginSession(
    name = "default",
    metadata?: Record<string, unknown>,
    initOverrides?: InitOverrides
  ): Promise<Session> {
    return await this.api.session.beginSession({ name, metadata }, initOverrides);
  }

  public async acquireTraineeResources(
    traineeId: string,
    request?: TraineeAcquireResourcesRequest,
    initOverrides?: InitOverrides
  ): Promise<void> {
    const action = await this.api.trainee.acquireTraineeResources(traineeId, request, initOverrides);
    await this.waitForAction(action, { signal: initOverrides?.signal });
  }

  public async releaseTraineeResources(traineeId: string, initOverrides?: InitOverrides): Promise<void> {
    await this.api.trainee.releaseTraineeResources(traineeId, initOverrides);
  }

  public async createTrainee(
    trainee: Omit<Trainee, "id">,
    options: Omit<TraineeCreateRequest, "trainee"> = {},
    initOverrides?: InitOverrides
  ): Promise<Trainee> {
    const request = { trainee: trainee as TraineeRequest, ...options };
    const response = await this.api.trainee.createTrainee(request, initOverrides);
    return this.waitForAction<Trainee>(response, {
      signal: initOverrides?.signal,
      onFailWait: async () => {
        // If we fail to wait for trainee or request is aborted, delete the trainee resource
        if (response?.trainee_id) {
          this.deleteTrainee(response.trainee_id);
        }
      },
    });
  }

  public async updateTrainee(_trainee: Trainee, _initOverrides?: InitOverrides): Promise<Trainee> {
    throw new Error("Method not implemented.");
  }

  public async getTrainee(traineeId: string, initOverrides?: InitOverrides): Promise<Trainee> {
    return (await this.api.trainee.getTrainee(traineeId, initOverrides)) as Trainee;
  }

  public async deleteTrainee(traineeId: string, initOverrides?: InitOverrides): Promise<void> {
    await this.api.trainee.deleteTrainee(traineeId, initOverrides);
  }

  public async listTrainees(_keywords: string | string[], _initOverrides?: InitOverrides): Promise<TraineeIdentity[]> {
    throw new Error("Method not implemented.");
  }

  public async train(traineeId: string, request: TrainRequest, initOverrides?: InitOverrides): Promise<void> {
    const run_async = request.run_async ?? request.cases?.length > 100;

    let response = await this.api.traineeOperations.train(traineeId, { run_async, ...request }, initOverrides);
    if (isAsyncAcceptedResponse(response)) {
      response = await this.waitForAction<TrainResponse>(response, { signal: initOverrides?.signal });
    }
    if (response.status === "analyze") {
      await this.autoAnalyze(traineeId, initOverrides);
    }
  }

  public async analyze(traineeId: string, request: AnalyzeRequest, initOverrides?: InitOverrides): Promise<void> {
    const response = await this.api.traineeOperations.analyze(traineeId, request, initOverrides);
    if (isAsyncAcceptedResponse(response)) {
      await this.waitForAction(response, { signal: initOverrides?.signal });
    }
  }

  public async setAutoAnalyzeParams(
    traineeId: string,
    request: SetAutoAnalyzeParamsRequest,
    initOverrides?: InitOverrides
  ): Promise<void> {
    await this.api.traineeOperations.setAutoAnalyzeParams(traineeId, request, initOverrides);
  }

  public async autoAnalyze(traineeId: string, initOverrides?: InitOverrides): Promise<void> {
    const response = await this.api.traineeOperations.autoAnalyze(traineeId, initOverrides);
    if (isAsyncAcceptedResponse(response)) {
      await this.waitForAction(response, { signal: initOverrides?.signal });
    }
  }

  public async getCases(traineeId: string, request?: CasesRequest, initOverrides?: InitOverrides): Promise<Cases> {
    return await this.api.traineeCases.getCases(traineeId, request, initOverrides);
  }

  public async getNumTrainingCases(traineeId: string, initOverrides?: InitOverrides): Promise<number> {
    const response = await this.api.traineeCases.getNumTrainingCases(traineeId, initOverrides);
    return response.count || 0;
  }

  public async setFeatureAttributes(
    traineeId: string,
    attributes: Record<string, FeatureAttributes>,
    initOverrides?: InitOverrides
  ): Promise<void> {
    await this.api.traineeFeatures.setFeatureAttributes(traineeId, attributes, initOverrides);
  }

  public async getFeatureAttributes(
    traineeId: string,
    initOverrides?: InitOverrides
  ): Promise<Record<string, FeatureAttributes>> {
    return await this.api.traineeFeatures.getFeatureAttributes(traineeId, initOverrides);
  }

  public async react(traineeId: string, request: ReactRequest, initOverrides?: InitOverrides): Promise<ReactResponse> {
    const run_async = request.run_async ?? true;
    const response = await this.api.traineeOperations.react(traineeId, { run_async, ...request }, initOverrides);
    if (isAsyncAcceptedResponse(response)) {
      return await this.waitForAction(response, { signal: initOverrides?.signal });
    }
    return response;
  }

  public async reactSeries(
    _traineeId: string,
    _request: ReactSeriesRequest,
    _initOverrides?: InitOverrides
  ): Promise<ReactSeriesResponse> {
    throw new Error("Method not implemented.");
  }

  public async reactGroup(
    _traineeId: string,
    _request: ReactGroupRequest,
    _initOverrides?: InitOverrides
  ): Promise<ReactGroupResponse> {
    throw new Error("Method not implemented.");
  }

  public async reactIntoFeatures(
    _traineeId: string,
    _request: ReactIntoFeaturesRequest,
    _initOverrides?: InitOverrides
  ): Promise<ReactIntoFeaturesResponse> {
    throw new Error("Method not implemented.");
  }

  public async reactIntoTrainee(
    _traineeId: string,
    _request: ReactIntoTraineeRequest,
    _initOverrides?: InitOverrides
  ): Promise<ReactIntoTraineeResponse> {
    throw new Error("Method not implemented.");
  }

  public async getPredictionStats(
    traineeId: string,
    request: FeaturePredictionStatsRequest,
    initOverrides?: InitOverrides
  ): Promise<FeaturePredictionStats> {
    const response = await this.api.traineeFeatures.getPredictionStats(traineeId, request, initOverrides);
    if (isAsyncAcceptedResponse(response)) {
      return await this.waitForAction(response, { signal: initOverrides?.signal });
    }
    return response;
  }

  public async getMarginalStats(
    traineeId: string,
    request: FeatureMarginalStatsRequest,
    initOverrides?: InitOverrides
  ): Promise<FeatureMarginalStats> {
    return await this.api.traineeFeatures.getMarginalStats(traineeId, request, initOverrides);
  }

  public async getFeatureConviction(
    _traineeId: string,
    _request: FeatureConvictionRequest,
    _initOverrides?: InitOverrides
  ): Promise<FeatureConviction> {
    throw new Error("Method not implemented.");
  }

  public async getFeatureContributions(
    _traineeId: string,
    _request: FeatureContributionsRequest,
    _initOverrides?: InitOverrides
  ): Promise<Record<string, number>> {
    throw new Error("Method not implemented.");
  }

  public async getFeatureResiduals(
    _traineeId: string,
    _request: FeatureResidualsRequest,
    _initOverrides?: InitOverrides
  ): Promise<Record<string, number>> {
    throw new Error("Method not implemented.");
  }

  public async getFeatureMda(
    _traineeId: string,
    _request: FeatureMdaRequest,
    _initOverrides?: InitOverrides
  ): Promise<Record<string, number>> {
    throw new Error("Method not implemented.");
  }
}

/**
 * Type assertion for AsyncActionAccepted responses.
 * @param response The response object.
 * @returns True if response is an AsyncActionAccepted response object.
 */
function isAsyncAcceptedResponse(obj: any): obj is AsyncActionAccepted {
  if (typeof obj?.action_id === "string" && typeof obj?.operation_type === "string") {
    return true;
  }
  return false;
}
