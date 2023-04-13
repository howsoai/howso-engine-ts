import { Trainee as BaseTrainee, FeatureAttributes } from "diveplane-openapi-client/models";
export interface Trainee extends BaseTrainee {
    id: string;
    features: Record<string, FeatureAttributes>;
}
