import type {
  AnalyzeRequest,
  Cases,
  CasesRequest,
  FeatureAttributes,
  FeatureConviction,
  FeatureConvictionRequest,
  FeatureMarginalStats,
  FeatureMarginalStatsRequest,
  TrainRequest,
  ReactRequest,
  ReactResponse,
  ReactIntoFeaturesRequest,
  ReactIntoFeaturesResponse,
  ReactSeriesRequest,
  ReactSeriesResponse,
  SetAutoAnalyzeParamsRequest,
  TraineeIdentity,
  TraineeWorkflowAttributesRequest,
  TraineeWorkflowAttributes,
} from "@howso/openapi-client/models";
import { Trainee } from "../../trainees/index";

export interface ITraineeClient {
  acquireTraineeResources(traineeId: string): Promise<void>;
  releaseTraineeResources(traineeId: string): Promise<void>;
  createTrainee(trainee: Omit<Trainee, "id">): Promise<Trainee>;
  updateTrainee(trainee: Trainee): Promise<Trainee>;
  getTrainee(traineeId: string): Promise<Trainee>;
  deleteTrainee(traineeId: string): Promise<void>;
  listTrainees(keywords: string | string[]): Promise<TraineeIdentity[]>;
  train(traineeId: string, request: TrainRequest): Promise<void>;
  analyze(traineeId: string, request: AnalyzeRequest): Promise<void>;
  autoAnalyze(traineeId: string): Promise<void>;
  setAutoAnalyzeParams(traineeId: string, request: SetAutoAnalyzeParamsRequest): Promise<void>;
  react(traineeId: string, request: ReactRequest): Promise<ReactResponse>;
  reactSeries(traineeId: string, request: ReactSeriesRequest): Promise<ReactSeriesResponse>;
  reactIntoFeatures(traineeId: string, request: ReactIntoFeaturesRequest): Promise<ReactIntoFeaturesResponse>;
  getCases(traineeId: string, request?: CasesRequest): Promise<Cases>;
  getInternalParams(traineeId: string, request: TraineeWorkflowAttributesRequest): Promise<TraineeWorkflowAttributes>;
  getNumTrainingCases(traineeId: string): Promise<number>;
  setFeatureAttributes(traineeId: string, attributes: Record<string, FeatureAttributes>): Promise<void>;
  getFeatureAttributes(traineeId: string): Promise<Record<string, FeatureAttributes>>;
  getFeatureConviction(traineeId: string, request: FeatureConvictionRequest): Promise<FeatureConviction>;
  getMarginalStats(traineeId: string, request: FeatureMarginalStatsRequest): Promise<FeatureMarginalStats>;
}
