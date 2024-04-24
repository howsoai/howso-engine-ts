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
} from "@howso/openapi-client/models";
import { Trainee } from "../../trainees/index";

export interface ITraineeClient {
  getTrainee(): Promise<Trainee>;
  train(request: TrainRequest): Promise<void>;
  analyze(request: AnalyzeRequest): Promise<void>;
  autoAnalyze(): Promise<void>;
  setAutoAnalyzeParams(request: SetAutoAnalyzeParamsRequest): Promise<void>;
  react(request: ReactRequest): Promise<ReactResponse>;
  reactSeries(request: ReactSeriesRequest): Promise<ReactSeriesResponse>;
  reactIntoTrainee(request: ReactIntoTraineeRequest): Promise<ReactIntoTraineeResponse>;
  reactIntoFeatures(request: ReactIntoFeaturesRequest): Promise<ReactIntoFeaturesResponse>;
  getCases(request?: CasesRequest): Promise<Cases>;
  getNumTrainingCases(): Promise<number>;
  setFeatureAttributes(attributes: Record<string, FeatureAttributes>): Promise<void>;
  getFeatureAttributes(): Promise<Record<string, FeatureAttributes>>;
  getFeatureConviction(request: FeatureConvictionRequest): Promise<FeatureConviction>;
  getFeatureResiduals(request: FeatureResidualsRequest): Promise<Record<string, number>>;
  getFeatureContributions(request: FeatureContributionsRequest): Promise<Record<string, number>>;
  getFeatureMda(request: FeatureMdaRequest): Promise<Record<string, number>>;
  getPredictionStats(request: FeaturePredictionStatsRequest): Promise<FeaturePredictionStats>;
  getMarginalStats(request: FeatureMarginalStatsRequest): Promise<FeatureMarginalStats>;
}
