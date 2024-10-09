/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * ReactAggregateDetails
 */
import type { Condition } from "./Condition";
import type { Precision } from "./Precision";
import type { PredictionStat } from "./PredictionStat";

export type ReactAggregateDetails = {
  /**
   * If specified, will condition the action set, which is the dataset for which the prediction stats are for. If both 'action_condition' and 'context_condition' are provided, then all of the action cases selected by the 'action_condition' will be excluded from the context set, which is the set being queried to make to make predictions on the action set, effectively holding them out. If only 'action_condition' is specified, then only the single predicted case will be left out.
   */
  action_condition?: Condition;
  /**
   * Used only with 'action_condition' parameter, will find exact matches if 'exact' and similar cases if 'similar'.
   */
  action_condition_precision?: Precision;
  /**
   * Limit on the number of action cases used in calculating conditional prediction stats. Works with or without 'action_condition_filter_query'.
   * If 'action_condition' is set:
   * If null, will be set to k if precision is "similar" or no limit if precision is "exact". default is null
   *
   * If 'action_condition' is not set:
   * If null, will be set to the Howso default limit of 2000. default is null
   */
  action_num_samples?: number;
  /**
   * If specified, will condition the context set, which is the set being queried to make to make predictions on the action set. If both 'action_condition' and 'context_condition' are provided, then all of the cases from the action set, which is the dataset for which the prediction stats are for, will be excluded from the context set,  effectively holding them out. If only 'action_condition' is specified, then only the single predicted case will be left out.
   */
  context_condition?: Condition;
  /**
   * Optional, limit on the number of context cases when 'context_condition_precision' is set to 'similar'. If null, will be set to k. default is null.
   */
  context_condition_num_samples?: number;
  /**
   * Default is 'exact'. Used only with 'context_condition' parameter, will find exact matches if 'exact' and similar cases if 'similar'.
   */
  context_condition_precision?: Precision;
  /**
   * If true will for each context_feature, use the full set of all other context_features to compute the mean absolute delta between prediction of action_feature with and without the context_feature in the model. Uses full computation.
   */
  feature_contributions_full?: boolean;
  /**
   * For each context_feature, use the robust (power set/permutation) set of all other context_features to compute the mean absolute delta between prediction of action_feature with and without the context_feature in the model. Uses robust computation. Uses robust computation.
   */
  feature_contributions_robust?: boolean;
  /**
   * If true will compute Mean Decrease in Accuracy (feature_mda) for each context feature at predicting mda_action_features. Drop each feature and use the full set of remaining context features for each prediction. false removes cached values. Uses full computation.
   */
  feature_mda_full?: boolean;
  /**
   * If true will compute feature_mda_full by scrambling each feature and using the full set of remaining context features for each prediction.  false removes cached values. Uses full computation.
   */
  feature_mda_permutation_full?: boolean;
  /**
   * If true will compute feature_mda by scrambling each feature and using the robust (power set/permutations) set of remaining context features for each prediction.  false removes cached values. Uses robust computation.
   */
  feature_mda_permutation_robust?: boolean;
  /**
   * If true will compute feature_mda by dropping each feature and using the robust (power set/permutations) set of remaining context features for each prediction. false removes cached values. Uses robust computation.
   */
  feature_mda_robust?: boolean;
  /**
   * If true, will for each context_feature, use the full set of all other context_features to predict the feature.  When true, computes, caches, and returns the residuals for all features. Uses full computation. When "prediction_stats" in the "details" parameter is true, it will also compute and cache the feature residuals.
   */
  feature_residuals_full?: boolean;
  /**
   * If true, will for each context_feature, computes, caches, and returns the same stats as residuals but using the robust (power set/permutations) set of all other context_features to predict the feature. Uses robust computation.
   */
  feature_residuals_robust?: boolean;
  /**
   * If true outputs full feature prediction stats for all (context and action) features. The prediction stats returned are set by the `"selected_prediction_stats`" parameter. Uses full calculations, which uses leave-one-out for features for computations. Uses full computation.
   */
  prediction_stats?: boolean;
  /**
   * List of features to use when calculating conditional prediction stats. Should contain all action and context features desired. If 'action_feature' is also provided, that feature will automatically be appended to this list if it is not already in the list
   */
  prediction_stats_features?: string[];
  /**
   * Types of stats to output. When unspecified, returns all except the confusion_matrix. If all, then returns all including the confusion_matrix.
   */
  selected_prediction_stats?: PredictionStat[];
};
