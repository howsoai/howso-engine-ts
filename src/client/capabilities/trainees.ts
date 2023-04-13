import type {
  Cases,
  CasesRequest,
  FeatureAttributes,
  FeatureConviction,
  FeatureConvictionRequest,
  FeatureContributionsRequest,
  FeatureResidualsRequest,
  FeatureMdaRequest,
  TrainRequest,
  OptimizeRequest,
  ReactRequest,
  ReactResponse,
  ReactIntoFeaturesRequest,
  ReactIntoFeaturesResponse,
  ReactGroupRequest,
  ReactGroupResponse,
  ReactSeriesRequest,
  ReactSeriesResponse,
  ReactIntoTraineeRequest,
  ReactIntoTraineeResponse,
  SetAutoOptimizeRequest,
  TraineeIdentity,
} from "diveplane-openapi-client/models";
import { Trainee } from "../../trainees/index.js";

export interface ITraineeClient {
  acquireTraineeResources(traineeId: string): Promise<void>;
  releaseTraineeResources(traineeId: string): Promise<void>;
  createTrainee(trainee: Omit<Trainee, "id">): Promise<Trainee>;
  updateTrainee(trainee: Trainee): Promise<Trainee>;
  getTrainee(traineeId: string): Promise<Trainee>;
  deleteTrainee(traineeId: string): Promise<void>;
  listTrainees(keywords: string | string[]): Promise<TraineeIdentity[]>;
  train(traineeId: string, request: TrainRequest): Promise<void>;
  optimize(traineeId: string, request: OptimizeRequest): Promise<void>;
  autoOptimize(traineeId: string): Promise<void>;
  setAutoOptimize(traineeId: string, request: SetAutoOptimizeRequest): Promise<void>;
  react(traineeId: string, request: ReactRequest): Promise<ReactResponse>;
  reactSeries(traineeId: string, request: ReactSeriesRequest): Promise<ReactSeriesResponse>;
  reactGroup(traineeId: string, request: ReactGroupRequest): Promise<ReactGroupResponse>;
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
}
