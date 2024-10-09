/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * ConfusionMatrixMap
 */

/**
 * The confusion matrix in the form of maps from actual classes to maps of predicted classes to frequencies alongside counts for insignficant predictions.
 */
export type ConfusionMatrixMap = {
  /**
   * Total number of correct predictions for classes that were not statistically significant.
   */
  leftover_correct?: number | null;
  /**
   * Total number of incorrect predictions for classes with any correct but statistically insignificant predictions.
   */
  leftover_incorrect?: number | null;
  /**
   * A map of actual values to map of predicted values to counts.
   */
  matrix?: Record<string, Record<string, number | null>>;
  /**
   * Total number of all other statistically insignificant predictions.
   */
  other_counts?: Record<string, any> | number | null;
};
