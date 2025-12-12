/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * GetFeatureConviction
 *
 * Computes the conviction for each feature and returns an assoc of feature -> conviction value
 */
import type { UseCaseWeights } from "./UseCaseWeights";

/** Request parameters of the Trainee method: getFeatureConviction. */
export type GetFeatureConvictionRequest = {
  /**
   * List of action features to use as the baseline for conviction instead of the full dataset
   * @default []
   */
  action_features?: string[];

  /**
   * List of cases for which to use as the dataset to compute feature conviction
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

/** Response of the Trainee method: getFeatureConviction. */
export type GetFeatureConvictionResponse = {
  /**
   * The familiarity conviction of adding the feature to the dataset.
   */
  familiarity_conviction_addition?: Record<string, number>;
  /**
   * The familiarity conviction of removing the feature from the dataset.
   */
  familiarity_conviction_removal?: Record<string, number>;
};
