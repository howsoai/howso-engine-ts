/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * ReactIntoFeatures
 *
 * Computes various data, such as familiarity convictions and distance contribution for each case in the dataset and stores them into specified features.
 *  After this method is called, if "similarity_conviction" or "distance_contribution" are selected, then they may be used as `derived_context_features`
 *  in `react` under the same feature name specified in this method.
 */
import type { UseCaseWeights } from "./UseCaseWeights";

/** Request parameters of the Trainee method: reactIntoFeatures. */
export type ReactIntoFeaturesRequest = {
  /**
   * Flag, if set to true, will enable auto_analyze and analyze with these specified features computing their values.
   *    Only applicable when reacting for the entire dataset,  when case_ids is null.
   */
  analyze?: boolean;

  /**
   * The list of case ids for the dataset to calculate conviction for
   */
  case_ids?: (string | number)[][];

  /**
   * True or string, if true will use the default value of ".cluster_id" for feature name for clustering.
   * will additionally compute and store distance contributions and similarity convictions while respecting the overwrite flag.
   */
  clustering?: boolean | string;

  /**
   * Similarity conviction threshold of cases considered for expansion of a cluster, only cases with similarity conviction
   * equal to or greater than this value will be considered to be clustered in the same cluster as their neighbors.
   * @default 0.5
   */
  clustering_expansion_threshold?: number;

  /**
   * The initially unclustered candidate cases' distance contribution needs to be less than this value times the
   * max distance contribution from their nearest cluster to be included in that cluster.
   * @default 1.5
   */
  clustering_inclusion_relative_threshold?: number;

  /**
   * True or string, if true will use default value of "distance_contribution" for feature name
   */
  distance_contribution?: boolean | string;

  /**
   * True or string, if true will use default value of "familiarity_conviction_addition" for feature name
   */
  familiarity_conviction_addition?: boolean | string;

  /**
   * True or string, if true will use default value of "familiarity_conviction_removal" for feature name
   */
  familiarity_conviction_removal?: boolean | string;

  /**
   * List of features used to do all the computations, will default to trainee's default features if unspecified
   */
  features?: string[];

  /**
   * True or string, if true will use default value of "influence_weight_entropy"
   */
  influence_weight_entropy?: boolean | string;

  /**
   * If true will forcibly recompute and overwrite previously stored values.  Default is false, will error out if trying to
   * react_into_features for a feature that already exists.
   * @default false
   */
  overwrite?: boolean;

  /**
   * True or string, default is false. if true will use default value of 'p_value_of_addition' for feature name
   */
  p_value_of_addition?: boolean | string;

  /**
   * True or string, default is false. if true will use default value of 'p_value_of_removal' for feature name
   */
  p_value_of_removal?: boolean | string;

  /**
   * True or string, if true will use default value of "similarity_conviction" for feature name. If computing
   * similarity condition for the entire dataset, then distance contribution will also be computed and stored
   * if it is not already stored as feature. If overwite is true, then DC will be computed and overwritten.
   */
  similarity_conviction?: boolean | string;

  /**
   * Flag, if set to true will scale influence weights by each case's weight_feature weight. If unspecified,
   *   case weights will be used if the trainee has them.
   */
  use_case_weights?: UseCaseWeights;

  /**
   * Name of feature whose values to use as case weights
   * @default ".case_weight"
   */
  weight_feature?: string;
};
