/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * DistanceRatioParts
 */

/**
 * Map containing the two terms that are used to compute the distance ratio.
 */
export type DistanceRatioParts = {
  /**
   * The minimum distance between any two cases among the case's most similar trained cases.
   */
  local_distance_contribution?: number;
  /**
   * The distance from the case to its most similar trained case.
   */
  nearest_distance?: number;
};
