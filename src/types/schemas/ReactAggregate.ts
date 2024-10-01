/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * ReactAggregate
 *
 * Computes, caches, and returns specified details and feature prediction statistics such as mean decrease in accuracy (mda), residuals (accuracy, mean absolute error),
 *  precision, recall, etc. returns details and feature prediction stats for all features in the format of feature -> assoc stat -> value
 */
import type { ReactAggregateDetails } from "./ReactAggregateDetails";

export type ReactAggregateRequest = {
  /*
   * Target feature for which to do computations. if "prediction_stats_action_feature" and "feature_influences_action_feature"
   *   are not provided, they will default to this value.
   */
  action_feature?: string;

  /*
   * List of features to do residuals and prediction stats computations for. default is the value of context_features
   * @default []
   */
  action_features?: string[];

  /*
   * Number, optional, default is 10. applicable only to confusion matrices when computing residuals, the number of predictions
   *   a class should have (value of a cell in the matrix) for it to remain in the confusion matrix. if the count is less than this value, it will
   *   be accumulated into a single value of all insignificant predictions for the class and removed from the confusion matrix.
   * @default 15
   */
  confusion_matrix_min_count?: number;

  /*
   * List of features to use as contexts for computations. default is all features if unspecified.
   * @default []
   */
  context_features?: string[];

  /*
   * Assoc, optional. an assoc of flags for which type of audit data to return, and corresponding values to return (if applicable) in the format of:
   *    (assoc
   *     prediction_stats: optional true/false. if true outputs full feature prediction stats for all (context and action)
   *         features. the prediction stats returned are set by the "selected_prediction_stats" parameter. uses full calculations, which
   *         uses leave-one-out for features for computations. uses full computation.
   *     feature_residuals_full: optional, none/true/false. for each context_feature, use the full set of all other context_features to
   *                predict the feature.  when true, computes, caches, and returns the residuals for all features. uses full computation.
   *                when "prediction_stats" in the "details" parameter is true, it will also compute and cache the feature residuals.
   *     feature_residuals_robust: optional, none/true/false. for each context_feature, computes, caches, and returns the same stats as residuals but using the robust
   *                (power set/permutations) set of all other context_features to predict the feature. uses robust computation.
   *     feature_contributions_full: optional, none/true/false. for each context_feature, use the full set of all other context_features to compute the
   *         mean absolute delta between prediction of action_feature with and without the context_feature in the model. uses full computation.
   *     feature_contributions_robust: optional, none/true/false. for each context_feature, use the robust (power set/permutation) set of all other context_features
   *         to compute the mean absolute delta between prediction of action_feature with and without the context_feature in the model. uses robust computation.
   *         uses robust computation.
   *     feature_mda_full: optional, none/true/false. if true will compute mean decrease in accuracy (feature_mda) for each context feature at predicting mda_action_features.
   *         drop each feature and use the full set of remaining context features for each prediction. uses full computation.
   *     feature_mda_permutation_full: optional, none/true/false. compute feature_mda_full by scrambling each feature and using the full set of remaining context features
   *         for each prediction.  uses full computation.
   *     feature_mda_robust: optional, none/true/false. compute feature_mda by dropping each feature and using the robust (power set/permutations) set of
   *         remaining context features for each prediction. uses robust computation.
   *     feature_mda_permutation_robust: optional, none/true/false. compute feature_mda by scrambling each feature and using the robust (power set/permutations)
   *         set of remaining context features for each prediction.  uses robust computation.
   *     selected_prediction_stats": list of strings, optional.  allowed values are:
   *             "mae" : mean absolute error. for continuous features, this is calculated as the mean of absolute values of the difference
   *               between the actual and predicted values. for nominal features, this is 1 - the average categorical action probability of each case's
   *               correct classes. categorical action probabilities are the probabilities for each class for the action feature.
   *             "r2": r-squared coefficient of determination, for continuous features only.
   *             "rmse": root mean squared error, for continuous features only.
   *             "spearman_coeff": spearman's rank correlation coefficient, for continuous features only.
   *             "precision": precision (positive predictive) value for nominal features only. aggregated by taking the unweighted means of each classes' precisions.
   *             "recall": recall (sensitivity) value for nominal features only. aggregated by taking the unweighted means of each classes' recalls.
   *             "accuracy": the number of correct predictions divided by the total number of predictions.
   *             "confusion_matrix": a matrix showing the number of predicted values of each class
   *               for each unique value of the predicted feature. outputs the sparse confusion matrix.
   *             "missing_value_accuracy" : the number of correct predictions on cases with missing values values divided by the total number of cases with missing
   *               values for a specified feature.
   *             "all": all of the available prediction stats including the confusion_matrix
   *         if empty, will return all of the available prediction stats not including the confusion matrices.
   *     action_condition: assoc of feature->value(s), optional. if specified, will condition the action set, which is the dataset for which the prediction stats are for.
   *       if both 'action_condition' and 'context_condition' are provided, then all of the action cases selected by the 'action_condition'
   *       will be excluded from the context set, which is the set being queried to make to make predictions on the action set, effectively holding them out.
   *       if only 'action_condition' is specified, then only the single predicted case will be left out.
   *       no value = must have feature
   *       - for continuous or numeric ordinal features:
   *         one value = must equal exactly the value or be close to it for fuzzy match
   *         two values = inclusive between
   *       - for nominal or string ordinal features:
   *         n values = must match any of these values exactly
   *     action_condition_precision: optional string,  default is 'exact', used only with 'action_condition' parameter, will find exact matches if 'exact' and similar cases if 'similar'.
   *     action_num_samples: optional, limit on the number of action cases used in calculating conditional prediction stats. works with or without 'action_condition_filter_query'.
   *       if 'action_condition' is set:
   *         if null, will be set to k if precision is "similar" or no limit if precision is "exact". default is null
   *       if 'action_condition' is not set:
   *         if null, will be set to the howso default limit of 2000. default is null
   *     context_condition: assoc of feature->value(s), optional. if specified, will condition the context set, which is the set being queried to make to make predictions on the action set.
   *       if both 'action_condition' and 'context_condition' are provided, then all of the cases from the action set, which is the dataset for which the prediction stats are for,
   *       will be excluded from the context set,  effectively holding them out. if only 'action_condition' is specified, then only the single predicted case will be left out.
   *       no value = must have feature
   *       - for continuous or numeric ordinal features:
   *         one value = must equal exactly the value or be close to it for fuzzy match
   *         two values = inclusive between
   *       - for nominal or string ordinal features:
   *         n values = must match any of these values exactly
   *     context_condition_precision: optional string, default is 'exact'. used only with 'context_condition' parameter, will find exact matches if 'exact' and similar cases if 'similar'.
   *     context_num_samples: optional, limit on the number of context cases when 'context_condition_precision' is set to 'similar'.
   *       if null, will be set to k. default is null
   *     prediction_stats_features: list of string, optional. list of features to use when calculating conditional prediction stats. should contain all action and context features desired. if
   *     'action_feature' is also provided, that feature will automatically be appended to this list if it is not already in the list
   *     "feature_residuals_robust" true or false. if true outputs feature residuals for all (context and action) features
   *     locally around the prediction. uses only the context features of the reacted case to
   *     determine that area.
   *   )
   */
  details?: ReactAggregateDetails;

  /*
   * When feature influences such as contributions and mda, use this feature as the action feature.
   *   if not provided, will default to the "action_feature" if provided.
   */
  feature_influences_action_feature?: string;

  /*
   * Full path for hyperparameters to use for computation.
   *   if specified for any residual computations, takes precendence over action_feature parameter.
   */
  hyperparameter_param_path?: string[];

  /*
   * Total sample size of model to use (using sampling with replacement) for robust contribution computation.
   *   defaults to 300.
   */
  num_robust_influence_samples?: number;

  /*
   * Specifies the number of robust samples to use for each case for robust contribution computations.
   *   defaults to 300 + 2 * (number of features).
   */
  num_robust_influence_samples_per_case?: number;

  /*
   * Total sample size of model to use (using sampling with replacement) for robust feature_mda and residual computation.
   *   defaults to 1000 * (1 + log(number of features)).  note: robust feature_mda will be updated to use num_robust_influence_samples in a future release.
   */
  num_robust_residual_samples?: number;

  /*
   * Total sample size of model to use (using sampling with replacement) for all non-robust computation.
   *   defaults to 1000. if specified overrides sample_model_fraction.
   */
  num_samples?: number;

  /*
   * When calculating residuals and prediction stats, uses this target features's hyperparameters. the trainee must
   *   have been analyzed with this feature as the action feature first. if both "prediction_stats_action_feature" and "action_feature" are not provided,
   *   by default residuals and prediction stats uses ".targetless" hyperparameters. if "action_feature" is provided, and this value is not provided, will
   *   default to the value of "action_feature".
   */
  prediction_stats_action_feature?: string;

  /*
   * Flag, optional. if specified, will attempt to return stats that were computed using hyperpparameters with the
   *   specified robust or non-robust type.
   */
  robust_hyperparameters?: boolean;

  /*
   * Value 0.0 - 1.0, percent of model to use in sampling (using sampling without replacement).
   *   applicable only to non-robust computation. ignored if num_samples is specified.
   */
  sample_model_fraction?: number;

  /*
   * If specified will calculate only on a sub model of the specified size from the full model.
   *   applicable only to models > 1000 cases.
   */
  sub_model_size?: number;

  /*
   * Flag, if set to true will scale influence weights by each case's weight_feature weight. if unspecified,
   *   case weights will be used if the trainee has them.
   */
  use_case_weights?: boolean;

  /*
   * Name of feature whose values to use as case weights
   *   "generate_attempts" true or false. if true, outputs the total number of attempts to generate the unique case. only applicable for generative
   *   reacts where generate_new_cases is "always" or "attempt". when used with reactseries, "series_generate_attempts" is also returned.
   * @default ".case_weight"
   */
  weight_feature?: string;
};
