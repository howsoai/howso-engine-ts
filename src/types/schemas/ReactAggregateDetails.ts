/**
 * ReactAggregateDetails
 *
 * NOTE: This file is auto generated, do not modify manually.
 */
import { Precision } from "./Precision";
import { Condition } from "./Condition";

export type ReactAggregateDetails = {
  action_condition?: Condition;
  action_condition_precision?: Precision;
  action_num_cases?: number;
  context_condition?: Condition;
  context_condition_precision?: Precision;
  context_precision_num_cases?: number;
  feature_contributions_full?: boolean;
  feature_contributions_robust?: boolean;
  feature_mda_full?: boolean;
  feature_mda_permutation_full?: boolean;
  feature_mda_permutation_robust?: boolean;
  feature_mda_robust?: boolean;
  feature_residuals_full?: boolean;
  feature_residuals_robust?: boolean;
  prediction_stats?: boolean;
  prediction_stats_features?: string[];
  selected_prediction_stats?: string[];
};
