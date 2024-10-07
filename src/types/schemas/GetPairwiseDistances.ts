/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * GetPairwiseDistances
 *
 * Returns a list of computed distances between respective cases specified in either from_values or from_case_indices to to_values or to_case_indices.
 *  If one case is specified in any of the lists, all respective distances are computed to/from that one case.
 */
import type { CaseIndices } from "./CaseIndices";
import type { UseCaseWeights } from "./UseCaseWeights";

export type GetPairwiseDistancesRequest = {
  /**
   * If specified, uses targeted hyperparameters used to predict this action_feature, otherwise uses targetless hyperparameters.
   */
  action_feature?: string;

  /**
   * Which features to use when computing pairwise distances. If unspecified uses all features.
   */
  features?: string[];

  /**
   * List of pair (list) of session id and index, where index is the original 0-based session_training_index of the case as it was trained.
   *   if specified must be either length of 1 or match length of to_values or to_case_indices.
   * @default []
   */
  from_case_indices?: CaseIndices;

  /**
   * List of cases (lists of values), i.e., a 2d-list of values. Either from_values or from_case_indices must be specified, not both.
   *   if specified must be either length of 1 or match length of to_values or to_case_indices.
   * @default []
   */
  from_values?: any[][];

  /**
   * List of pair (list) of session id and index, where index is the original 0-based session_training_index of the case as it was trained.
   *   if specified must be either length of 1 or match length of from_values or from_case_indices.
   * @default []
   */
  to_case_indices?: CaseIndices;

  /**
   * List of cases (lists of values), i.e., a 2d-list of values. Either to_values or to_case_indices must be specified, not both.
   *   if specified must be either length of 1 or match length of from_values or from_case_indices.
   * @default []
   */
  to_values?: any[][];

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

export type GetPairwiseDistancesResponse = number[];
