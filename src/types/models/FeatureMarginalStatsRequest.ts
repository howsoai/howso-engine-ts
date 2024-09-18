/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * The body of a feature marginal stats request.
 * @export
 * @interface FeatureMarginalStatsRequest
 */
export interface FeatureMarginalStatsRequest {
  /**
   * When specified, will attempt to return stats that were computed using this weight_feature.
   * @type {string}
   * @memberof FeatureMarginalStatsRequest
   */
  weight_feature?: string;
  /**
   * The condition map to select the cases that meet all the provided conditions. The dictionary keys
   * are the feature name and values are one of:
   *   - None
   *   - A value, must match exactly.
   *   - An array of two numeric values, specifying an inclusive range. Only applicable to continuous and numeric ordinal features.
   *   - An array of string values, must match any of these values exactly. Only applicable to nominal and string ordinal features.
   * @type {{ [key: string]: any; }}
   * @memberof FeatureMarginalStatsRequest
   */
  condition?: { [key: string]: any };
  /**
   * The maximum number of cases to use. If not specified, the limit will be k cases if precision is "similar", or
   * no limit if precision is "exact".
   * @type {number}
   * @memberof FeatureMarginalStatsRequest
   */
  num_cases?: number;
  /**
   * Exact matching or fuzzy matching.
   * @type {string}
   * @memberof FeatureMarginalStatsRequest
   */
  precision?: FeatureMarginalStatsRequestPrecisionEnum;
}

/**
 * @export
 * @enum {string}
 */
export type FeatureMarginalStatsRequestPrecisionEnum = "exact" | "similar";

/**
 * Check if a given object implements the FeatureMarginalStatsRequest interface.
 */
export function instanceOfFeatureMarginalStatsRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function FeatureMarginalStatsRequestFromJSON(json: any): FeatureMarginalStatsRequest {
  return FeatureMarginalStatsRequestFromJSONTyped(json, false);
}

export function FeatureMarginalStatsRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): FeatureMarginalStatsRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    weight_feature: !exists(json, "weight_feature") ? undefined : json["weight_feature"],
    condition: !exists(json, "condition") ? undefined : json["condition"],
    num_cases: !exists(json, "num_cases") ? undefined : json["num_cases"],
    precision: !exists(json, "precision") ? undefined : json["precision"],
  };
}

export function FeatureMarginalStatsRequestToJSON(value?: FeatureMarginalStatsRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    weight_feature: value.weight_feature,
    condition: value.condition,
    num_cases: value.num_cases,
    precision: value.precision,
  };
}
