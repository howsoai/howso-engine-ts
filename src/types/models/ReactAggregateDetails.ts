/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * Returns details and prediction stats data for a given reaction for the specified flags.
 * @export
 * @interface ReactAggregateDetails
 */
export interface ReactAggregateDetails {
  /**
   * If true outputs full feature prediction stats for all (context and action) features. The prediction stats returned are set by the "selected_prediction_stats" parameter in the 'details' parameter. Uses full calculations, which uses leave-one-out for features for computations. False removes cached values.
   * @type {boolean}
   * @memberof ReactAggregateDetails
   */
  prediction_stats?: boolean;
  /**
   * For each context_feature, use the full set of all other context_features to predict the feature. False removes cached values. When "prediction_stats" in the "details" parameter is true, the Trainee will also calculate and cache the full feature residuals.
   * @type {boolean}
   * @memberof ReactAggregateDetails
   */
  feature_residuals_full?: boolean;
  /**
   * For each context_feature, use the robust (power set/permutations) set of all other context_features to predict the feature. False removes cached values.
   * @type {boolean}
   * @memberof ReactAggregateDetails
   */
  feature_residuals_robust?: boolean;
  /**
   * For each context_feature, use the full set of all other context_features to compute the mean absolute delta between prediction of the action feature with and without the context features in the model. False removes cached values.
   * @type {boolean}
   * @memberof ReactAggregateDetails
   */
  feature_contributions_full?: boolean;
  /**
   * For each context_feature, use the robust (power set/permutation) set of all other context features to compute the mean absolute delta between prediction of the action feature with and without the context features in the model. False removes cached values.
   * @type {boolean}
   * @memberof ReactAggregateDetails
   */
  feature_contributions_robust?: boolean;
  /**
   * When True will compute Mean Decrease in Accuracy (MDA) for each context feature at predicting the action feature. Drop each feature and use the full set of remaining context features for each prediction. False removes cached values.
   * @type {boolean}
   * @memberof ReactAggregateDetails
   */
  feature_mda_full?: boolean;
  /**
   * Compute Mean Decrease in Accuracy (MDA) by dropping each feature and using the robust (power set/permutations) set of remaining context features for each prediction. False removes cached values.
   * @type {boolean}
   * @memberof ReactAggregateDetails
   */
  feature_mda_robust?: boolean;
  /**
   * Compute Mean Decrease in Accuracy (MDA) by scrambling each feature and using the full set of remaining context features for each prediction. False removes cached values.
   * @type {boolean}
   * @memberof ReactAggregateDetails
   */
  feature_mda_permutation_full?: boolean;
  /**
   * Compute MDA by scrambling each feature and using the robust (power set/permutations) set of remaining context features for each prediction. False removes cached values.
   * @type {boolean}
   * @memberof ReactAggregateDetails
   */
  feature_mda_permutation_robust?: boolean;
  /**
   * A condition map to select the action set, which is the dataset for which
   * the prediction stats are for. If both action_condition and context_condition
   * are provided, then all of the action cases selected by the action_condition
   * will be excluded from the context set, which is the set being queried to
   * make predictions on the action set, effectively holding them out.
   * If only action_condition is specified, then only the single predicted case
   * will be left out.
   *
   * The dictionary keys are the feature name and values are one of:
   * - None
   * - A value, must match exactly.
   * - An array of two numeric values, specifying an inclusive range. Only applicable to continuous and numeric ordinal features.
   * - An array of string values, must match any of these values exactly. Only applicable to nominal and string ordinal features.
   * @type {{ [key: string]: any; }}
   * @memberof ReactAggregateDetails
   */
  action_condition?: { [key: string]: any };
  /**
   * Exact matching or fuzzy matching. Only used if action_condition is not not null.
   * @type {string}
   * @memberof ReactAggregateDetails
   */
  action_condition_precision?: ReactAggregateDetailsActionConditionPrecisionEnum;
  /**
   * The maximum amount of cases to use to calculate prediction stats.
   * If not specified, the limit will be k cases if precision is
   * "similar", or 1000 cases if precision is "exact". Works with or
   * without action_condition.
   * If action_condition is set:
   * - If None, will be set to k if precision is "similar" or no limit if precision is "exact".
   * If action_condition is not set:
   * - If None, will be set to the Howso default limit of 2000.
   * @type {number}
   * @memberof ReactAggregateDetails
   */
  action_num_cases?: number;
  /**
   * A condition map to select the context set, which is the set being queried to make
   * predictions on the action set. If both action_condition and context_condition
   * are provided, then all of the cases from the action set, which is the dataset for which the
   * prediction stats are for, will be excluded from the context set, effectively holding them out.
   * If only action_condition is specified, then only the single predicted case will be left out.
   *
   * The dictionary keys are the feature name and values are one of:
   * - None
   * - A value, must match exactly.
   * - An array of two numeric values, specifying an inclusive range. Only applicable to continuous and numeric ordinal features.
   * - An array of string values, must match any of these values exactly. Only applicable to nominal and string ordinal features.
   * @type {{ [key: string]: any; }}
   * @memberof ReactAggregateDetails
   */
  context_condition?: { [key: string]: any };
  /**
   * Exact matching or fuzzy matching. Only used if context_condition is not not null.
   * @type {string}
   * @memberof ReactAggregateDetails
   */
  context_condition_precision?: ReactAggregateDetailsContextConditionPrecisionEnum;
  /**
   * Limit on the number of context cases when context_condition_precision is set to "similar".
   * If None, will be set to k.
   * @type {number}
   * @memberof ReactAggregateDetails
   */
  context_precision_num_cases?: number;
  /**
   * List of features to use when calculating conditional prediction stats. Should contain all action and
   * context features desired. If ``action_feature`` is also provided, that feature will automatically be
   * appended to this list if it is not already in the list.
   * @type {Array<string>}
   * @memberof ReactAggregateDetails
   */
  prediction_stats_features?: Array<string>;
  /**
   * Types of stats to output. When unspecified, returns all except the confusion_matrix. If all, then returns all including the confusion_matrix.
   * @type {Array<string>}
   * @memberof ReactAggregateDetails
   */
  selected_prediction_stats?: Array<ReactAggregateDetailsSelectedPredictionStatsEnum>;
}

/**
 * @export
 * @enum {string}
 */
export type ReactAggregateDetailsActionConditionPrecisionEnum = "exact" | "similar";
/**
 * @export
 * @enum {string}
 */
export type ReactAggregateDetailsContextConditionPrecisionEnum = "exact" | "similar";
/**
 * @export
 * @enum {string}
 */
export type ReactAggregateDetailsSelectedPredictionStatsEnum =
  | "all"
  | "accuracy"
  | "confusion_matrix"
  | "mae"
  | "precision"
  | "r2"
  | "recall"
  | "rmse"
  | "spearman_coeff"
  | "mcc"
  | "missing_value_accuracy";

/**
 * Check if a given object implements the ReactAggregateDetails interface.
 */
export function instanceOfReactAggregateDetails(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ReactAggregateDetailsFromJSON(json: any): ReactAggregateDetails {
  return ReactAggregateDetailsFromJSONTyped(json, false);
}

export function ReactAggregateDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReactAggregateDetails {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    prediction_stats: !exists(json, "prediction_stats") ? undefined : json["prediction_stats"],
    feature_residuals_full: !exists(json, "feature_residuals_full") ? undefined : json["feature_residuals_full"],
    feature_residuals_robust: !exists(json, "feature_residuals_robust") ? undefined : json["feature_residuals_robust"],
    feature_contributions_full: !exists(json, "feature_contributions_full")
      ? undefined
      : json["feature_contributions_full"],
    feature_contributions_robust: !exists(json, "feature_contributions_robust")
      ? undefined
      : json["feature_contributions_robust"],
    feature_mda_full: !exists(json, "feature_mda_full") ? undefined : json["feature_mda_full"],
    feature_mda_robust: !exists(json, "feature_mda_robust") ? undefined : json["feature_mda_robust"],
    feature_mda_permutation_full: !exists(json, "feature_mda_permutation_full")
      ? undefined
      : json["feature_mda_permutation_full"],
    feature_mda_permutation_robust: !exists(json, "feature_mda_permutation_robust")
      ? undefined
      : json["feature_mda_permutation_robust"],
    action_condition: !exists(json, "action_condition") ? undefined : json["action_condition"],
    action_condition_precision: !exists(json, "action_condition_precision")
      ? undefined
      : json["action_condition_precision"],
    action_num_cases: !exists(json, "action_num_cases") ? undefined : json["action_num_cases"],
    context_condition: !exists(json, "context_condition") ? undefined : json["context_condition"],
    context_condition_precision: !exists(json, "context_condition_precision")
      ? undefined
      : json["context_condition_precision"],
    context_precision_num_cases: !exists(json, "context_precision_num_cases")
      ? undefined
      : json["context_precision_num_cases"],
    prediction_stats_features: !exists(json, "prediction_stats_features")
      ? undefined
      : json["prediction_stats_features"],
    selected_prediction_stats: !exists(json, "selected_prediction_stats")
      ? undefined
      : json["selected_prediction_stats"],
  };
}

export function ReactAggregateDetailsToJSON(value?: ReactAggregateDetails | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    prediction_stats: value.prediction_stats,
    feature_residuals_full: value.feature_residuals_full,
    feature_residuals_robust: value.feature_residuals_robust,
    feature_contributions_full: value.feature_contributions_full,
    feature_contributions_robust: value.feature_contributions_robust,
    feature_mda_full: value.feature_mda_full,
    feature_mda_robust: value.feature_mda_robust,
    feature_mda_permutation_full: value.feature_mda_permutation_full,
    feature_mda_permutation_robust: value.feature_mda_permutation_robust,
    action_condition: value.action_condition,
    action_condition_precision: value.action_condition_precision,
    action_num_cases: value.action_num_cases,
    context_condition: value.context_condition,
    context_condition_precision: value.context_condition_precision,
    context_precision_num_cases: value.context_precision_num_cases,
    prediction_stats_features: value.prediction_stats_features,
    selected_prediction_stats: value.selected_prediction_stats,
  };
}
