/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * SeriesReaction
 */
import type { Case } from "./Case";
import type { CaseMDA } from "./CaseMDA";
import type { CategoricalActionProbabilities } from "./CategoricalActionProbabilities";
import type { DistanceRatioParts } from "./DistanceRatioParts";
import type { FeatureMetricIndex } from "./FeatureMetricIndex";
import type { FullCaseContribution } from "./FullCaseContribution";
import type { OutlyingFeatureValuesIndex } from "./OutlyingFeatureValuesIndex";
import type { ReactionPredictionStats } from "./ReactionPredictionStats";
import type { RobustCaseContribution } from "./RobustCaseContribution";
import type { SimilarCaseIndex } from "./SimilarCaseIndex";

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
   * A list of the detail result lists for each case of each series.
   */
  boundary_cases?: Case[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  case_contributions_full?: FullCaseContribution[][][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  case_contributions_robust?: RobustCaseContribution[][][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  case_directional_feature_contributions_full?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  case_directional_feature_contributions_robust?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  case_feature_contributions_full?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  case_feature_contributions_robust?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  case_feature_residuals_full?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  case_feature_residuals_robust?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  case_feature_residual_convictions_full?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  case_feature_residual_convictions_robust?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  case_mda_full?: CaseMDA[][][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  case_mda_robust?: CaseMDA[][][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  categorical_action_probabilities?: Record<string, CategoricalActionProbabilities>[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  directional_feature_contributions_full?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  directional_feature_contributions_robust?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  distance_contribution?: number[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  distance_ratio?: number[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  distance_ratio_parts?: DistanceRatioParts[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  feature_contributions_full?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  feature_contributions_robust?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  feature_mda_ex_post_full?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  feature_mda_ex_post_robust?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  feature_mda_full?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  feature_mda_robust?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  feature_residuals_full?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  feature_residuals_robust?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  generate_attempts?: number[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  hypothetical_values?: Record<string, any>[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  influential_cases?: Case[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  most_similar_cases?: Case[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  most_similar_case_indices?: SimilarCaseIndex[][][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  observational_errors?: FeatureMetricIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  outlying_feature_values?: OutlyingFeatureValuesIndex[][];
  /**
   * A list of the detail result lists for each case of each series.
   */
  prediction_stats?: ReactionPredictionStats[][];
  /**
   * A list of generation attempts for each series as a whole.
   */
  series_generate_attempts?: number[];
  /**
   * A list of the detail result lists for each case of each series.
   */
  similarity_conviction?: number[][];
};
