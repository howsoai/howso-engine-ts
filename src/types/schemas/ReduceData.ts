/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * ReduceData
 *
 * Reduce the trained data by removing cases which have an influence weight entropy that falls above
 *  a threshold.
 */
import type { AblationThresholdMap } from "./AblationThresholdMap";

export type ReduceDataRequest = {
  /**
   * A map of measure names (any of the prediction stats) to a map of feature names to threshold value.
   *  absolute thresholds will cause data reduction to stop when any of the measure values for any of
   *  the features for which a threshold is defined go avove the threshold (in the case of rmse and
   *  mae) or below the threshold (otherwise).
   * @default {}
   */
  abs_threshold_map?: AblationThresholdMap;

  /**
   * The number of cases to ablate between analyses and influence weight entropy recalculation
   * @default 2000
   */
  batch_size?: number;

  /**
   * A map of measure names (any of the prediction stats) to a map of feature names to threshold value.
   *  delta thresholds will cause data reduction to stop when the delta between any of the measure values
   *  for any of the features for which a threshold is defined and its previous value go avove the threshold
   *  (in the case of rmse and mae) or below the threshold (otherwise).
   * @default {}
   */
  delta_threshold_map?: AblationThresholdMap;

  /**
   * Name of feature whose values to use as case weights, defaults to ".case_weight"
   * @default ".case_weight"
   */
  distribute_weight_feature?: string;

  /**
   * List of features to use when computing influence weight entropies, defaults to all trained features
   * @default []
   */
  features?: string[];

  /**
   * Numeric maximum threshold for influence weight entropy of cases to keep, defaults to the value
   *  influence weight entropy threshold stored within the Trainee
   * @default 0.15
   */
  influence_weight_entropy_threshold?: number;

  /**
   * A map of measure names (any of the prediction stats) to a map of feature names to threshold value.
   *  relative thresholds will cause data reduction to stop when the relative change between any of the
   *  measure values for any of the features for which a threshold is defined and its previous value go
   *  avove the threshold (in the case of rmse and mae) or below the threshold (otherwise).
   * @default {}
   */
  rel_threshold_map?: AblationThresholdMap;

  /**
   * Skip auto analyzing as cases are removed
   * @default false
   */
  skip_auto_analyze?: boolean;
};
