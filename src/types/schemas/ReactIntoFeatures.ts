/**
 * ReactIntoFeatures
 *
 * Computes various data, such as familiarity convictions and distance contribution for each case in the model and stores them into specified features.
 *
 *
 * NOTE: This file is auto generated, do not modify manually.
 */

export type ReactIntoFeaturesRequest = {
  /*
   * The list of case ids for the model to calculate conviction for
   */
  case_ids?: (string | number)[][];

  /*
   * True or string, if true will use default value of "distance_contribution" for feature name
   */
  distance_contribution?: boolean | string;

  /*
   * True or string, if true will use default value of "familiarity_conviction_addition" for feature name
   */
  familiarity_conviction_addition?: boolean | string;

  /*
   * True or string, if true will use default value of "familiarity_conviction_removal" for feature name
   */
  familiarity_conviction_removal?: boolean | string;

  /*
   * List of features for which to calculate conviction, will default to trainee's default features if unspecified
   */
  features?: string[];

  /*
   * True or string, if true will use default value of "influence_weight_entropy"
   */
  influence_weight_entropy?: boolean | string;

  /*
   * True or string, default is false. if true will use default value of 'p_value_of_addition' for feature name
   */
  p_value_of_addition?: boolean | string;

  /*
   * True or string, default is false. if true will use default value of 'p_value_of_removal' for feature name
   */
  p_value_of_removal?: boolean | string;

  /*
   * True or string, if true will use default value of "similarity_conviction" for feature name
   */
  similarity_conviction?: boolean | string;

  /*
   * Flag, if set to true will scale influence weights by each case's weight_feature weight. if unspecified,
   *   case weights will be used if the trainee has them.
   */
  use_case_weights?: boolean;

  /*
   * Name of feature whose values to use as case weights
   * @default ".case_weight"
   */
  weight_feature?: string;
};
