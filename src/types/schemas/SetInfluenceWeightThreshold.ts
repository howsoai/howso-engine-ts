/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * SetInfluenceWeightThreshold
 *
 * Set the influence weight threshold for outputting only the K neighbors whose influence weight is <= to this threshold
 * default value is 0.99
 */

/** Request parameters of the Trainee method: setInfluenceWeightThreshold. */
export type SetInfluenceWeightThresholdRequest = {
  /**
   * Number, amount of total influence weight to accumulate among nearest
   * neighbors before stopping (for influential cases)
   * @default 0.99
   */
  influence_weight_threshold?: number;
};
