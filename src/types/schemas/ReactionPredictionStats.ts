/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * ReactionPredictionStats
 */
import type { ConfusionMatrix } from "./ConfusionMatrix";
import type { FeatureMetricIndex } from "./FeatureMetricIndex";

/**
 * A map of prediction statistic names to maps of feature names to the computed values for each statistic.
 */
export type ReactionPredictionStats = {
  accuracy?: FeatureMetricIndex;
  adjusted_smape?: FeatureMetricIndex;
  confusion_matrix?: Record<string, ConfusionMatrix>;
  mae?: FeatureMetricIndex;
  mcc?: FeatureMetricIndex;
  missing_value_accuracy?: FeatureMetricIndex;
  precision?: FeatureMetricIndex;
  r2?: FeatureMetricIndex;
  recall?: FeatureMetricIndex;
  rmse?: FeatureMetricIndex;
  smape?: FeatureMetricIndex;
  spearman_coeff?: FeatureMetricIndex;
};
