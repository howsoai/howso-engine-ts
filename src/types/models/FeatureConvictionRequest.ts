/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * The body of a feature conviction request.
 * @export
 * @interface FeatureConvictionRequest
 */
export interface FeatureConvictionRequest {
  /**
   * A list of feature names to calculate convictions. At least 2 features are required to get familiarity conviction and at least 3 features to get prediction conviction and prediction contribution. If not specified all features will be used.
   * @type {Array<string>}
   * @memberof FeatureConvictionRequest
   */
  features?: Array<string>;
  /**
   * A list of feature names to be treated as action features during conviction calculation in order to determine the conviction of each feature against the set of action_features. If not specified, conviction is computed for each feature against the rest of the features as a whole.
   * @type {Array<string>}
   * @memberof FeatureConvictionRequest
   */
  action_features?: Array<string>;
  /**
   * When true, calculate and output the familiarity conviction of adding the features.
   * @type {boolean}
   * @memberof FeatureConvictionRequest
   */
  familiarity_conviction_addition?: boolean;
  /**
   * When true, calculate and output the familiarity conviction of removing the features.
   * @type {boolean}
   * @memberof FeatureConvictionRequest
   */
  familiarity_conviction_removal?: boolean;
  /**
   * If set to True will scale influence weights by each case's `weight_feature` weight. If unspecified, case weights will be used if the Trainee has them.
   * @type {boolean}
   * @memberof FeatureConvictionRequest
   */
  use_case_weights?: boolean;
  /**
   * The name of the feature whose values to use as case weights. When left unspecified, uses the internally managed case weight.
   * @type {string}
   * @memberof FeatureConvictionRequest
   */
  weight_feature?: string;
}

/**
 * Check if a given object implements the FeatureConvictionRequest interface.
 */
export function instanceOfFeatureConvictionRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function FeatureConvictionRequestFromJSON(json: any): FeatureConvictionRequest {
  return FeatureConvictionRequestFromJSONTyped(json, false);
}

export function FeatureConvictionRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): FeatureConvictionRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    features: !exists(json, "features") ? undefined : json["features"],
    action_features: !exists(json, "action_features") ? undefined : json["action_features"],
    familiarity_conviction_addition: !exists(json, "familiarity_conviction_addition")
      ? undefined
      : json["familiarity_conviction_addition"],
    familiarity_conviction_removal: !exists(json, "familiarity_conviction_removal")
      ? undefined
      : json["familiarity_conviction_removal"],
    use_case_weights: !exists(json, "use_case_weights") ? undefined : json["use_case_weights"],
    weight_feature: !exists(json, "weight_feature") ? undefined : json["weight_feature"],
  };
}

export function FeatureConvictionRequestToJSON(value?: FeatureConvictionRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    features: value.features,
    action_features: value.action_features,
    familiarity_conviction_addition: value.familiarity_conviction_addition,
    familiarity_conviction_removal: value.familiarity_conviction_removal,
    use_case_weights: value.use_case_weights,
    weight_feature: value.weight_feature,
  };
}
