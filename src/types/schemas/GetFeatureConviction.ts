/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * GetFeatureConviction
 *
 * Computes the conviction for each feature and returns an assoc of feature -> conviction value
 */
import type { UseCaseWeights } from "./UseCaseWeights";

export type GetFeatureConvictionRequest = {
  /**
   * List of action features to use as the baseline for conviction instead of the full model
   * @default []
   */
  action_features?: string[];

  /**
   * List of cases for which to use as the model to compute feature conviction
   * @default []
   */
  case_ids?: string[];

  /**
   * Calculate and output familiarity conviction of adding the specified features
   * @default true
   */
  familiarity_conviction_addition?: boolean;

  /**
   * Calculate and output familiarity conviction of removing the specified features
   * @default false
   */
  familiarity_conviction_removal?: boolean;

  /**
   * List of feature names
   * @default []
   */
  features?: string[];

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

export type GetFeatureConvictionResponse = Record<string, number>;
