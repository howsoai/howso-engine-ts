/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * ReactAggregate
 *
 * Computes, caches, and returns specified details and feature prediction statistics such as Mean Decrease in Accuracy (MDA), residuals (accuracy, Mean Absolute Error),
 *  precision, recall, etc. Returns details and feature prediction stats for all features in the format of feature -> assoc stat -> value
 */
import type { ConfusionMatrixMap } from "./ConfusionMatrixMap";
import type { ReactAggregateDetails } from "./ReactAggregateDetails";
import type { UseCaseWeights } from "./UseCaseWeights";

export type ReactAggregateRequest = {
  /**
   * Target feature for which to do computations. If "prediction_stats_action_feature" and "feature_influences_action_feature"
   *   are not provided, they will default to this value.
   */
  action_feature?: string;

  /**
   * List of features to do residuals and prediction stats computations for. default is the value of context_features
   * @default []
   */
  action_features?: string[];

  /**
   * Number, optional, default is 15. Applicable only to confusion matrices when computing residuals, the number of predictions
   *   a class should have (value of a cell in the matrix) for it to remain in the confusion matrix. If the count is less than this value, it will
   *   be accumulated into a single value of all insignificant predictions for the class and removed from the confusion matrix.
   * @default 15
   */
  confusion_matrix_min_count?: number;

  /**
   * List of features to use as contexts for computations. default is all features if unspecified.
   * @default []
   */
  context_features?: string[];

  /**
   * Assoc, optional. an assoc of flags for which type of audit data to return, and corresponding values to return (if applicable) in the format of:
   *    (assoc
   *     prediction_stats: optional true/false. If true outputs full feature prediction stats for all (context and action)
   *         features. The prediction stats returned are set by the "selected_prediction_stats" parameter. Uses full calculations, which
   *         uses leave-one-out for features for computations. Uses full computation.
   *     feature_residuals_full: optional, none/true/false. For each context_feature, use the full set of all other context_features to
   *                predict the feature.  When true, computes, caches, and returns the residuals for all features. Uses full computation.
   *                When "prediction_stats" in the "details" parameter is true, it will also compute and cache the feature residuals.
   *     feature_residuals_robust: optional, none/true/false. For each context_feature, computes, caches, and returns the same stats as residuals but using the robust
   *                (power set/permutations) set of all other context_features to predict the feature. Uses robust computation.
   *     feature_contributions_full: optional, none/true/false. For each context_feature, use the full set of all other context_features to compute the
   *         mean absolute delta between prediction of action_feature with and without the context_feature in the model. Uses full computation.
   *     feature_contributions_robust: optional, none/true/false. For each context_feature, use the robust (power set/permutation) set of all other context_features
   *         to compute the mean absolute delta between prediction of action_feature with and without the context_feature in the model. Uses robust computation.
   *         Uses robust computation.
   *     feature_mda_full: optional, none/true/false. if true will compute Mean Decrease in Accuracy (feature_mda) for each context feature at predicting mda_action_features.
   *         Drop each feature and use the full set of remaining context features for each prediction. Uses full computation.
   *     feature_mda_permutation_full: optional, none/true/false. Compute feature_mda_full by scrambling each feature and using the full set of remaining context features
   *         for each prediction.  Uses full computation.
   *     feature_mda_robust: optional, none/true/false. Compute feature_mda by dropping each feature and using the robust (power set/permutations) set of
   *         remaining context features for each prediction. Uses robust computation.
   *     feature_mda_permutation_robust: optional, none/true/false. Compute feature_mda by scrambling each feature and using the robust (power set/permutations)
   *         set of remaining context features for each prediction.  Uses robust computation.
   *     selected_prediction_stats": list of strings, optional.  Allowed values are:
   *             "mae" : Mean absolute error. For continuous features, this is calculated as the mean of absolute values of the difference
   *               between the actual and predicted values. For nominal features, this is 1 - the average categorical action probability of each case's
   *               correct classes. Categorical action probabilities are the probabilities for each class for the action feature.
   *             "r2": r-squared coefficient of determination, for continuous features only.
   *             "rmse": root mean squared error, for continuous features only.
   *             "smape": Symmetric mean absolute percentage error, for continuous features only.
   *             "adjusted_smape": Symmetric mean absolute percentage error, for continuous features only. Adds the min gap / 2 to the actual and
   *                predicted values.
   *             "spearman_coeff": Spearman's rank correlation coefficient, for continuous features only.
   *             "precision": precision (positive predictive) value for nominal features only. Aggregated by taking the unweighted means of each classes' precisions.
   *             "recall": recall (sensitivity) value for nominal features only. Aggregated by taking the unweighted means of each classes' recalls.
   *             "accuracy": The number of correct predictions divided by the total number of predictions.
   *             "confusion_matrix": A matrix showing the number of predicted values of each class
   *               for each unique value of the predicted feature. Outputs the sparse confusion matrix.
   *             "missing_value_accuracy" : The number of correct predictions on cases with missing values values divided by the total number of cases with missing
   *               values for a specified feature.
   *             "all": All of the available prediction stats including the confusion_matrix
   *         If empty, will return all of the available prediction stats not including the confusion matrices.
   *     action_condition: assoc of feature->value(s), optional. If specified, will condition the action set, which is the dataset for which the prediction stats are for.
   *       If both 'action_condition' and 'context_condition' are provided, then all of the action cases selected by the 'action_condition'
   *       will be excluded from the context set, which is the set being queried to make to make predictions on the action set, effectively holding them out.
   *       If only 'action_condition' is specified, then only the single predicted case will be left out.
   *       no value = must have feature
   *       - for continuous or numeric ordinal features:
   *         one value = must equal exactly the value or be close to it for fuzzy match
   *         two values = inclusive between
   *       - for nominal or string ordinal features:
   *         n values = must match any of these values exactly
   *     action_condition_precision: optional string,  default is 'exact', used only with 'action_condition' parameter, will find exact matches if 'exact' and similar cases if 'similar'.
   *     action_num_samples: optional, limit on the number of action cases used in calculating conditional prediction stats. Works with or without 'action_condition_filter_query'.
   *       If 'action_condition' is set:
   *         If null, will be set to k if precision is "similar" or no limit if precision is "exact". default is null
   *       If 'action_condition' is not set:
   *         If null, will be set to the Howso default limit of 2000. default is null
   *     context_condition: assoc of feature->value(s), optional. If specified, will condition the context set, which is the set being queried to make to make predictions on the action set.
   *       If both 'action_condition' and 'context_condition' are provided, then all of the cases from the action set, which is the dataset for which the prediction stats are for,
   *       will be excluded from the context set,  effectively holding them out. If only 'action_condition' is specified, then only the single predicted case will be left out.
   *       no value = must have feature
   *       - for continuous or numeric ordinal features:
   *         one value = must equal exactly the value or be close to it for fuzzy match
   *         two values = inclusive between
   *       - for nominal or string ordinal features:
   *         n values = must match any of these values exactly
   *     context_condition_precision: optional string, default is 'exact'. Used only with 'context_condition' parameter, will find exact matches if 'exact' and similar cases if 'similar'.
   *     context_num_samples: optional, limit on the number of context cases when 'context_condition_precision' is set to 'similar'.
   *       If null, will be set to k. default is null
   *   )
   */
  details?: ReactAggregateDetails;

  /**
   * When feature influences such as contributions and mda, use this feature as the action feature.
   *   If not provided, will default to the "action_feature" if provided.
   */
  feature_influences_action_feature?: string;

  /**
   * Full path for hyperparameters to use for computation.
   *   If specified for any residual computations, takes precendence over action_feature parameter.
   */
  hyperparameter_param_path?: string[];

  /**
   * Total sample size of model to use (using sampling with replacement) for robust contribution computation.
   *   Defaults to 300.
   */
  num_robust_influence_samples?: number;

  /**
   * Specifies the number of robust samples to use for each case for robust contribution computations.
   *   Defaults to 300 + 2 * (number of features).
   */
  num_robust_influence_samples_per_case?: number;

  /**
   * Total sample size of model to use (using sampling with replacement) for robust feature_mda and residual computation.
   *   Defaults to 1000 * (1 + log(number of features)).  Note: robust feature_mda will be updated to use num_robust_influence_samples in a future release.
   */
  num_robust_residual_samples?: number;

  /**
   * Total sample size of model to use (using sampling with replacement) for all non-robust computation.
   *   Defaults to 1000. If specified overrides sample_model_fraction.
   */
  num_samples?: number;

  /**
   * When calculating residuals and prediction stats, uses this target features's hyperparameters. The trainee must
   *   have been analyzed with this feature as the action feature first. If both "prediction_stats_action_feature" and "action_feature" are not provided,
   *   by default residuals and prediction stats uses ".targetless" hyperparameters. If "action_feature" is provided, and this value is not provided, will
   *   default to the value of "action_feature".
   */
  prediction_stats_action_feature?: string;

  /**
   * Flag, optional. if specified, will attempt to return stats that were computed using hyperpparameters with the
   *   specified robust or non-robust type.
   */
  robust_hyperparameters?: boolean;

  /**
   * Value 0.0 - 1.0, percent of model to use in sampling (using sampling without replacement).
   *   Applicable only to non-robust computation. Ignored if num_samples is specified.
   */
  sample_model_fraction?: number;

  /**
   * If specified will calculate only on a sub model of the specified size from the full model.
   *   Applicable only to models > 1000 cases.
   */
  sub_model_size?: number;

  /**
   * Flag, if set to true will scale influence weights by each case's weight_feature weight. If unspecified,
   *   case weights will be used if the trainee has them.
   */
  use_case_weights?: UseCaseWeights;

  /**
   * Name of feature whose values to use as case weights
   *   "generate_attempts" true or false. If true, outputs the total number of attempts to generate the unique case. Only applicable for generative
   *   reacts where generate_new_cases is "always" or "attempt". When used with ReactSeries, "series_generate_attempts" is also returned.
   * @default ".case_weight"
   */
  weight_feature?: string;
};

export type ReactAggregateResponse = Record<
  string,
  {
    /**
     * The accuracy of predicting the feature.
     */
    accuracy?: number | null;
    /**
     * The symmetric mean absolute percentage error with added the min gap / 2 to the actual and predicted values.
     */
    adjusted_smape?: number | null;
    confusion_matrix?: ConfusionMatrixMap;
    /**
     * The mean difference of predicting the specified action feature with and without this feature while using the full set of remaining context features.
     */
    directional_feature_contributions_full?: number | null;
    /**
     * The mean difference of predicting the specified action feature with and without this feature while using samples from the power-set of remaining context features.
     */
    directional_feature_contributions_robust?: number | null;
    /**
     * The mean absolute difference of predicting the specified action feature with and without this feature while using the full set of remaining context features.
     */
    feature_contributions_full?: number | null;
    /**
     * The mean absolute difference of predicting the specified action feature with and without this feature while using samples from the power-set of remaining context features.
     */
    feature_contributions_robust?: number | null;
    /**
     * The mean decrease in accuracy of predicting the specified action feature without this feature versus with this feature while using full set of remaining context features.
     */
    feature_mda_full?: number | null;
    /**
     * The mean decrease in accuracy of predicting the specified action feature using scrambled values for this feature versus non-scrambled values for this feature while using the full set of remaining context features.
     */
    feature_mda_permutation_full?: number | null;
    /**
     * The mean decrease in accuracy of predicting the specified action feature using scrambled values for this feature versus non-scrambled values for this feature while using samples from the power-set of remaining context features.
     */
    feature_mda_permutation_robust?: number | null;
    /**
     * The mean decrease in accuracy of predicting the specified action feature without this feature versus with this feature while using samples from the power-set of remaining context features.
     */
    feature_mda_robust?: number | null;
    /**
     * The mean absolute error of predicting this feature using the full set of context features.
     */
    feature_residuals_full?: number | null;
    /**
     * The mean absolute error of predicting this feature using samples from the power-set of context features.
     */
    feature_residuals_robust?: number | null;
    /**
     * The mean absolute error of predicting the feature.
     */
    mae?: number | null;
    /**
     * The MCC of predicting the feature.
     */
    mcc?: number | null;
    /**
     * The proportion of missing values that were correctly predicted as missing for the feature.
     */
    missing_value_accuracy?: number | null;
    /**
     * The precision of predicting the feature.
     */
    precision?: number | null;
    /**
     * The R^2 of predicting the feature.
     */
    r2?: number | null;
    /**
     * The recall of predicting the feature.
     */
    recall?: number | null;
    /**
     * The RMSE of predicting the feature.
     */
    rmse?: number | null;
    /**
     * The symmetric mean absolute percentage error of predicting the feature.
     */
    smape?: number | null;
    /**
     * The Spearman's coefficient of predicting the feature.
     */
    spearman_coeff?: number | null;
  }
>;
