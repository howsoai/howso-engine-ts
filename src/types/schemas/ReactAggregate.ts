/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * ReactAggregate
 *
 * Computes, caches, and returns specified details and feature prediction statistics such as Accuracy Contributions, residuals (accuracy, Mean Absolute Error),
 *  precision, recall, etc. Returns details and feature prediction stats for all features in the format of feature -> assoc stat -> value
 */
import type { ConfusionMatrix } from "./ConfusionMatrix";
import type { FeatureMetricIndex } from "./FeatureMetricIndex";
import type { GoalFeatures } from "./GoalFeatures";
import type { ReactAggregateDetails } from "./ReactAggregateDetails";
import type { UseCaseWeights } from "./UseCaseWeights";

/** Request parameters of the Trainee method: reactAggregate. */
export type ReactAggregateRequest = {
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
   * The minimum size of the first batch of cases used when dynamically sampling robust residuals used to determine feature accuracy contributions.
   *   Default of 5000
   * @default 5000
   */
  convergence_min_size?: number;

  /**
   * Rate of increasing the size of each subsequent sample used to dynamically limit the total number of samples used to determine feature accuracy contributions.
   *   Defaults to 1.05, increasing by 5% until the delta between residuals is less than 'convergence_threshold'.
   * @default 1.05
   */
  convergence_samples_growth_rate?: number;

  /**
   * Percent threshold used to dynamically limit the number of samples used to determine robust accuracy contributions.
   *   Defaults to 0.5%, when set to 0 will use all num_robust_accuracy_contributions_samples
   * @default 0.005
   */
  convergence_threshold?: number;

  /**
   * Assoc, optional. an assoc of flags for which type of audit data to return, and corresponding values to return (if applicable) in the format of:
   *   (assoc
   *     prediction_stats: optional true/false. If true outputs full feature prediction stats for all (context and action)
   *         features. The prediction stats returned are set by the "selected_prediction_stats" parameter. Uses full calculations, which
   *         uses leave-one-out for features for computations. Uses full computation.
   *     estimated_residual_lower_bound: optional, none/true/false.  if true will compute fetaure residuals for each feature in action_features the same
   *         way as for 'feature_devations' except will also use context feature weights specific for each feature being predicted in order to estimate the lower bound value.
   *     missing_information: optional, none/true/false.  if true will compute the average estimated missing information in nats for each feature.
   *     feature_full_residuals: optional, none/true/false. For each context_feature, use the full set of all other context_features to
   *         predict the feature.  When true, computes, caches, and returns the residuals for all features. Uses full computation.
   *         When "prediction_stats" in the "details" parameter is true, it will also compute and cache the feature residuals.
   *     feature_robust_residuals: optional, none/true/false. For each context_feature, computes, caches, and returns the same stats as residuals but using the robust
   *         (power set/permutations) set of all other context_features to predict the feature. Uses robust computation.
   *     feature_full_prediction_contributions: optional, none/true/false. For each context_feature, use the full set of all other context_features to compute the
   *         mean absolute delta between prediction of feature_influences_action_feature with and without the context_feature in the dataset. Uses full computation.
   *     feature_robust_prediction_contributions: optional, none/true/false. For each context_feature, use the robust (power set/permutation) set of all other context_features
   *         to compute the mean absolute delta between prediction of feature_influences_action_feature with and without the context_feature in the dataset. Uses robust computation.
   *         Uses robust computation.
   *     feature_deviations: optional, none/true/false. if true will compute feature deviations for each feature in action_features. The feature deviation is the mean absolute
   *         error of predicting the feature using all the context features as well as value of the feature being predicted as the context for each prediction.
   *     feature_full_accuracy_contributions: optional, none/true/false. if true will compute Accuracy Contributions for each context feature at predicting feature_influences_action_feature.
   *         Drop each feature and use the full set of remaining context features for each prediction. Uses full computation.
   *     feature_full_accuracy_contributions_permutation: optional, none/true/false. Compute Accuracy Contributions by scrambling each feature and using the full set of remaining context features
   *         for each prediction.  Uses full computation.
   *     feature_robust_accuracy_contributions: optional, none/true/false. Compute Accuracy Contributions by dropping each feature and using the robust (power set/permutations) set of
   *         remaining context features for each prediction. Uses robust computation.
   *     feature_robust_accuracy_contributions_permutation: optional, none/true/false. Compute Accuracy Contributions by scrambling each feature and using the robust (power set/permutations)
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
   *     action_condition: assoc of feature->value(s), optional. If specified, will condition the action set, which is the collection of cases that metrics will be computed upon.
   *       no value or (null) = select cases where that feature is (null)/missing
   *       - for continuous or numeric ordinal features:
   *         one value = must equal exactly the value or be close to it for fuzzy match
   *         two values = inclusive between, supports (null) on either side for less than/greater than conditions
   *         [(null) (null)] = select all non-null cases
   *       - for nominal or string ordinal features:
   *         n values = must match any of these values exactly
   *     action_condition_precision: optional string,  default is 'exact', used only with 'action_condition' parameter, will find exact matches if 'exact' and similar cases if 'similar'.
   *     action_num_samples: optional, limit on the number of action cases used in calculating conditional prediction stats. Works with or without 'action_condition_filter_query'.
   *       If 'action_condition' is set:
   *         If null, will be set to k if precision is "similar" or no limit if precision is "exact". default is null
   *       If 'action_condition' is not set:
   *         If null, will be set to the Howso default limit of 2000. default is null
   *     context_condition: assoc of feature->value(s), optional. If specified, will condition the context set, which is the collection of cases available in queries made to compute metrics.
   *       no value or (null) = select cases where that feature is (null)/missing
   *       - for continuous or numeric ordinal features:
   *         one value = must equal exactly the value or be close to it for fuzzy match
   *         two values = inclusive between, supports (null) on either side for less than/greater than conditions
   *         [(null) (null)] = select all non-null cases
   *       - for nominal or string ordinal features:
   *         n values = must match any of these values exactly
   *     context_condition_precision: optional string, default is 'exact'. Used only with 'context_condition' parameter, will find exact matches if 'exact' and similar cases if 'similar'.
   *     context_num_samples: optional, limit on the number of context cases when 'context_condition_precision' is set to 'similar'.
   *       If null, will be set to k. default is null
   *     value_robust_accuracy_contributions: optional, none/true/false.
   *       Perform a focused computation to determine how all the individual values of specified 'value_robust_contributions_features' affect the accuracy of 'value_robust_contributions_action_feature'.
   *       Outputs under 'value_robust_contributions'
   *     value_robust_prediction_contributions: optional, none/true/false.
   *       Perform a focused computation to determine how all the individual values of specified 'value_robust_contributions_features' affect the predictions  of 'value_robust_contributions_action_feature'.
   *       Outputs under 'value_robust_contributions'
   *     value_robust_surprisal_asymmetry: optional, none/true/false.
   *       Perform a focused computation to determine how all the individual values of specified 'value_robust_contributions_features' relationship with 'value_robust_contributions_action_feature'
   *       vary in terms of AC-surprisal asymmetry.
   *   )
   */
  details?: ReactAggregateDetails;

  /**
   * Optional list of features whose values should be derived rather than interpolated. If unspecified, then features with derivation
   * logic will automatically be chosen to be derived. Specifying an empty list will ensure no features are derived.
   */
  features_to_derive?: string[];

  /**
   * When computing feature influences such as prediction contributions or accuracy contributions, use this feature as the action feature.
   */
  feature_influences_action_feature?: string;

  /**
   * When specified and requesting prediction stats or full residuals, forecasts will be made this length and their accuracy will be evaluated.
   * Only continuous and nominal features can be evaluated in this manner.
   */
  forecast_window_length?: any;

  /**
   * A list of features that will not be ignored in the goal-biased sampling process. Specifically, when the cases ranked by how much they
   * optimize the goal, the features specified here will be included in the function to bias selection towards cases that maintain the values
   * of the originally sampled case.
   * @default []
   */
  goal_dependent_features?: string[];

  /**
   * Assoc of :
   *     { feature : { "goal" : "min"/"max", "value" : value }}
   *     A mapping of feature name to the goals for the feature, which will be used to bias the sampling of cases used to compute
   *     the desired metrics. A series of cases are sampled, the for each case it's most similar cases are found and the case that
   *     optimizes the goal is selected, building a collection of cases that are still randomly selected from the dataset with a bias
   *     towards the goal specified.
   *
   *     Valid keys in the map are:
   *     "goal": "min" or "max", will make a prediction while minimizing or maximizing the value for the feature or
   *     "value" : value, will make a prediction while approaching the specified value
   *   note: nominal features only support 'value', 'goal' is ignored.
   *       for non-nominals, if both are provided, only 'goal' is considered.
   * @default {}
   */
  goal_features_map?: Record<string, GoalFeatures>;

  /**
   * Full path for hyperparameters to use for computation.
   *   If specified for any residual computations, takes precendence over prediction_stats_action_feature and feature_influences_action_feature
   *   parameters for hyperparameter selection.
   */
  hyperparameter_param_path?: string[];

  /**
   * Total sample size of dataset to use (using sampling with replacement) for feature_robust_accuracy_contributions_permutation.
   *   Defaults to 300.
   */
  num_robust_accuracy_contributions_permutation_samples?: number;

  /**
   * Total sample size of dataset to use (using sampling with replacement) for feature_robust_accuracy_contributions,
   * estimated_residual_lower_bound and value_robust_accuracy_contributions.
   *   Defaults to the smaller of 150000 or (6321 * num_context_features), for value robust contribution flows defaults to 100000.
   */
  num_robust_accuracy_contributions_samples?: number;

  /**
   * Total sample size of dataset to use (using sampling with replacement) for feature_robust_prediction_contributions.
   *   Defaults to 300.
   */
  num_robust_prediction_contributions_samples?: number;

  /**
   * Specifies the number of robust samples to use for each case for feature_robust_prediction_contributions.
   *   Defaults to 300 + 2 * (number of features).
   */
  num_robust_prediction_contributions_samples_per_case?: number;

  /**
   * Total sample size of dataset to use (using sampling with replacement) for feature_robust_residuals.
   *   Defaults to 1000 * (1 + log(number of features)).
   */
  num_robust_residual_samples?: number;

  /**
   * Total sample size of dataset to use (using sampling with replacement) for all non-robust computation.
   *   Defaults to 1000. If specified overrides sample_model_fraction.
   */
  num_samples?: number;

  /**
   * When calculating residuals and prediction stats, uses this target features's hyperparameters. The trainee should have been analyzed
   *    with this feature as the action feature first. If "prediction_stats_action_feature" is not provided, residuals and prediction
   *   stats uses "targetless" hyperparameters.
   */
  prediction_stats_action_feature?: string;

  /**
   * Flag, optional. if specified, will attempt to return stats that were computed using hyperparameters with the
   *   specified robust or non-robust type.
   */
  robust_hyperparameters?: boolean;

  /**
   * Value 0.0 - 1.0, percent of dataset to use in sampling (using sampling without replacement).
   *   Applicable only to non-robust computation. Ignored if num_samples is specified.
   */
  sample_model_fraction?: number;

  /**
   * If specified will calculate only on a sub trainee of the specified size from the full trainee.
   *   Applicable only to datasets > 1000 cases.
   */
  sub_model_size?: number;

  /**
   * Flag, if set to true will scale influence weights by each case's weight_feature weight. If unspecified,
   *   case weights will be used if the trainee has them.
   */
  use_case_weights?: UseCaseWeights;

  /**
   * Action feature being predicted whose accuracy and prediction affects should be computed by 'value_robust_contributions_features'
   * when computing any of the "value_*" details.
   */
  value_robust_contributions_action_feature?: string;

  /**
   * Features for which to determine decompose values into buckets when using any of the "value_*" details which predict the
   * specified 'value_robust_contributions_action_feature'
   */
  value_robust_contributions_features?: string[];

  /**
   * The minimum number of samples necessary to report a metric value for a combination of feature values when computing any of the values
   * details.
   * @default 15
   */
  value_robust_contributions_min_samples?: number;

  /**
   * Number of maximum buckets to bin continuous values into when using any of the "value_*" details, defaults to 30 when unspecified
   * @default 30
   */
  value_robust_contributions_num_buckets?: number;

  /**
   * Name of feature whose values to use as case weights
   *   "generate_attempts" true or false. If true, outputs the total number of attempts to generate the unique case. Only applicable for generative
   *   reacts where generate_new_cases is "always" or "attempt". When used with ReactSeries, "series_generate_attempts" is also returned.
   * @default ".case_weight"
   */
  weight_feature?: string;
};

/** Response of the Trainee method: reactAggregate. */
export type ReactAggregateResponse = {
  /**
   * The accuracy of predicting each feature.
   */
  accuracy?: Record<string, number | null>;
  /**
   * The symmetric mean absolute percentage error with added the min gap / 2 to the actual and predicted values for each feature.
   */
  adjusted_smape?: Record<string, number | null>;
  /**
   * The confusion matrix for each feature.
   */
  confusion_matrix?: Record<string, ConfusionMatrix>;
  /**
   * The estimated lower bound values for residuals for the specified action features.
   */
  estimated_residual_lower_bound?: Record<string, number | null>;
  /**
   * The mean absolute error of predicting each feature using the full set of context features and the feature being predicted as context.
   */
  feature_deviations?: Record<string, number | null>;
  /**
   * The Accuracy Contribution in predicting the specified action feature without each feature versus with each feature while using full set of remaining context features.
   */
  feature_full_accuracy_contributions?: Record<string, number | null>;
  /**
   * The Accuracy Contribution in predicting the specified action feature using scrambled values for each feature versus non-scrambled values for each feature while using the full set of remaining context features.
   */
  feature_full_accuracy_contributions_permutation?: Record<string, number | null>;
  /**
   * The mean difference of predicting the specified action feature with and without each feature while using the full set of remaining context features.
   */
  feature_full_directional_prediction_contributions?: Record<string, number | null>;
  /**
   * The mean absolute difference of predicting the specified action feature with and without each feature while using the full set of remaining context features.
   */
  feature_full_prediction_contributions?: Record<string, number | null>;
  /**
   * The mean absolute error of predicting each feature using the full set of context features.
   */
  feature_full_residuals?: Record<string, number | null>;
  /**
   * The Accuracy Contribution in predicting the specified action feature without each feature versus with each feature while using samples from the power-set of remaining context features.
   */
  feature_robust_accuracy_contributions?: Record<string, FeatureMetricIndex>;
  /**
   * The Accuracy Contribution in predicting the specified action feature using scrambled values for each feature versus non-scrambled values for each feature while using samples from the power-set of remaining context features.
   */
  feature_robust_accuracy_contributions_permutation?: Record<string, number | null>;
  /**
   * The mean difference of predicting the specified action feature with and without each feature while using samples from the power-set of remaining context features.
   */
  feature_robust_directional_prediction_contributions?: Record<string, number | null>;
  /**
   * The mean absolute difference of predicting the specified action feature with and without each feature while using samples from the power-set of remaining context features.
   */
  feature_robust_prediction_contributions?: Record<string, number | null>;
  /**
   * The mean absolute error of predicting each feature using samples from the power-set of context features.
   */
  feature_robust_residuals?: Record<string, number | null>;
  /**
   * The mean absolute error of predicting each feature.
   */
  mae?: Record<string, number | null>;
  /**
   * The MCC of predicting each feature.
   */
  mcc?: Record<string, number | null>;
  /**
   * The average estimated missing information for each feature.
   */
  missing_information?: Record<string, number | null>;
  /**
   * The proportion of missing values that were correctly predicted as missing for each feature.
   */
  missing_value_accuracy?: Record<string, number | null>;
  /**
   * The precision of predicting each feature.
   */
  precision?: Record<string, number | null>;
  /**
   * The R^2 of predicting each feature.
   */
  r2?: Record<string, number | null>;
  /**
   * The recall of predicting each feature.
   */
  recall?: Record<string, number | null>;
  /**
   * Map of feature names to list of relevant values for the cases sampled.
   */
  relevant_values?: Record<string, any>;
  /**
   * The RMSE of predicting each feature.
   */
  rmse?: Record<string, number | null>;
  /**
   * The symmetric mean absolute percentage error of predicting each feature.
   */
  smape?: Record<string, number | null>;
  /**
   * The Spearman's coefficient of predicting each feature.
   */
  spearman_coeff?: Record<string, number | null>;
  /**
   * Aggregated lists of specific feature values and their corresponding accuracy/prediction contributions.
   */
  value_robust_contributions?: {
    /**
     * A list of corresponding accuracy contribution values to the list of specific feature values.
     */
    ac_values?: number[];
    /**
     * The list of specified 'value_robust_contributions_features'.
     */
    features?: string[];
    /**
     * The list of all encountered unique feature value combinations, values ordered by 'value_robust_contributions_features'.
     */
    feature_values?: any[][];
    /**
     * A list of corresponding directional prediction contribution values to the list of specific feature values.
     */
    pc_directional_values?: number[];
    /**
     * A list of corresponding prediction contribution values to the list of specific feature values.
     */
    pc_values?: number[];
  };
  /**
   * Aggregated lists of specific feature values and their corresponding surprisal asymmetries.
   */
  value_robust_surprisal_asymmetry?: {
    /**
     * The list of specified 'value_robust_contributions_features'.
     */
    features?: string[];
    /**
     * The list of all encountered unique feature value combinations, values ordered by 'value_robust_contributions_features'.
     */
    feature_values?: any[][];
    /**
     * A list of corresponding surprisal asymmetry values to the list of specific feature values.
     */
    surprisal_asymmetries?: number[];
  };
};
