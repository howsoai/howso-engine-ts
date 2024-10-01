/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * ReduceData
 *
 * Reduce the trained data by removing cases which have an influence weight entropy that falls above
 *  a threshold.
 */

export type ReduceDataRequest = {
  /*
   * Name of feature whose values to use as case weights, defaults to ".case_weight"
   * @default "!autoAblationWeightFeature"
   */
  distribute_weight_feature?: string;

  /*
   * List of features to use when computing influence weight entropies, defaults to all trained features
   * @default "!trainedFeatures"
   */
  features?: string[];

  /*
   * Numeric maximum threshold for influence weight entropy of cases to keep, defaults to the value
   *  influence weight entropy threshold stored within the trainee
   * @default "!autoAblationInfluenceWeightEntropyThreshold"
   */
  influence_weight_entropy_threshold?: number;

  /*
   * Skip auto analyzing as cases are removed
   * @default false
   */
  skip_auto_analyze?: boolean;
};
