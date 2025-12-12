/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * SetAutoAblationParams
 *
 * Sets the dataset to auto-ablate by tracking its size and training certain cases as weights
 */
import type { AblationThresholdMap } from "./AblationThresholdMap";

/** Request parameters of the Trainee method: setAutoAblationParams. */
export type SetAutoAblationParamsRequest = {
  /**
   * The number of ablated cases to compute influence weights for distribution at a time
   * @default 100
   */
  ablated_cases_distribution_batch_size?: number;

  /**
   * A map of measure names (any of the prediction stats) to a map of feature names to threshold value.
   *  absolute thresholds will cause ablation to stop when any of the measure values for any of
   *  the features for which a threshold is defined go above the threshold (in the case of rmse and
   *  mae) or below the threshold (otherwise).
   * @default {}
   */
  abs_threshold_map?: AblationThresholdMap;

  /**
   * Flag, default is false. when true, any enabled ablation techniques will be run at during training.
   * @default false
   */
  auto_ablation_enabled?: boolean;

  /**
   * The influence weight entropy quantile that a case must be beneath in order to be trained.
   *   default of 1/e^2.
   * @default 0.135335283
   */
  auto_ablation_influence_weight_entropy_threshold?: number;

  /**
   * The weight feature that should be used when ablating.
   * @default ".case_weight"
   */
  auto_ablation_weight_feature?: string;

  /**
   * The number of cases to ablate between analyses and influence weight entropy recalculation
   * @default 2000
   */
  batch_size?: number;

  /**
   * The conviction value above which cases will be ablated
   */
  conviction_lower_threshold?: number;

  /**
   * The conviction value below which cases will be ablated
   */
  conviction_upper_threshold?: number;

  /**
   * A map of measure names (any of the prediction stats) to a map of feature names to threshold value.
   *  delta thresholds will cause ablation to stop when the delta between any of the measure values
   *  for any of the features for which a threshold is defined and its previous value go above the threshold
   *  (in the case of rmse and mae) or below the threshold (otherwise).
   * @default {}
   */
  delta_threshold_map?: AblationThresholdMap;

  /**
   * List of features. for each of the features specified, will ablate a case if the prediction
   *   matches exactly.
   */
  exact_prediction_features?: string[];

  /**
   * Maximum number of cases to sample without replacement for computing the influence weight entropy threshold
   *  default of 2000
   * @default 2000
   */
  influence_weight_entropy_sample_size?: number;

  /**
   * Stores the threshold for the number of cases at which the dataset should automatically reduce data.
   *   default of 200,000.
   * @default 200000
   */
  max_num_cases?: number;

  /**
   * Stores the threshold for the minimum number of cases at which the dataset should auto-ablate.
   * This is also the minimum number of cases that calls to reduce_data will reduce the training data down to.
   *   default of 10000.
   * @default 10000
   */
  min_num_cases?: number;

  /**
   * The influence weight entropy quantile that a case must be beneath in order to not be removed.
   *   default of 1-1/e.
   * @default 0.632120559
   */
  reduce_data_influence_weight_entropy_threshold?: number;

  /**
   * Stores the maximum number of cases that may remain after a call to reduce_data.
   *   default of 50,000.
   * @default 50000
   */
  reduce_max_cases?: number;

  /**
   * Assoc of feature -> PERCENT. for each of the features specified, will
   *   ablate a case if abs(prediction - case value) / prediction <= PERCENT
   */
  relative_prediction_threshold_map?: Record<string, number>;

  /**
   * A map of measure names (any of the prediction stats) to a map of feature names to threshold value.
   *  relative thresholds will cause ablation to stop when the relative change between any of the
   *  measure values for any of the features for which a threshold is defined and its previous value go
   *  above the threshold (in the case of rmse and mae) or below the threshold (otherwise).
   * @default {}
   */
  rel_threshold_map?: AblationThresholdMap;

  /**
   * List of features. for each of the features specified, will ablate a case if
   *   abs(prediction - case value) <= feature residual
   */
  residual_prediction_features?: string[];

  /**
   * Assoc of feature -> [MIN, MAX]. for each of the features specified, will
   *   ablate a case if the prediction >= (case value - MIN) and the prediction <= (case value + MAX)
   */
  tolerance_prediction_threshold_map?: Record<string, any[]>;
};
