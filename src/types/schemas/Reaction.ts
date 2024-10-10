/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * Reaction
 */
import type { CaseMDA } from "./CaseMDA";
import type { Cases } from "./Cases";
import type { CategoricalActionProbabilities } from "./CategoricalActionProbabilities";
import type { DistanceRatioParts } from "./DistanceRatioParts";
import type { FeatureMetricIndex } from "./FeatureMetricIndex";
import type { FullCaseContribution } from "./FullCaseContribution";
import type { OutlyingFeatureValuesIndex } from "./OutlyingFeatureValuesIndex";
import type { ReactionPredictionStats } from "./ReactionPredictionStats";
import type { RobustCaseContribution } from "./RobustCaseContribution";
import type { SimilarCaseIndex } from "./SimilarCaseIndex";

/**
 * The response payload for #react.
 */
export type Reaction = {
  /**
   * The list of action features in the order the action values are returned.
   */
  action_features: string[];
  /**
   * A list of lists of predicted values for each case.
   */
  action_values: any[][];
  /**
   * A list of lists of boundary cases for each given case.
   */
  boundary_cases?: Cases[];
  /**
   * A list of lists of maps containing the case index and full contribution to the action feature for each influential case of each given case.
   */
  case_contributions_full?: FullCaseContribution[][];
  /**
   * A list of lists of maps containing the case index and robust contribution to the action feature for each influential case of each given case.
   */
  case_contributions_robust?: RobustCaseContribution[][];
  /**
   * A list of lists of maps containing the case index and full directional contribution to the action feature each given case.
   */
  case_directional_feature_contributions_full?: FeatureMetricIndex[];
  /**
   * A list of lists of maps containing the case index and robust directional contribution to the action feature each given case.
   */
  case_directional_feature_contributions_robust?: FeatureMetricIndex[];
  /**
   * A list of lists of maps containing the case index and full contribution to the action feature each given case.
   */
  case_feature_contributions_full?: FeatureMetricIndex[];
  /**
   * A list of lists of maps containing the case index and robust contribution to the action feature each given case.
   */
  case_feature_contributions_robust?: FeatureMetricIndex[];
  /**
   * A list of maps from feature name to the full prediction residual for each given case.
   */
  case_feature_residuals_full?: FeatureMetricIndex[];
  /**
   * A list of maps from feature name to the robust prediction residual for each given case.
   */
  case_feature_residuals_robust?: FeatureMetricIndex[];
  /**
   * A list of maps from feature name to feature full residual conviction for each given case.
   */
  case_feature_residual_convictions_full?: FeatureMetricIndex[];
  /**
   * A list of maps from feature name to feature robust residual conviction for each given case.
   */
  case_feature_residual_convictions_robust?: FeatureMetricIndex[];
  /**
   * A list of lists of maps containing the case index and full MDA for each influential case of each given case.
   */
  case_mda_full?: CaseMDA[][];
  /**
   * A list of lists of maps containing the case index and robust MDA for each influential case of each given case.
   */
  case_mda_robust?: CaseMDA[][];
  /**
   * A list of maps of feature names to their estimated probabilities of each class for the given cases.
   */
  categorical_action_probabilities?: Record<string, CategoricalActionProbabilities>[];
  /**
   * A list of maps defining the local feature robust directional contributions of the action feature for each feature in the query.
   */
  directional_feature_contributions_full?: FeatureMetricIndex[];
  /**
   * A list of maps defining the local feature robust directional contributions of the action feature for each feature in the query.
   */
  directional_feature_contributions_robust?: FeatureMetricIndex[];
  /**
   * The computed distance contribution for each given case.
   */
  distance_contribution?: number[];
  /**
   * The computed distance ratio for each given case.
   */
  distance_ratio?: number[];
  /**
   * A list of the parts that are used to compute the distance ratio for each case.
   */
  distance_ratio_parts?: DistanceRatioParts[];
  /**
   * A list of maps defining the local feature full contributions of the action feature for each feature in the query.
   */
  feature_contributions_full?: FeatureMetricIndex[];
  /**
   * A list of maps defining the local feature robust contributions of the action feature for each feature in the query.
   */
  feature_contributions_robust?: FeatureMetricIndex[];
  /**
   * A list of maps defining the local feature full MDA of the action feature for each feature in the query given the prediction was already made as the given action value.
   */
  feature_mda_ex_post_full?: FeatureMetricIndex[];
  /**
   * A list of maps defining the local feature robust MDA of the action feature for each feature in the query given the prediction was already made as the given action value.
   */
  feature_mda_ex_post_robust?: FeatureMetricIndex[];
  /**
   * A list of maps defining the local feature full MDA of the action feature for each feature in the query.
   */
  feature_mda_full?: FeatureMetricIndex[];
  /**
   * A list of maps defining the local feature robust MDA of the action feature for each feature in the query.
   */
  feature_mda_robust?: FeatureMetricIndex[];
  /**
   * A list of maps defining the local feature full residuals for each feature in the query.
   */
  feature_residuals_full?: FeatureMetricIndex[];
  /**
   * A list of maps defining the local feature robust residuals for each feature in the query.
   */
  feature_residuals_robust?: FeatureMetricIndex[];
  /**
   * A list of the amount of generation attempts taken for each synthesized case. Only returned if `generate_new_cases` is 'attempt' or 'always'.
   */
  generate_attempts?: number[];
  /**
   * A list of maps from feature name to feature values indicating how feature values would be predicted if the given hypothetical values were true.
   */
  hypothetical_values?: Record<string, any>[];
  /**
   * A list of lists of influential cases for each given case.
   */
  influential_cases?: Cases[];
  /**
   * A list of lists of the most similar cases to each given case.
   */
  most_similar_cases?: Cases[];
  /**
   * A list of lists of maps describing the most similar case indices and their distance from each given case.
   */
  most_similar_case_indices?: SimilarCaseIndex[][];
  /**
   * A list of maps defining the observational errors for each feature defined in the feature attributes.
   */
  observational_errors?: FeatureMetricIndex[];
  /**
   * A list of maps from feature name to map describing the outlying values and the extreme observed among similar cases.
   */
  outlying_feature_values?: OutlyingFeatureValuesIndex[];
  /**
   * A list of maps containing the resulting prediction stats for the region of cases nearest to each given case.
   */
  prediction_stats?: ReactionPredictionStats[];
  /**
   * The computed similarity conviction for each given case.
   */
  similarity_conviction?: number[];
};
