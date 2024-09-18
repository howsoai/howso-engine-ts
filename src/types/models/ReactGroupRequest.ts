/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * Request body for react group.
 * @export
 * @interface ReactGroupRequest
 */
export interface ReactGroupRequest {
  /**
   * One or more groupings of cases to compare against.
   * @type {Array<Array<Array<any>>>}
   * @memberof ReactGroupRequest
   */
  new_cases: Array<Array<Array<any>>>;
  /**
   * The features to use when calculating convictions.
   * @type {Array<string>}
   * @memberof ReactGroupRequest
   */
  features?: Array<string>;
  /**
   * Calculate and output the familiarity conviction of adding the cases.
   * @type {boolean}
   * @memberof ReactGroupRequest
   */
  familiarity_conviction_addition?: boolean;
  /**
   * Calculate and output the familiarity conviction of removing the cases.
   * @type {boolean}
   * @memberof ReactGroupRequest
   */
  familiarity_conviction_removal?: boolean;
  /**
   * Calculate and output the KL divergence of adding the cases.
   * @type {boolean}
   * @memberof ReactGroupRequest
   */
  kl_divergence_addition?: boolean;
  /**
   * Calculate and output the KL divergence of removing the cases.
   * @type {boolean}
   * @memberof ReactGroupRequest
   */
  kl_divergence_removal?: boolean;
  /**
   * When true, output p value of addition.
   * @type {boolean}
   * @memberof ReactGroupRequest
   */
  p_value_of_addition?: boolean;
  /**
   * When true, output p value of removal.
   * @type {boolean}
   * @memberof ReactGroupRequest
   */
  p_value_of_removal?: boolean;
  /**
   * When true, calculate and output distance contribution ratios for each case.
   * @type {boolean}
   * @memberof ReactGroupRequest
   */
  distance_contributions?: boolean;
  /**
   * If set to True will scale influence weights by each case's `weight_feature` weight. If unspecified, case weights will be used if the Trainee has them.
   * @type {boolean}
   * @memberof ReactGroupRequest
   */
  use_case_weights?: boolean;
  /**
   * The name of the feature whose values to use as case weights. When left unspecified, uses the internally managed case weight.
   * @type {string}
   * @memberof ReactGroupRequest
   */
  weight_feature?: string;
}

/**
 * Check if a given object implements the ReactGroupRequest interface.
 */
export function instanceOfReactGroupRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "new_cases" in value;

  return isInstance;
}

export function ReactGroupRequestFromJSON(json: any): ReactGroupRequest {
  return ReactGroupRequestFromJSONTyped(json, false);
}

export function ReactGroupRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReactGroupRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    new_cases: json["new_cases"],
    features: !exists(json, "features") ? undefined : json["features"],
    familiarity_conviction_addition: !exists(json, "familiarity_conviction_addition")
      ? undefined
      : json["familiarity_conviction_addition"],
    familiarity_conviction_removal: !exists(json, "familiarity_conviction_removal")
      ? undefined
      : json["familiarity_conviction_removal"],
    kl_divergence_addition: !exists(json, "kl_divergence_addition") ? undefined : json["kl_divergence_addition"],
    kl_divergence_removal: !exists(json, "kl_divergence_removal") ? undefined : json["kl_divergence_removal"],
    p_value_of_addition: !exists(json, "p_value_of_addition") ? undefined : json["p_value_of_addition"],
    p_value_of_removal: !exists(json, "p_value_of_removal") ? undefined : json["p_value_of_removal"],
    distance_contributions: !exists(json, "distance_contributions") ? undefined : json["distance_contributions"],
    use_case_weights: !exists(json, "use_case_weights") ? undefined : json["use_case_weights"],
    weight_feature: !exists(json, "weight_feature") ? undefined : json["weight_feature"],
  };
}

export function ReactGroupRequestToJSON(value?: ReactGroupRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    new_cases: value.new_cases,
    features: value.features,
    familiarity_conviction_addition: value.familiarity_conviction_addition,
    familiarity_conviction_removal: value.familiarity_conviction_removal,
    kl_divergence_addition: value.kl_divergence_addition,
    kl_divergence_removal: value.kl_divergence_removal,
    p_value_of_addition: value.p_value_of_addition,
    p_value_of_removal: value.p_value_of_removal,
    distance_contributions: value.distance_contributions,
    use_case_weights: value.use_case_weights,
    weight_feature: value.weight_feature,
  };
}
