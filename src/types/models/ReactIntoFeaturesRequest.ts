/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * Request body for react into features.
 * @export
 * @interface ReactIntoFeaturesRequest
 */
export interface ReactIntoFeaturesRequest {
  /**
   * The features to use when calculating convictions.
   * @type {Array<string>}
   * @memberof ReactIntoFeaturesRequest
   */
  features?: Array<string>;
  /**
   * The name of the feature to store conviction of addition values.
   * @type {string}
   * @memberof ReactIntoFeaturesRequest
   */
  familiarity_conviction_addition?: string;
  /**
   * The name of the feature to store conviction of removal values.
   * @type {string}
   * @memberof ReactIntoFeaturesRequest
   */
  familiarity_conviction_removal?: string;
  /**
   * The name of the feature to store influence weight entropy values.
   * @type {string}
   * @memberof ReactIntoFeaturesRequest
   */
  influence_weight_entropy?: string;
  /**
   * The name of the feature to store p value of addition values.
   * @type {string}
   * @memberof ReactIntoFeaturesRequest
   */
  p_value_of_addition?: string;
  /**
   * The name of the feature to store p value of removal values.
   * @type {string}
   * @memberof ReactIntoFeaturesRequest
   */
  p_value_of_removal?: string;
  /**
   * The name of the feature to store distance contribution ratios for each case.
   * @type {string}
   * @memberof ReactIntoFeaturesRequest
   */
  distance_contribution?: string;
  /**
   * The name of the feature to store similarity conviction values for each case.
   * @type {string}
   * @memberof ReactIntoFeaturesRequest
   */
  similarity_conviction?: string;
  /**
   * If set to True will scale influence weights by each case's `weight_feature` weight. If unspecified, case weights will be used if the Trainee has them.
   * @type {boolean}
   * @memberof ReactIntoFeaturesRequest
   */
  use_case_weights?: boolean;
  /**
   * The name of the feature whose values to use as case weights. When left unspecified, uses the internally managed case weight.
   * @type {string}
   * @memberof ReactIntoFeaturesRequest
   */
  weight_feature?: string;
}

/**
 * Check if a given object implements the ReactIntoFeaturesRequest interface.
 */
export function instanceOfReactIntoFeaturesRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ReactIntoFeaturesRequestFromJSON(json: any): ReactIntoFeaturesRequest {
  return ReactIntoFeaturesRequestFromJSONTyped(json, false);
}

export function ReactIntoFeaturesRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ReactIntoFeaturesRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    features: !exists(json, "features") ? undefined : json["features"],
    familiarity_conviction_addition: !exists(json, "familiarity_conviction_addition")
      ? undefined
      : json["familiarity_conviction_addition"],
    familiarity_conviction_removal: !exists(json, "familiarity_conviction_removal")
      ? undefined
      : json["familiarity_conviction_removal"],
    influence_weight_entropy: !exists(json, "influence_weight_entropy") ? undefined : json["influence_weight_entropy"],
    p_value_of_addition: !exists(json, "p_value_of_addition") ? undefined : json["p_value_of_addition"],
    p_value_of_removal: !exists(json, "p_value_of_removal") ? undefined : json["p_value_of_removal"],
    distance_contribution: !exists(json, "distance_contribution") ? undefined : json["distance_contribution"],
    similarity_conviction: !exists(json, "similarity_conviction") ? undefined : json["similarity_conviction"],
    use_case_weights: !exists(json, "use_case_weights") ? undefined : json["use_case_weights"],
    weight_feature: !exists(json, "weight_feature") ? undefined : json["weight_feature"],
  };
}

export function ReactIntoFeaturesRequestToJSON(value?: ReactIntoFeaturesRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    features: value.features,
    familiarity_conviction_addition: value.familiarity_conviction_addition,
    familiarity_conviction_removal: value.familiarity_conviction_removal,
    influence_weight_entropy: value.influence_weight_entropy,
    p_value_of_addition: value.p_value_of_addition,
    p_value_of_removal: value.p_value_of_removal,
    distance_contribution: value.distance_contribution,
    similarity_conviction: value.similarity_conviction,
    use_case_weights: value.use_case_weights,
    weight_feature: value.weight_feature,
  };
}
