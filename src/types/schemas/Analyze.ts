/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * Analyze
 *
 * Analyzes the data to compute the appropriate statistics, uncertainties, and select parameters as appropriate.
 */
import type { UseCaseWeights } from "./UseCaseWeights";

/** Request parameters of the Trainee method: analyze. */
export type AnalyzeRequest = {
  /**
   * List of action features to analyze for. applicable only to 'single_targeted' mode
   * @default []
   */
  action_features?: string[];

  /**
   * Number of samples to use for analysis. the rest will be randomly held-out and not included in calculations
   */
  analysis_sub_model_size?: number;

  /**
   * Flag, if set to true will skip the computation of feature residuals
   * @default false
   */
  bypass_calculate_feature_residuals?: boolean;

  /**
   * Flag, if set to true will skip the computation of feature weights
   * @default false
   */
  bypass_calculate_feature_weights?: boolean;

  /**
   * Flag, if true will not do any search over k, p, and dt parameters, but still may compute feature residuals
   *  depending on other parameters.
   * @default false
   */
  bypass_hyperparameter_analysis?: boolean;

  /**
   * List of context features to analyze
   * @default []
   */
  context_features?: string[];

  /**
   * The minumum size of the first batch of cases used when dynamically sampling robust residuals used to determine feature probabilities
   *   Default of 5000
   * @default 5000
   */
  convergence_min_size?: number;

  /**
   * Rate of increasing the size of each subsequent sample used to dynamically limit the total number of samples used to determine feature probabilities.
   * defaults to a rate of 1.05, increasing by 5% until the delta between residuals is less than 'convergence_threshold'.
   * @default 1.05
   */
  convergence_samples_growth_rate?: number;

  /**
   * Percent threshold used to dynamically limit the number of samples used to determine feature probabilities, defaults to 0.5%
   * When set to 0 will use all num_feature_probability_samples
   * @default 0.005
   */
  convergence_threshold?: number;

  /**
   * List of values for dt (the distance transform) to grid search during analysis
   */
  dt_values?: (number | string)[];

  /**
   * The number of cases to store within the subtrainee that is used to the deviations of the data around predictions
   * @default 500
   */
  dynamic_deviations_subtrainee_size?: number;

  /**
   * Number of cross validation folds to do. value of 1 does hold-one-out instead of k-fold
   * @default 1
   */
  k_folds?: number;

  /**
   * List of values for k (number of cases making up the local space) to grid search during analysis
   * if a value is a list of values, treats the inner list as a tuple of: influence cutoff percentage, min K, max K and extra K.
   */
  k_values?: (number | any[])[];

  /**
   * Number of cases to sample used for grid search for the targeted flow. only applies for k_folds = 1. defaults to 1000.
   */
  num_analysis_samples?: number;

  /**
   * Number of cases to use to approximate deviations and residuals for both targetless and targeted flows.
   * defaults to 1000 if unspecified.
   */
  num_deviation_samples?: number;

  /**
   * Number of samples to use to compute feature probabilities, only applies to targetless flow.
   * If unspecified will be dynamically set based on number features and data characteristics.
   */
  num_feature_probability_samples?: number;

  /**
   * List of values for p (the parameter of the Lebesgue space) to grid search during analysis
   */
  p_values?: number[];

  /**
   * List of features whose values to use to rebalance case weighting of the data and to store into weight_feature
   */
  rebalance_features?: string[];

  /**
   * Enumeration, default is "single_targeted"
   *    "single_targeted" = analyze hyperparameters for the specified action_features
   *    "omni_targeted" = analyze hyperparameters for each action feature, using all other features as context_features. if action_features aren't specified, uses all context_features.
   *    "targetless" = analyze hyperparameters for all context features as possible action features, ignores action_features parameter
   * @default "single_targeted"
   */
  targeted_model?: "omni_targeted" | "single_targeted" | "targetless";

  /**
   * When true will scale influence weights by each case's weight_feature weight. if use_case_weights isn't specified, it will
   *   be true if auto ablation is enabled and false otherwise
   */
  use_case_weights?: UseCaseWeights;

  /**
   * Whether to use deviations for LK metric in queries. When true forces the use
   *   of deviations, when false will not use deviations. If unspecified, the better performing option will be selected.
   */
  use_deviations?: boolean | null;

  /**
   * When true, a subtrainee will be created that will be used during queries to approximate deviations of the data around the query.
   *  This incurs a penalty in speed, but can improve performance in long tailed data, especially when using targetless parameters.
   * @default false
   */
  use_dynamic_deviations?: boolean;

  /**
   * When true, the default, will compute and use a sparse deviation matrix (SDM) for each nominal feature in all similarity queries.
   * Enabling SDM will typically incur a small to moderate penalty on speed when using nominal features in inference in exchange for
   * yielding higher quality inference. The magnitude of the changes are dependent on relationships among the data and the task at hand.
   * @default true
   */
  use_sdm?: boolean;

  /**
   * Name of feature whose values to use as case weights
   * @default ".case_weight"
   */
  weight_feature?: string;
};
