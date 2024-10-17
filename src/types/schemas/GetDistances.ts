/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * GetDistances
 *
 * Returns an assoc with case distances, containing a list of case session indices and a list of lists (matrix) of the computed distances.
 */
import type { CaseIndices } from "./CaseIndices";
import type { UseCaseWeights } from "./UseCaseWeights";

export type GetDistancesRequest = {
  /**
   * If specified, uses targeted hyperparameters used to predict this action_feature, otherwise uses targetless hyperparameters.
   */
  action_feature?: string;

  /**
   * List of pair (list) of session id and index, where index is the original 0-based session_training_index of the case as it was
   *   trained. If specified, returns pairwise distances for all of these cases. Ignored if feature_values is provided. If neither feature_values nor
   *   case_indices is specified, runs on the full dataset.
   */
  case_indices?: CaseIndices;

  /**
   * Number of columns to compute in the matrix.  If unspecified, is set to the same number as all the cases.
   */
  column_count?: number;

  /**
   * Starting column index of the full matrix of cases for which to compute distances. default value is 0
   * @default 0
   */
  column_offset?: number;

  /**
   * Which features to use when computing case distances. If unspecified uses all features.
   */
  features?: string[];

  /**
   * If specified, returns case distances of the local model relative to these values, ignores case_indices parameter.
   */
  feature_values?: any[];

  /**
   * Number of rows to compute in the matrix.  If unspecified, is set to the same number as all the cases.
   */
  row_count?: number;

  /**
   * Starting row index of the full matrix of cases for which to compute distances. default value is 0
   * @default 0
   */
  row_offset?: number;

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

export type GetDistancesResponse = {
  /**
   * The case indices of the cases represented by the columns of the distance matrix.
   */
  column_case_indices?: CaseIndices;
  /**
   * The case indices of the cases represented by the columns of the distance matrix.
   */
  distances: number[][];
  /**
   * The case indices of the cases represented by the columns of the distance matrix.
   */
  row_case_indices?: CaseIndices;
};
