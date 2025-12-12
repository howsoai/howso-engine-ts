/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 */
import type { FeatureMetricIndex } from "./FeatureMetricIndex";

/**
 * A map containing the parameters used in the derivation of a reaction.
 */
export type DerivationParameters = {
  /**
   * The distance transform used to convert the distance to influence weight.
   */
  distance_transform?: number | "surprisal_to_prob";
  /**
   * A map of feature names to feature deviations. Values and their shape depend on the properties of the feature.
   */
  feature_deviations?: Record<string, any>;
  /**
   * A map of feature names to feature weights.
   */
  feature_weights?: FeatureMetricIndex;
  /**
   * The number of most similar cases used to make the prediction.
   */
  k?: number | any[];
  /**
   * A map of nominal feature names to the number of unique classes for each feature.
   */
  nominal_class_counts?: FeatureMetricIndex;
  /**
   * The parameter of the Lebesgue space used in the Minkowski distance.
   */
  p?: number;
  /**
   * Flag indicating if parameters were derived using a targetless approach.
   */
  targetless?: boolean;
};
