/**
 * Analyze
 *
 * Analyzes the data to compute the appropriate statistics, uncertainties, and select parameters as appropriate.
 * {long_running (true) idempotent (false)}
 *
 * NOTE: This file is auto generated, do not modify manually.
 */

export type AnalyzeRequest = {
  /*
   * List of action features to analyze for. applicable only to 'single_targeted' mode
   * @default []
   */
  action_features?: string[];

  /*
   * Number of samples to use for analysis. the rest will be randomly held-out and not included in calculations
   */
  analysis_sub_model_size?: number;

  /*
   * Flag, if set to true will skip the computation of feature residuals
   */
  bypass_calculate_feature_residuals?: boolean;

  /*
   * Flag, if set to true will skip the computation of feature weights
   */
  bypass_calculate_feature_weights?: boolean;

  /*
   * Flag, if true will not do any search over k, p, and dt parameters, but still may compute feature residuals
   *  depending on other parameters.
   */
  bypass_hyperparameter_analysis?: boolean;

  /*
   * List of context features to analyze
   * @default []
   */
  context_features?: string[];

  /*
   * List of values for dt (the distance transform) to grid search during analysis
   */
  dt_values?: number[];

  /*
   * Whether to use inverse residuals as feature weights. if unspecified, inverse residuals will be used as weights for
   *  targetless params, otherwise this method will not be used.
   */
  inverse_residuals_as_weights?: boolean;

  /*
   * Number of cross validation folds to do. value of 1 does hold-one-out instead of k-fold
   * @default 1
   */
  k_folds?: number;

  /*
   * List of values for k (the number of cases making up a local model) to grid search during analysis
   */
  k_values?: number[];

  /*
   * Number of cases to sample during analysis. only applies for k_folds = 1
   */
  num_analysis_samples?: number;

  /*
   * Number of cases to use to approximate residuals
   */
  num_samples?: number;

  /*
   * List of values for p (the parameter of the lebesgue space) to grid search during analysis
   */
  p_values?: number[];

  /*
   * Enumeration, default is "single_targeted"
   *    "single_targeted" = analyze hyperparameters for the specified action_features
   *    "omni_targeted" = analyze hyperparameters for each action feature, using all other features as context_features. if action_features aren't specified, uses all context_features.
   *    "targetless" = analyze hyperparameters for all context features as possible action features, ignores action_features parameter
   * @default "single_targeted"
   */
  targeted_model?: "single_targeted" | "omni_targeted" | "targetless";

  /*
   * When true will scale influence weights by each case's weight_feature weight. if use_case_weights isn't specified, it will
   *   be true if auto ablation is enabled and false otherwise
   */
  use_case_weights?: boolean;

  /*
   * Whether to use deviations for lk metric in queries. when true forces the use
   *   of deviations, when false will not use deviations. if unspecified, the better performing option will be selected.
   */
  use_deviations?: boolean;

  /*
   * Name of feature whose values to use as case weights
   * @default ".case_weight"
   */
  weight_feature?: string;
};