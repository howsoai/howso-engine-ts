/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * ReactGroup
 *
 * Computes the convictions of an average case for each given set of cases specified by either a list of
 * case indices, a condition, or given data.
 *  output an assoc react key -> list of corresponding values from each individual group.
 *  example output for 2 groups:
 *  (assoc
 *    "base_model_average_distance_contribution" (list 4.0 4.1)
 *   "combined_model_average_distance_contribution" (list 4.05 3.9)
 *   "distance_contributions" (list 4.5 3.2)
 *  )
 */
import type { CaseIndices } from "./CaseIndices";
import type { Cases } from "./Cases";
import type { CategoricalActionProbabilities } from "./CategoricalActionProbabilities";
import type { Condition } from "./Condition";
import type { FeatureMetricIndex } from "./FeatureMetricIndex";
import type { ReactGroupDetails } from "./ReactGroupDetails";
import type { UseCaseWeights } from "./UseCaseWeights";

/** Request parameters of the Trainee method: reactGroup. */
export type ReactGroupRequest = {
  /**
   * List of feature names to predict the values of for each group
   * @default []
   */
  action_features?: string[];

  /**
   * A list of lists of tuples containing the session id and index that uniquely select trained cases. Each outer sublist makes a list of case indices
   * that define a group of trained cases to react to.
   */
  case_indices?: CaseIndices[];

  /**
   * A list of assocs defining conditions that each select a collection of cases to react to.
   */
  conditions?: Condition[];

  /**
   * An assoc declaring the details requested by the user.
   * @default {}
   */
  details?: ReactGroupDetails;

  /**
   * Calculate and output distance contribution ratios in the output assoc
   * @default false
   */
  distance_contributions?: boolean;

  /**
   * Calculate and output familiarity conviction of adding the specified new_cases in the output assoc
   * @default false
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
  new_cases?: any[][][];

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
   * Calculate and output the mean similarity conviction of cases in each group
   * @default false
   */
  similarity_conviction?: boolean;

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

/** Response of the Trainee method: reactGroup. */
export type ReactGroupResponse = {
  /**
   * The list of feature names coressponding to the values in action_values
   */
  action_features?: string[];
  /**
   * 2-d list of the predicted action values for each given group.
   */
  action_values?: any[][];
  /**
   * The average distance contribution of cases in the dataset.
   */
  base_model_average_distance_contribution?: number[];
  /**
   * A list of maps of feature names to their estimated probabilities of each class for the given groups.
   */
  categorical_action_probabilities?: Record<string, CategoricalActionProbabilities>[];
  /**
   * The average distance contribution of cases in the dataset and the cases of each group.
   */
  combined_model_average_distance_contribution?: number[];
  /**
   * The average distance contributions of cases in each group.
   */
  distance_contribution?: number[];
  /**
   * The familiarity conviction of adding each group of cases to the dataset.
   */
  familiarity_conviction_addition?: number[];
  /**
   * The familiarity conviction of removing each group of cases to the dataset.
   */
  familiarity_conviction_removal?: number[];
  /**
   * A list of maps of feature names to their full residuals.
   */
  feature_full_residuals?: FeatureMetricIndex[];
  /**
   * The cases influential to the predictions made for each group.
   */
  influential_cases?: Cases[];
  /**
   * The KL divergence of adding each group of cases to the dataset.
   */
  kl_divergence_addition?: number[];
  /**
   * The KL divergence of removing each group of cases to the dataset.
   */
  kl_divergence_removal?: number[];
  /**
   * The p-value of adding each group of cases to the dataset.
   */
  p_value_of_addition?: number[];
  /**
   * The p-value of removing each group of cases to the dataset.
   */
  p_value_of_removal?: number[];
  /**
   * The average similarity conviction of cases in each group.
   */
  similarity_conviction?: number[];
};
