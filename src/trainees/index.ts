import { Trainee as BaseTrainee, FeatureAttributes } from "@howso/openapi-client/models";

export interface Trainee extends BaseTrainee {
  id: string;
  features: Record<string, FeatureAttributes>;
}
