/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * ReactGroup
 *
 * Computes the convictions of an average case for each given hypothetical set of cases specified
 *  output an assoc react key -> list of corresponding values from each individual group.
 *  example output for 2 groups:
 *  (assoc
 *    "base_model_average_distance_contribution" (list 4.0 4.1)
 *   "combined_model_average_distance_contribution" (list 4.05 3.9)
 *   "distance_contributions" (list 4.5 3.2)
 *  )
 */
import type { UseCaseWeights } from "./UseCaseWeights";

export type ReactGroupRequest = {
  /**
   * Calculate and output distance contribution ratios in the output assoc
   * @default false
   */
  distance_contributions?: boolean;

  /**
   * Calculate and output familiarity conviction of adding the specified new_cases in the output assoc
   * @default true
   */
  familiarity_conviction_addition?: boolean;

  /**
   * Calculate and output familiarity conviction of removing the specified new_cases in the output assoc
   * @default false
   */
  familiarity_conviction_removal?: boolean;

  /**
   * List of feature names
   * @default []
   */
  features?: string[];

  /**
   * Calculate and output the KL divergence of adding the specified new_cases in the output assoc
   * @default false
   */
  kl_divergence_addition?: boolean;

  /**
   * Calculate and output the KL divergence of removing the specified new_cases in the output assoc
   * @default false
   */
  kl_divergence_removal?: boolean;

  /**
   * A list of lists of lists of values corresponding to a list of sets of feature values, where the values are ordered corresponding to
   *   the features
   */
  new_cases: any[][][];

  /**
   * If true will output p value of addition
   * @default false
   */
  p_value_of_addition?: boolean;

  /**
   * If true will output p value of removal
   * @default false
   */
  p_value_of_removal?: boolean;

  /**
   * Flag, if set to true will scale influence weights by each case's weight_feature weight.
   *    If a weight is missing, uses 1 as the weight. If unspecified, case weights will be used if the trainee has them.
   */
  use_case_weights?: UseCaseWeights;

  /**
   * Name of feature whose values to use as case weights
   * @default ".case_weight"
   */
  weight_feature?: string;
};

export type ReactGroupResponse = {
  /**
   * The average distance contribution of cases in the model.
   */
  base_model_average_distance_contribution?: number[];
  /**
   * The average distance contribution of cases in the model and the cases of each group.
   */
  combined_model_average_distance_contribution?: number[];
  /**
   * The average distance contributions of cases in each group.
   */
  distance_contribution?: number[];
  /**
   * The familiarity conviction of adding each group of cases to the model.
   */
  familiarity_conviction_addition?: number[];
  /**
   * The familiarity conviction of removing each group of cases to the model.
   */
  familiarity_conviction_removal?: number[];
  /**
   * The KL divergence of adding each group of cases to the model.
   */
  kl_divergence_addition?: number[];
  /**
   * The KL divergence of removing each group of cases to the model.
   */
  kl_divergence_removal?: number[];
  /**
   * The P-value of adding each group of cases to the model.
   */
  p_value_of_addition?: number[];
  /**
   * The P-value of removing each group of cases to the model.
   */
  p_value_of_removal?: number[];
};
