import type { AmalgamRequest, AmalgamResponseBody, AmalgamCommand, AmalgamCoreResponse } from "amalgam-lang/worker";
import type { Capabilities, ITraineeClient, ISessionClient } from "../capabilities/index.js";
import { AnalyzeRequest, Cases, CasesRequest, FeatureAttributes, FeaturePredictionStats, FeaturePredictionStatsRequest, FeatureMarginalStats, FeatureMarginalStatsRequest, TrainRequest, ReactRequest, ReactResponse, ReactSeriesRequest, ReactSeriesResponse, Session, SetAutoAnalyzeParamsRequest, TraineeIdentity, ReactGroupRequest, ReactGroupResponse, ReactIntoFeaturesRequest, ReactIntoFeaturesResponse, ReactIntoTraineeRequest, ReactIntoTraineeResponse, FeatureContributionsRequest, FeatureMdaRequest, FeatureConviction, FeatureConvictionRequest, FeatureResidualsRequest } from "howso-openapi-client/models";
import { Trainee } from "../../trainees/index.js";
import { BaseClient, TraineeBaseCache } from "../capabilities/index.js";
import { CacheMap } from "../utilities/index.js";
import { FileSystemClient } from "./files.js";
export interface TraineeCache extends TraineeBaseCache {
    entityId: string;
}
interface ClientOptions {
    trace?: boolean;
    migrationsUri?: string | URL;
    coreEntityUri?: string | URL;
    traineeEntityUri?: string | URL;
    libPath?: string;
}
export declare class WasmClient extends BaseClient implements ITraineeClient, ISessionClient {
    protected readonly worker: Worker;
    protected readonly options: ClientOptions;
    static readonly capabilities: Readonly<Capabilities>;
    readonly fs: FileSystemClient;
    protected readonly traineeCache: CacheMap<TraineeCache>;
    protected readonly handle: string;
    protected activeSession?: Session;
    constructor(worker: Worker, options: ClientOptions);
    /**
     * Execute a core entity request.
     * @param label The core label.
     * @param data The request data.
     * @param throwErrors If core errors should be thrown or returned.
     * @returns The core response object.
     */
    protected execute<R, D = unknown>(label: string, data: D, throwErrors?: boolean): Promise<AmalgamCoreResponse<R>>;
    /**
     * Dispatch an Amalgam operation.
     * @param request The operation request.
     * @returns The operation response.
     */
    protected dispatch<T extends AmalgamCommand = AmalgamCommand>(request: AmalgamRequest<T>): Promise<AmalgamResponseBody<T>>;
    /**
     * Automatically resolve a trainee and ensure it is loaded given an identifier.
     * @param traineeId The trainee identifier.
     * @returns The trainee object.
     */
    protected autoResolveTrainee(traineeId: string): Promise<Trainee>;
    /**
     * Automatically persist trainee object when appropriate based on persistence level.
     * @param traineeId The trainee identifier.
     */
    protected autoPersistTrainee(traineeId: string): Promise<void>;
    /**
     * Retrieve the trainees that are currently loaded in core.
     * @returns List of trainee identifiers.
     */
    protected loadedTrainees(): Promise<string[]>;
    /**
     * Constructs trainee object from it's core metadata.
     * @param traineeId The trainee identifier.
     * @returns The trainee object.
     */
    protected getTraineeFromCore(traineeId: string): Promise<Trainee>;
    /**
     * Setup client.
     * Prepares the file system and initializes the worker.
     */
    setup(): Promise<void>;
    /**
     * Retrieves the active session.
     * @returns The session object.
     */
    getActiveSession(): Promise<Readonly<Session>>;
    /**
     * Begins a new session.
     * @param name A name for the new session.
     * @param metadata Arbitrary metadata to include in the new session.
     * @returns The session object.
     */
    beginSession(name?: string, metadata?: Record<string, unknown>): Promise<Session>;
    /**
     * Acquire resources for a trainee.
     * @param traineeId The trainee identifier.
     */
    acquireTraineeResources(traineeId: string): Promise<void>;
    /**
     * Releases resources for a trainee.
     * @param traineeId The trainee identifier.
     */
    releaseTraineeResources(traineeId: string): Promise<void>;
    /**
     * Create a new trainee.
     * @param trainee The trainee identifier.
     * @returns The new trainee object.
     */
    createTrainee(trainee: Omit<Trainee, "id">): Promise<Trainee>;
    /**
     * Update a trainee's properties.
     * @param _trainee The trainee identifier.
     */
    updateTrainee(_trainee: Trainee): Promise<Trainee>;
    /**
     * Retrieve a trainee.
     * @param traineeId The trainee identifier.
     * @returns The trainee object.
     */
    getTrainee(traineeId: string): Promise<Trainee>;
    /**
     * Deletes a trainee.
     * @param traineeId The trainee identifier.
     */
    deleteTrainee(traineeId: string): Promise<void>;
    /**
     * List existing trainees.
     * @param _keywords Keywords to filter the list of trainees by.
     */
    listTrainees(_keywords: string | string[]): Promise<TraineeIdentity[]>;
    /**
     * Set the trainee's feature attributes.
     * @param traineeId The trainee identifier.
     * @param attributes The trainee's new feature attributes.
     */
    setFeatureAttributes(traineeId: string, attributes: Record<string, FeatureAttributes>): Promise<void>;
    /**
     * Retrieve the trainee's feature attributes.
     * @param traineeId The trainee identifier.
     * @returns The feature attributes object.
     */
    getFeatureAttributes(traineeId: string): Promise<Record<string, FeatureAttributes>>;
    /**
     * Train data into the trainee.
     * @param traineeId The trainee identifier.
     * @param request The train parameters.
     */
    train(traineeId: string, request: TrainRequest): Promise<void>;
    /**
     * Run an auto analyze on the trainee.
     * @param traineeId The trainee identifier.
     */
    autoAnalyze(traineeId: string): Promise<void>;
    /**
     * Set the parameters use by auto analyze.
     * @param traineeId The trainee identifier.
     * @param request The analysis parameters.
     */
    setAutoAnalyzeParams(traineeId: string, request?: SetAutoAnalyzeParamsRequest): Promise<void>;
    /**
     * Analyze the trainee.
     * @param traineeId The trainee identifier.
     * @param request The analysis parameters.
     */
    analyze(traineeId: string, request?: AnalyzeRequest): Promise<void>;
    /**
     * Retrieve cases from a trainee.
     * @param traineeId The trainee identifier.
     * @param request The get parameters.
     * @returns The cases response.
     */
    getCases(traineeId: string, request?: CasesRequest): Promise<Cases>;
    /**
     * Retrieve the number of trained cases in a trainee.
     * @param traineeId The trainee identifier.
     * @returns The number of trained cases.
     */
    getNumTrainingCases(traineeId: string): Promise<number>;
    /**
     * React to a trainee.
     * @param traineeId The trainee identifier.
     * @param request The react parameters.
     * @returns The react response.
     */
    react(traineeId: string, request: ReactRequest): Promise<ReactResponse>;
    /**
     * React in series to a trainee.
     * @param traineeId The trainee identifier.
     * @param request The react series parameters.
     * @returns The react series response.
     */
    reactSeries(traineeId: string, request: ReactSeriesRequest): Promise<ReactSeriesResponse>;
    /**
     * Compute metrics for different set(s) of cases.
     * @param traineeId The trainee identifier.
     * @param request The react group request.
     * @returns The metric results for each set of cases.
     */
    reactGroup(traineeId: string, request: ReactGroupRequest): Promise<ReactGroupResponse>;
    /**
     * Calculate metrics and store them into the model to the specified features.
     * @param traineeId The trainee identifier.
     * @param request The react into features request.
     * @returns The react into features response.
     */
    reactIntoFeatures(traineeId: string, request: ReactIntoFeaturesRequest): Promise<ReactIntoFeaturesResponse>;
    /**
     * Compute and cache specified feature interpretations.
     * @param traineeId The trainee identifier.
     * @param request The react into trainee request.
     * @returns The react into trainee response.
     */
    reactIntoTrainee(traineeId: string, request: ReactIntoTraineeRequest): Promise<ReactIntoTraineeResponse>;
    /**
     * Get prediction stats of a trainee.
     * @param traineeId The trainee identifier.
     * @param request The prediction stats request.
     * @returns The prediction stats.
     */
    getPredictionStats(traineeId: string, request: FeaturePredictionStatsRequest): Promise<FeaturePredictionStats>;
    /**
     * Get marginal stats of a trainee.
     * @param traineeId The trainee identifier.
     * @param request The marginal stats request.
     * @returns The marginal stats.
     */
    getMarginalStats(traineeId: string, request: FeatureMarginalStatsRequest): Promise<FeatureMarginalStats>;
    /**
     * Get familiarity conviction for features.
     * @param traineeId The trainee identifier.
     * @param request The feature conviction request.
     * @returns A map of metric name to value.
     */
    getFeatureConviction(traineeId: string, request: FeatureConvictionRequest): Promise<FeatureConviction>;
    /**
     * Get contributions for features.
     * @deprecated Use getPredictionStats instead.
     * @param traineeId The trainee identifier.
     * @param request The feature contributions request.
     * @returns A map of feature name to contribution value.
     */
    getFeatureContributions(traineeId: string, request: FeatureContributionsRequest): Promise<Record<string, number>>;
    /**
     * Get residuals for features.
     * @deprecated Use getPredictionStats instead.
     * @param traineeId The trainee identifier.
     * @param request The feature residuals request.
     * @returns A map of feature name to residual value.
     */
    getFeatureResiduals(traineeId: string, request: FeatureResidualsRequest): Promise<Record<string, number>>;
    /**
     * Get mean decrease in accuracy for features.
     * @deprecated Use getPredictionStats instead.
     * @param traineeId The trainee identifier.
     * @param request The feature MDA request.
     * @returns A map of feature name to MDA value.
     */
    getFeatureMda(traineeId: string, request: FeatureMdaRequest): Promise<Record<string, number>>;
    /**
     * Preprocess a request for react or react series.
     * @param trainee The trainee identifier.
     * @param request The react request.
     */
    private preprocessReactRequest;
}
export {};
