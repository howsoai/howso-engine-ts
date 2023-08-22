import type { AsyncActionAccepted, AsyncActionCompleteOutput, AnalyzeRequest, Cases, CasesRequest, FeatureAttributes, FeaturePredictionStats, FeaturePredictionStatsRequest, ReactRequest, ReactResponse, ReactSeriesRequest, ReactSeriesResponse, ReactGroupRequest, ReactGroupResponse, ReactIntoTraineeRequest, ReactIntoTraineeResponse, ReactIntoFeaturesRequest, ReactIntoFeaturesResponse, Session, SessionIdentity, SetAutoAnalyzeParamsRequest, TraineeAcquireResourcesRequest, TraineeIdentity, TrainRequest, FeatureConviction, FeatureConvictionRequest, FeatureResidualsRequest, FeatureContributionsRequest, FeatureMdaRequest, FeatureMarginalStats, FeatureMarginalStatsRequest, TraineeCreateRequest } from "howso-openapi-client/models";
import { TaskOperationsApi, TraineeManagementApi, SessionManagementApi, TraineeOperationsApi, TraineeFeatureOperationsApi, TraineeCaseOperationsApi, TraineeSessionManagementApi } from "howso-openapi-client/apis";
import { Configuration, ConfigurationParameters } from "howso-openapi-client/runtime";
import { Trainee } from "../../trainees/index.js";
import { Capabilities, BaseClient, TraineeBaseCache, ITraineeClient, ISessionClient } from "../capabilities/index.js";
import { CacheMap } from "../utilities/index.js";
type InitOverrides = RequestInit;
export declare class PlatformClient extends BaseClient implements ITraineeClient, ISessionClient {
    static readonly capabilities: Capabilities;
    protected readonly traineeCache: CacheMap<TraineeBaseCache>;
    protected readonly config: Configuration;
    protected readonly api: {
        readonly task: TaskOperationsApi;
        readonly trainee: TraineeManagementApi;
        readonly traineeOperations: TraineeOperationsApi;
        readonly traineeCases: TraineeCaseOperationsApi;
        readonly traineeFeatures: TraineeFeatureOperationsApi;
        readonly traineeSession: TraineeSessionManagementApi;
        readonly session: SessionManagementApi;
    };
    protected activeSession?: Session;
    constructor(options: ConfigurationParameters);
    /**
     * Wait for a long running task to complete and return its result.
     * @param action The pending action to wait for.
     * @returns The result of the action.
     */
    protected waitForAction<T = AsyncActionCompleteOutput["output"]>(action: AsyncActionAccepted, options?: {
        signal?: AbortSignal | null | undefined;
        onFailWait?: () => Promise<void>;
    }): Promise<T>;
    setup(): Promise<void>;
    getActiveSession(initOverrides?: InitOverrides): Promise<Readonly<Session>>;
    beginSession(name?: string, metadata?: Record<string, unknown>, initOverrides?: InitOverrides): Promise<Session>;
    getTraineeSessions(traineeId: string, initOverrides?: InitOverrides): Promise<Required<SessionIdentity>[]>;
    acquireTraineeResources(traineeId: string, request?: TraineeAcquireResourcesRequest, initOverrides?: InitOverrides): Promise<void>;
    releaseTraineeResources(traineeId: string, initOverrides?: InitOverrides): Promise<void>;
    createTrainee(trainee: Omit<Trainee, "id">, options?: Omit<TraineeCreateRequest, "trainee">, initOverrides?: InitOverrides): Promise<Trainee>;
    updateTrainee(_trainee: Trainee, _initOverrides?: InitOverrides): Promise<Trainee>;
    getTrainee(traineeId: string, initOverrides?: InitOverrides): Promise<Trainee>;
    deleteTrainee(traineeId: string, initOverrides?: InitOverrides): Promise<void>;
    listTrainees(_keywords: string | string[], _initOverrides?: InitOverrides): Promise<TraineeIdentity[]>;
    train(traineeId: string, request: TrainRequest, initOverrides?: InitOverrides): Promise<void>;
    analyze(traineeId: string, request: AnalyzeRequest, initOverrides?: InitOverrides): Promise<void>;
    setAutoAnalyzeParams(traineeId: string, request: SetAutoAnalyzeParamsRequest, initOverrides?: InitOverrides): Promise<void>;
    autoAnalyze(traineeId: string, initOverrides?: InitOverrides): Promise<void>;
    getCases(traineeId: string, request?: CasesRequest, initOverrides?: InitOverrides): Promise<Cases>;
    getNumTrainingCases(traineeId: string, initOverrides?: InitOverrides): Promise<number>;
    setFeatureAttributes(traineeId: string, attributes: Record<string, FeatureAttributes>, initOverrides?: InitOverrides): Promise<void>;
    getFeatureAttributes(traineeId: string, initOverrides?: InitOverrides): Promise<Record<string, FeatureAttributes>>;
    react(traineeId: string, request: ReactRequest, initOverrides?: InitOverrides): Promise<ReactResponse>;
    reactSeries(_traineeId: string, _request: ReactSeriesRequest, _initOverrides?: InitOverrides): Promise<ReactSeriesResponse>;
    reactGroup(_traineeId: string, _request: ReactGroupRequest, _initOverrides?: InitOverrides): Promise<ReactGroupResponse>;
    reactIntoFeatures(_traineeId: string, _request: ReactIntoFeaturesRequest, _initOverrides?: InitOverrides): Promise<ReactIntoFeaturesResponse>;
    reactIntoTrainee(_traineeId: string, _request: ReactIntoTraineeRequest, _initOverrides?: InitOverrides): Promise<ReactIntoTraineeResponse>;
    getPredictionStats(traineeId: string, request: FeaturePredictionStatsRequest, initOverrides?: InitOverrides): Promise<FeaturePredictionStats>;
    getMarginalStats(traineeId: string, request: FeatureMarginalStatsRequest, initOverrides?: InitOverrides): Promise<FeatureMarginalStats>;
    getFeatureConviction(_traineeId: string, _request: FeatureConvictionRequest, _initOverrides?: InitOverrides): Promise<FeatureConviction>;
    getFeatureContributions(_traineeId: string, _request: FeatureContributionsRequest, _initOverrides?: InitOverrides): Promise<Record<string, number>>;
    getFeatureResiduals(_traineeId: string, _request: FeatureResidualsRequest, _initOverrides?: InitOverrides): Promise<Record<string, number>>;
    getFeatureMda(_traineeId: string, _request: FeatureMdaRequest, _initOverrides?: InitOverrides): Promise<Record<string, number>>;
}
export {};
