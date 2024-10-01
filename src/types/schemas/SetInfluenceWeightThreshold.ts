/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * SetInfluenceWeightThreshold
 *
 * Set the influence weight threshold for outputting only the k neighbors whose influence weight is <= to this threshold
 * default value is 0.99
 */

export type SetInfluenceWeightThresholdRequest = {
  /*
   * Number, amount of total influence weight to accumulate among nearest
   * neighbors before stopping (for influential cases)
   * @default 0.99
   */
  influence_weight_threshold?: number;
};
