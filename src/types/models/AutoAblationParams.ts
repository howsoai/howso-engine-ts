/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface AutoAblationParams
 */
export interface AutoAblationParams {
  /**
   * When true, auto ablation is enabled.
   * @type {boolean}
   * @memberof AutoAblationParams
   */
  auto_ablation_enabled?: boolean;
  /**
   * The name of the weight feature used when ablating.
   * @type {string}
   * @memberof AutoAblationParams
   */
  auto_ablation_weight_feature?: string;
  /**
   * The minimum number of cases at which the model should.
   * @type {number}
   * @memberof AutoAblationParams
   */
  minimum_model_size?: number;
  /**
   * The influence weight entropy quantile that a case must be beneath in order to be trained.
   * @type {number}
   * @memberof AutoAblationParams
   */
  influence_weight_entropy_threshold?: number;
  /**
   * A list of feature names for which cases will be ablated if the feature prediction equals the case value.
   * @type {Array<string>}
   * @memberof AutoAblationParams
   */
  exact_prediction_features?: Array<string>;
  /**
   * A map of feature names to tuples of [MIN, MAX] for which cases will be ablated if the feature prediction is within (case value - MIN, case_value + MAX).
   * @type {{ [key: string]: Array<number>; }}
   * @memberof AutoAblationParams
   */
  tolerance_prediction_threshold_map?: { [key: string]: Array<number> };
  /**
   * A map of feature names to relative percentages for which cases will be ablated if the feature prediction is within the relative error of the case value.
   * @type {{ [key: string]: number; }}
   * @memberof AutoAblationParams
   */
  relative_prediction_threshold_map?: { [key: string]: number };
  /**
   * A list of feature names for which cases will be ablated if the feature prediction is within the residual of the case value.
   * @type {Array<string>}
   * @memberof AutoAblationParams
   */
  residual_prediction_features?: Array<string>;
  /**
   * The conviction value below which cases will be ablated.
   * @type {number}
   * @memberof AutoAblationParams
   */
  conviction_upper_threshold?: number;
  /**
   * The conviction value above which cases will be ablated.
   * @type {number}
   * @memberof AutoAblationParams
   */
  conviction_lower_threshold?: number;
}

/**
 * Check if a given object implements the AutoAblationParams interface.
 */
export function instanceOfAutoAblationParams(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function AutoAblationParamsFromJSON(json: any): AutoAblationParams {
  return AutoAblationParamsFromJSONTyped(json, false);
}

export function AutoAblationParamsFromJSONTyped(json: any, ignoreDiscriminator: boolean): AutoAblationParams {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    auto_ablation_enabled: !exists(json, "auto_ablation_enabled") ? undefined : json["auto_ablation_enabled"],
    auto_ablation_weight_feature: !exists(json, "auto_ablation_weight_feature")
      ? undefined
      : json["auto_ablation_weight_feature"],
    minimum_model_size: !exists(json, "minimum_model_size") ? undefined : json["minimum_model_size"],
    influence_weight_entropy_threshold: !exists(json, "influence_weight_entropy_threshold")
      ? undefined
      : json["influence_weight_entropy_threshold"],
    exact_prediction_features: !exists(json, "exact_prediction_features")
      ? undefined
      : json["exact_prediction_features"],
    tolerance_prediction_threshold_map: !exists(json, "tolerance_prediction_threshold_map")
      ? undefined
      : json["tolerance_prediction_threshold_map"],
    relative_prediction_threshold_map: !exists(json, "relative_prediction_threshold_map")
      ? undefined
      : json["relative_prediction_threshold_map"],
    residual_prediction_features: !exists(json, "residual_prediction_features")
      ? undefined
      : json["residual_prediction_features"],
    conviction_upper_threshold: !exists(json, "conviction_upper_threshold")
      ? undefined
      : json["conviction_upper_threshold"],
    conviction_lower_threshold: !exists(json, "conviction_lower_threshold")
      ? undefined
      : json["conviction_lower_threshold"],
  };
}

export function AutoAblationParamsToJSON(value?: AutoAblationParams | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    auto_ablation_enabled: value.auto_ablation_enabled,
    auto_ablation_weight_feature: value.auto_ablation_weight_feature,
    minimum_model_size: value.minimum_model_size,
    influence_weight_entropy_threshold: value.influence_weight_entropy_threshold,
    exact_prediction_features: value.exact_prediction_features,
    tolerance_prediction_threshold_map: value.tolerance_prediction_threshold_map,
    relative_prediction_threshold_map: value.relative_prediction_threshold_map,
    residual_prediction_features: value.residual_prediction_features,
    conviction_upper_threshold: value.conviction_upper_threshold,
    conviction_lower_threshold: value.conviction_lower_threshold,
  };
}
