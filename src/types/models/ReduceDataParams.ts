/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface ReduceDataParams
 */
export interface ReduceDataParams {
  /**
   * A list of context features to use when determining which cases to remove.
   * @type {Array<string>}
   * @memberof ReduceDataParams
   */
  features?: Array<string>;
  /**
   * The name of the weight feature used when performing data reduction.
   * @type {string}
   * @memberof ReduceDataParams
   */
  distribute_weight_feature?: string;
  /**
   * The quantile to use when deciding which cases to remove. Cases above this quantile will be removed.
   * @type {number}
   * @memberof ReduceDataParams
   */
  influence_weight_entropy_threshold?: number;
  /**
   * Whether to skip auto-analyzing as cases are removed.
   * @type {boolean}
   * @memberof ReduceDataParams
   */
  skip_auto_analyze?: boolean;
}

/**
 * Check if a given object implements the ReduceDataParams interface.
 */
export function instanceOfReduceDataParams(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ReduceDataParamsFromJSON(json: any): ReduceDataParams {
  return ReduceDataParamsFromJSONTyped(json, false);
}

export function ReduceDataParamsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReduceDataParams {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    features: !exists(json, "features") ? undefined : json["features"],
    distribute_weight_feature: !exists(json, "distribute_weight_feature")
      ? undefined
      : json["distribute_weight_feature"],
    influence_weight_entropy_threshold: !exists(json, "influence_weight_entropy_threshold")
      ? undefined
      : json["influence_weight_entropy_threshold"],
    skip_auto_analyze: !exists(json, "skip_auto_analyze") ? undefined : json["skip_auto_analyze"],
  };
}

export function ReduceDataParamsToJSON(value?: ReduceDataParams | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    features: value.features,
    distribute_weight_feature: value.distribute_weight_feature,
    influence_weight_entropy_threshold: value.influence_weight_entropy_threshold,
    skip_auto_analyze: value.skip_auto_analyze,
  };
}
