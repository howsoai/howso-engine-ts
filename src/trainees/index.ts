import { Trainee as BaseTrainee, FeatureAttributes } from "@howso/openapi-client/models";

export type Trainee = BaseTrainee & {
  id: string;
  features: Record<string, FeatureAttributes>;
};
