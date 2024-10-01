/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * SetAutoAblationParams
 *
 * Sets the model to auto-ablate by tracking its size and training certain cases as weights
 */

export type SetAutoAblationParamsRequest = {
  /*
   * The number of ablated cases to compute influence weights for distribution at a time
   * @default 100
   */
  ablated_cases_distribution_batch_size?: number;

  /*
   * Flag, default is false. when true, any enabled ablation techniques will be run at during training.
   * @default false
   */
  auto_ablation_enabled?: boolean;

  /*
   * The weight feature that should be used when ablating.
   * @default ".case_weight"
   */
  auto_ablation_weight_feature?: string;

  /*
   * The number of cases to ablate between analyses and influence weight entropy recalculation
   * @default 2000
   */
  batch_size?: number;

  /*
   * The conviction value above which cases will be ablated
   */
  conviction_lower_threshold?: number;

  /*
   * The conviction value below which cases will be ablated
   */
  conviction_upper_threshold?: number;

  /*
   * List of features. for each of the features specified, will ablate a case if the prediction
   *   matches exactly.
   */
  exact_prediction_features?: string[];

  /*
   * The influence weight entropy quantile that a case must be beneath in order to be trained.
   *   default of 0.6.
   * @default 0.15
   */
  influence_weight_entropy_threshold?: number;

  /*
   * Stores the threshold for the minimum number of cases at which the model should auto-ablate.
   *   default of 1000.
   * @default 1000
   */
  minimum_model_size?: number;

  /*
   * Assoc of feature -> percent. for each of the features specified, will
   *   ablate a case if abs(prediction - case value) / prediction <= percent
   */
  relative_prediction_threshold_map?: Record<string, number>;

  /*
   * List of features. for each of the features specified, will ablate a case if
   *   abs(prediction - case value) <= feature residual
   */
  residual_prediction_features?: string[];

  /*
   * Assoc of feature -> [min, max]. for each of the features specified, will
   *   ablate a case if the prediction >= (case value - min) and the prediction <= (case value + max)
   */
  tolerance_prediction_threshold_map?: Record<string, any[]>;
};
