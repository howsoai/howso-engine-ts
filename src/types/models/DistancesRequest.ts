/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * The body of the distances metric request.
 * @export
 * @interface DistancesRequest
 */
export interface DistancesRequest {
  /**
   * List of feature names to use when computing distances. If unspecified uses all features.
   * @type {Array<string>}
   * @memberof DistancesRequest
   */
  features?: Array<string>;
  /**
   * The action feature. If specified, uses targeted hyperparameters used to predict this `action_feature`,
   * otherwise uses targetless hyperparameters.
   * @type {string}
   * @memberof DistancesRequest
   */
  action_feature?: string;
  /**
   * List of tuples, of session id and index, where index is the original 0-based index of the case as it was
   * trained into the session. If specified, returns distances for all of these cases. Ignored if `feature_values`
   * is provided. If neither `feature_values` nor `case_indices` is specified, uses full dataset.
   * @type {Array<Array<any>>}
   * @memberof DistancesRequest
   */
  case_indices?: Array<Array<any>>;
  /**
   * List of values, if specified, returns distances of the local model relative to these values, ignores
   * `case_indices` parameter.
   * @type {Array<any>}
   * @memberof DistancesRequest
   */
  feature_values?: Array<any>;
  /**
   * If set to True, will scale influence weights by each case's `weight_feature` weight. If unspecified, case weights will be used if the Trainee has them.
   * @type {boolean}
   * @memberof DistancesRequest
   */
  use_case_weights?: boolean;
  /**
   * The name of the feature whose values to use as case weights. When left unspecified, uses the internally
   * managed case weight.
   * @type {string}
   * @memberof DistancesRequest
   */
  weight_feature?: string;
  /**
   * The row starting offset. Used for paging of results.
   * @type {number}
   * @memberof DistancesRequest
   */
  row_offset: number;
  /**
   * The number of rows to include in the page.
   * @type {number}
   * @memberof DistancesRequest
   */
  row_count: number;
  /**
   * The column starting offset. Used for paging of results.
   * @type {number}
   * @memberof DistancesRequest
   */
  column_offset: number;
  /**
   * The number of columns to include in the page.
   * @type {number}
   * @memberof DistancesRequest
   */
  column_count: number;
}

/**
 * Check if a given object implements the DistancesRequest interface.
 */
export function instanceOfDistancesRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "row_offset" in value;
  isInstance = isInstance && "row_count" in value;
  isInstance = isInstance && "column_offset" in value;
  isInstance = isInstance && "column_count" in value;

  return isInstance;
}

export function DistancesRequestFromJSON(json: any): DistancesRequest {
  return DistancesRequestFromJSONTyped(json, false);
}

export function DistancesRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): DistancesRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    features: !exists(json, "features") ? undefined : json["features"],
    action_feature: !exists(json, "action_feature") ? undefined : json["action_feature"],
    case_indices: !exists(json, "case_indices") ? undefined : json["case_indices"],
    feature_values: !exists(json, "feature_values") ? undefined : json["feature_values"],
    use_case_weights: !exists(json, "use_case_weights") ? undefined : json["use_case_weights"],
    weight_feature: !exists(json, "weight_feature") ? undefined : json["weight_feature"],
    row_offset: json["row_offset"],
    row_count: json["row_count"],
    column_offset: json["column_offset"],
    column_count: json["column_count"],
  };
}

export function DistancesRequestToJSON(value?: DistancesRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    features: value.features,
    action_feature: value.action_feature,
    case_indices: value.case_indices,
    feature_values: value.feature_values,
    use_case_weights: value.use_case_weights,
    weight_feature: value.weight_feature,
    row_offset: value.row_offset,
    row_count: value.row_count,
    column_offset: value.column_offset,
    column_count: value.column_count,
  };
}
