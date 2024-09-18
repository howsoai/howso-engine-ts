/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * Parameters specific for /analyze may be also be passed in and will be cached and used during future auto-analysiss.
 * @export
 * @interface SetAutoAnalyzeParamsRequest
 */
export interface SetAutoAnalyzeParamsRequest {
  /**
   * A list of action feature names.
   * @type {Array<string>}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  action_features?: Array<string>;
  /**
   * A list of context feature names.
   * @type {Array<string>}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  context_features?: Array<string>;
  /**
   * Number of cross validation folds to do. Value of 1 does hold-one-out instead of k-fold.
   * @type {number}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  k_folds?: number;
  /**
   * Number of samples used in calculating feature residuals.
   * @type {number}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  num_samples?: number;
  /**
   * Optional list of distance transform value hyperparameters to analyze with.
   * @type {Array<number>}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  dt_values?: Array<number>;
  /**
   * Optional list of k value hyperparameters to analyze with.
   * @type {Array<number>}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  k_values?: Array<number>;
  /**
   * Optional list of p value hyperparameters to analyze with.
   * @type {Array<number>}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  p_values?: Array<number>;
  /**
   * If true, bypass hyperparameter analysis.
   * @type {boolean}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  bypass_hyperparameter_analysis?: boolean;
  /**
   * If true, bypass calculation of feature residuals.
   * @type {boolean}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  bypass_calculate_feature_residuals?: boolean;
  /**
   * If true, bypass calculation of feature weights.
   * @type {boolean}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  bypass_calculate_feature_weights?: boolean;
  /**
   * Optional value, defaults to single_targeted
   * single_targeted: analyze hyperparameters for the specified action_features
   * omni_targeted: analyze hyperparameters for each context feature as an action feature, ignores action_features parameter
   * targetless: analyze hyperparameters for all context features as possible action features, ignores action_features parameter
   * @type {string}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  targeted_model?: SetAutoAnalyzeParamsRequestTargetedModelEnum;
  /**
   * Optional. Number of cases to sample during analysis. Only applies for k_folds = 1.
   * @type {number}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  num_analysis_samples?: number;
  /**
   * Optional. Number of samples to use for analysis. The rest will be randomly held-out and not included in calculations.
   * @type {number}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  analysis_sub_model_size?: number;
  /**
   * Optional flag, when true uses deviations for LK metric in queries.
   * @type {boolean}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  use_deviations?: boolean;
  /**
   * Compute and use inverse of residuals as feature weights.
   * @type {boolean}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  inverse_residuals_as_weights?: boolean;
  /**
   * Optional. When True, will scale influence weights by each case's `weight_feature` weight.
   * @type {boolean}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  use_case_weights?: boolean;
  /**
   * The name of the feature whose values to use as case weights. When left unspecified, uses the internally
   * managed case weight.
   * @type {string}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  weight_feature?: string;
  /**
   * Additional experimental analyze parameters.
   * @type {{ [key: string]: any; }}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  experimental_options?: { [key: string]: any };
  /**
   * When True, the train operation returns when it's time for the model to be analyzed again.
   * @type {boolean}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  auto_analyze_enabled?: boolean;
  /**
   * The size of of the model at which to stop doing auto-analysis. Value of 0 means no limit.
   * @type {number}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  auto_analyze_limit_size?: number;
  /**
   * The factor by which to increase the analyze threshold every time the model grows to the current threshold size.
   * @type {number}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  analyze_growth_factor?: number;
  /**
   * The threshold for the number of cases at which the model should be re-analyzed.
   * @type {number}
   * @memberof SetAutoAnalyzeParamsRequest
   */
  analyze_threshold?: number;
}

/**
 * @export
 * @enum {string}
 */
export type SetAutoAnalyzeParamsRequestTargetedModelEnum = "single_targeted" | "omni_targeted" | "targetless";

/**
 * Check if a given object implements the SetAutoAnalyzeParamsRequest interface.
 */
export function instanceOfSetAutoAnalyzeParamsRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function SetAutoAnalyzeParamsRequestFromJSON(json: any): SetAutoAnalyzeParamsRequest {
  return SetAutoAnalyzeParamsRequestFromJSONTyped(json, false);
}

export function SetAutoAnalyzeParamsRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): SetAutoAnalyzeParamsRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    action_features: !exists(json, "action_features") ? undefined : json["action_features"],
    context_features: !exists(json, "context_features") ? undefined : json["context_features"],
    k_folds: !exists(json, "k_folds") ? undefined : json["k_folds"],
    num_samples: !exists(json, "num_samples") ? undefined : json["num_samples"],
    dt_values: !exists(json, "dt_values") ? undefined : json["dt_values"],
    k_values: !exists(json, "k_values") ? undefined : json["k_values"],
    p_values: !exists(json, "p_values") ? undefined : json["p_values"],
    bypass_hyperparameter_analysis: !exists(json, "bypass_hyperparameter_analysis")
      ? undefined
      : json["bypass_hyperparameter_analysis"],
    bypass_calculate_feature_residuals: !exists(json, "bypass_calculate_feature_residuals")
      ? undefined
      : json["bypass_calculate_feature_residuals"],
    bypass_calculate_feature_weights: !exists(json, "bypass_calculate_feature_weights")
      ? undefined
      : json["bypass_calculate_feature_weights"],
    targeted_model: !exists(json, "targeted_model") ? undefined : json["targeted_model"],
    num_analysis_samples: !exists(json, "num_analysis_samples") ? undefined : json["num_analysis_samples"],
    analysis_sub_model_size: !exists(json, "analysis_sub_model_size") ? undefined : json["analysis_sub_model_size"],
    use_deviations: !exists(json, "use_deviations") ? undefined : json["use_deviations"],
    inverse_residuals_as_weights: !exists(json, "inverse_residuals_as_weights")
      ? undefined
      : json["inverse_residuals_as_weights"],
    use_case_weights: !exists(json, "use_case_weights") ? undefined : json["use_case_weights"],
    weight_feature: !exists(json, "weight_feature") ? undefined : json["weight_feature"],
    experimental_options: !exists(json, "experimental_options") ? undefined : json["experimental_options"],
    auto_analyze_enabled: !exists(json, "auto_analyze_enabled") ? undefined : json["auto_analyze_enabled"],
    auto_analyze_limit_size: !exists(json, "auto_analyze_limit_size") ? undefined : json["auto_analyze_limit_size"],
    analyze_growth_factor: !exists(json, "analyze_growth_factor") ? undefined : json["analyze_growth_factor"],
    analyze_threshold: !exists(json, "analyze_threshold") ? undefined : json["analyze_threshold"],
  };
}

export function SetAutoAnalyzeParamsRequestToJSON(value?: SetAutoAnalyzeParamsRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    action_features: value.action_features,
    context_features: value.context_features,
    k_folds: value.k_folds,
    num_samples: value.num_samples,
    dt_values: value.dt_values,
    k_values: value.k_values,
    p_values: value.p_values,
    bypass_hyperparameter_analysis: value.bypass_hyperparameter_analysis,
    bypass_calculate_feature_residuals: value.bypass_calculate_feature_residuals,
    bypass_calculate_feature_weights: value.bypass_calculate_feature_weights,
    targeted_model: value.targeted_model,
    num_analysis_samples: value.num_analysis_samples,
    analysis_sub_model_size: value.analysis_sub_model_size,
    use_deviations: value.use_deviations,
    inverse_residuals_as_weights: value.inverse_residuals_as_weights,
    use_case_weights: value.use_case_weights,
    weight_feature: value.weight_feature,
    experimental_options: value.experimental_options,
    auto_analyze_enabled: value.auto_analyze_enabled,
    auto_analyze_limit_size: value.auto_analyze_limit_size,
    analyze_growth_factor: value.analyze_growth_factor,
    analyze_threshold: value.analyze_threshold,
  };
}
