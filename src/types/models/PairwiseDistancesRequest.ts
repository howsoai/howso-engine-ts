/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * The body of the pairwise distances metric request.
 * @export
 * @interface PairwiseDistancesRequest
 */
export interface PairwiseDistancesRequest {
  /**
   * List of tuples, of session id and index, where index is the original 0-based index of the case as it was
   * trained into the session. If specified must be either length of 1 or match length of `to_values` or `to_case_indices`.
   * @type {Array<Array<any>>}
   * @memberof PairwiseDistancesRequest
   */
  from_case_indices?: Array<Array<any>>;
  /**
   * A 2d-list of case values. If specified must be either length of 1 or match length of `to_values` or `to_case_indices`.
   * @type {Array<Array<any>>}
   * @memberof PairwiseDistancesRequest
   */
  from_values?: Array<Array<any>>;
  /**
   * List of tuples, of session id and index, where index is the original 0-based index of the case as it was
   * trained into the session. If specified must be either length of 1 or match length of `from_values` or `from_case_indices`.
   * @type {Array<Array<any>>}
   * @memberof PairwiseDistancesRequest
   */
  to_case_indices?: Array<Array<any>>;
  /**
   * A 2d-list of case values. If specified must be either length of 1 or match length of `from_values` or `from_case_indices`.
   * @type {Array<Array<any>>}
   * @memberof PairwiseDistancesRequest
   */
  to_values?: Array<Array<any>>;
  /**
   * List of feature names to use when computing pairwise distances. If unspecified uses all features.
   * @type {Array<string>}
   * @memberof PairwiseDistancesRequest
   */
  features?: Array<string>;
  /**
   * The action feature. If specified, uses targeted hyperparameters used to predict this `action_feature`,
   * otherwise uses targetless hyperparameters.
   * @type {string}
   * @memberof PairwiseDistancesRequest
   */
  action_feature?: string;
  /**
   * If set to True, will scale influence weights by each case's `weight_feature` weight. If unspecified, case weights will be used if the Trainee has them.
   * @type {boolean}
   * @memberof PairwiseDistancesRequest
   */
  use_case_weights?: boolean;
  /**
   * The name of the feature whose values to use as case weights. When left unspecified, uses the internally
   * managed case weight.
   * @type {string}
   * @memberof PairwiseDistancesRequest
   */
  weight_feature?: string;
}

/**
 * Check if a given object implements the PairwiseDistancesRequest interface.
 */
export function instanceOfPairwiseDistancesRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function PairwiseDistancesRequestFromJSON(json: any): PairwiseDistancesRequest {
  return PairwiseDistancesRequestFromJSONTyped(json, false);
}

export function PairwiseDistancesRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): PairwiseDistancesRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    from_case_indices: !exists(json, "from_case_indices") ? undefined : json["from_case_indices"],
    from_values: !exists(json, "from_values") ? undefined : json["from_values"],
    to_case_indices: !exists(json, "to_case_indices") ? undefined : json["to_case_indices"],
    to_values: !exists(json, "to_values") ? undefined : json["to_values"],
    features: !exists(json, "features") ? undefined : json["features"],
    action_feature: !exists(json, "action_feature") ? undefined : json["action_feature"],
    use_case_weights: !exists(json, "use_case_weights") ? undefined : json["use_case_weights"],
    weight_feature: !exists(json, "weight_feature") ? undefined : json["weight_feature"],
  };
}

export function PairwiseDistancesRequestToJSON(value?: PairwiseDistancesRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    from_case_indices: value.from_case_indices,
    from_values: value.from_values,
    to_case_indices: value.to_case_indices,
    to_values: value.to_values,
    features: value.features,
    action_feature: value.action_feature,
    use_case_weights: value.use_case_weights,
    weight_feature: value.weight_feature,
  };
}
