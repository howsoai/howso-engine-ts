/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * SeriesReaction
 */
import type { Cases } from "./Cases";
import type { CategoricalActionProbabilities } from "./CategoricalActionProbabilities";

/**
 * The response payload for #react_series.
 */
export type SeriesReaction = {
  /**
   * The list of feature names that correspond to the values in each list of values in 'action_values'.
   */
  action_features: string[];
  /**
   * A list of individual series.
   */
  action_values: any[][][];
  /**
   * A list of aggregated categorical action probabilities for each nominal features across all the cases of each series.
   */
  aggregated_categorical_action_probabilities?: Record<string, CategoricalActionProbabilities>[];
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  boundary_cases?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_contributions_full?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_contributions_robust?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_directional_feature_contributions_full?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_directional_feature_contributions_robust?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_feature_contributions_full?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_feature_contributions_robust?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_feature_residuals_full?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_feature_residuals_robust?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_feature_residual_convictions_full?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_feature_residual_convictions_robust?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_mda_full?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_mda_robust?: any;
  /**
   * A list of the detail result lists for each case of each series.
   */
  categorical_action_probabilities?: Record<string, CategoricalActionProbabilities>[][];
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  directional_feature_contributions_full?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  directional_feature_contributions_robust?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  distance_contribution?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  distance_ratio?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  distance_ratio_parts?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_contributions_full?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_contributions_robust?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_mda_ex_post_full?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_mda_ex_post_robust?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_mda_full?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_mda_robust?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_residuals_full?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_residuals_robust?: any;
  /**
   * A list of the detail result lists for each case of each series.
   */
  generate_attempts?: number[][];
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  hypothetical_values?: any;
  /**
   * A list of the detail result lists for each case of each series.
   */
  influential_cases?: Cases[][];
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  most_similar_cases?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  most_similar_case_indices?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  observational_errors?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  outlying_feature_values?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  prediction_stats?: any;
  /**
   * A list of generation attempts for each series as a whole.
   */
  series_generate_attempts?: number[];
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  similarity_conviction?: any;
};
