import type {
  AnalyzeRequest,
  Cases,
  CasesRequest,
  FeatureAttributes,
  FeatureConviction,
  FeatureConvictionRequest,
  FeatureContributionsRequest,
  FeaturePredictionStats,
  FeaturePredictionStatsRequest,
  FeatureMarginalStats,
  FeatureMarginalStatsRequest,
  FeatureResidualsRequest,
  FeatureMdaRequest,
  TrainRequest,
  ReactRequest,
  ReactResponse,
  ReactIntoFeaturesRequest,
  ReactIntoFeaturesResponse,
  ReactSeriesRequest,
  ReactSeriesResponse,
  ReactIntoTraineeRequest,
  ReactIntoTraineeResponse,
  SetAutoAnalyzeParamsRequest,
  TraineeIdentity,
} from "@howso/openapi-client/models";
import { Trainee } from "../../trainees/index.js";

export interface ITraineeClient {
  /** @deprecated */
  acquireTraineeResources(traineeId: string): Promise<void>;
  /** @deprecated */
  releaseTraineeResources(traineeId: string): Promise<void>;
  /** @deprecated */
  getTrainee(traineeId: string): Promise<Trainee>;
  /** @deprecated */
  deleteTrainee(traineeId: string): Promise<void>;
  train(traineeId: string, request: TrainRequest): Promise<void>;
  analyze(traineeId: string, request: AnalyzeRequest): Promise<void>;
  autoAnalyze(traineeId: string): Promise<void>;
  setAutoAnalyzeParams(traineeId: string, request: SetAutoAnalyzeParamsRequest): Promise<void>;
  react(traineeId: string, request: ReactRequest): Promise<ReactResponse>;
  reactSeries(traineeId: string, request: ReactSeriesRequest): Promise<ReactSeriesResponse>;
  reactIntoTrainee(traineeId: string, request: ReactIntoTraineeRequest): Promise<ReactIntoTraineeResponse>;
  reactIntoFeatures(traineeId: string, request: ReactIntoFeaturesRequest): Promise<ReactIntoFeaturesResponse>;
  getCases(traineeId: string, request?: CasesRequest): Promise<Cases>;
  getNumTrainingCases(traineeId: string): Promise<number>;
  setFeatureAttributes(traineeId: string, attributes: Record<string, FeatureAttributes>): Promise<void>;
  getFeatureAttributes(traineeId: string): Promise<Record<string, FeatureAttributes>>;
  getFeatureConviction(traineeId: string, request: FeatureConvictionRequest): Promise<FeatureConviction>;
  getFeatureResiduals(traineeId: string, request: FeatureResidualsRequest): Promise<Record<string, number>>;
  getFeatureContributions(traineeId: string, request: FeatureContributionsRequest): Promise<Record<string, number>>;
  getFeatureMda(traineeId: string, request: FeatureMdaRequest): Promise<Record<string, number>>;
  getPredictionStats(traineeId: string, request: FeaturePredictionStatsRequest): Promise<FeaturePredictionStats>;
  getMarginalStats(traineeId: string, request: FeatureMarginalStatsRequest): Promise<FeatureMarginalStats>;
}
