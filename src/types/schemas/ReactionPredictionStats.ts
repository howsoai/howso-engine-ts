/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * ReactionPredictionStats
 */
import type { ConfusionMatrixMap } from "./ConfusionMatrixMap";
import type { FeatureValueMap } from "./FeatureValueMap";

/**
 * A map of prediction statistic names to maps of feature names to the computed values for each statistic.
 */
export type ReactionPredictionStats = {
  accuracy?: FeatureValueMap;
  adjusted_smape?: FeatureValueMap;
  confusion_matrix?: Record<string, ConfusionMatrixMap>;
  mae?: FeatureValueMap;
  mcc?: FeatureValueMap;
  missing_value_accuracy?: FeatureValueMap;
  precision?: FeatureValueMap;
  r2?: FeatureValueMap;
  recall?: FeatureValueMap;
  rmse?: FeatureValueMap;
  smape?: FeatureValueMap;
  spearman_coeff?: FeatureValueMap;
};
