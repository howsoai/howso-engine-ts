/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * GetAutoAblationParams
 *
 * Get auto-ablation parameters set by #set_auto_ablation_params
 */
import type { AblationThresholdMap } from "./AblationThresholdMap";

export type GetAutoAblationParamsResponse = {
  /**
   * The absolute threshold map set by set_auto_ablation_params, if any.
   */
  abs_threshold_map?: AblationThresholdMap;
  /**
   * Flag indicating if automatic ablation is enabled.
   */
  auto_ablation_enabled?: boolean;
  /**
   * The name of the weight feature which is accumulated and used in automatic ablation.
   */
  auto_ablation_weight_feature?: string;
  /**
   * The conviction threshold above which cases will be ablated.
   */
  conviction_lower_threshold?: number;
  /**
   * The conviction threshold below which cases will be ablated.
   */
  conviction_upper_threshold?: number;
  /**
   * The delta threshold map set by set_auto_ablation_params, if any.
   */
  delta_threshold_map?: AblationThresholdMap;
  /**
   * The list of features that if predicted correctly on a new case will trigger the ablation of the case.
   */
  exact_prediction_features?: string[];
  /**
   * The minimum threshold of influence weight entropy for a case to be ablated in the process of automatic ablation.
   */
  influence_weight_entropy_threshold?: number;
  /**
   * The minimum number of cases to train before automatic ablation begins.
   */
  minimum_num_cases?: number;
  /**
   * The map of features to relative thresholds that if predicted within on a new case will trigger the ablation of the case.
   */
  relative_prediction_threshold_map?: Record<string, number>;
  /**
   * The relative threshold map set by set_auto_ablation_params, if any.
   */
  rel_threshold_map?: AblationThresholdMap;
  /**
   * The list of features that if predicted within their residual on a new case will trigger the ablation of the case.
   */
  residual_prediction_features?: string[];
  /**
   * The map of features to absolute thresholds that if predicted within on a new case will trigger the ablation of the case.
   */
  tolerance_prediction_threshold_map?: Record<string, number>;
};
