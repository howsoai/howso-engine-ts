/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * GetDistances
 *
 * Returns an assoc with case distances, containing a list of case session indices and a list of lists (matrix) of the computed distances.
 *  in the following format:
 *  {
 *   'column_case_indices' : [ session-indices ],
 *   'row_case_indices' : [ session-indices ],
 *   'distances': [ [ pairwise distances ] ]
 *  }
 */
import type { CaseIndices } from "./CaseIndices";

export type GetDistancesRequest = {
  /*
   * If specified, uses targeted hyperparameters used to predict this action_feature, otherwise uses targetless hyperparameters.
   */
  action_feature?: string;

  /*
   * List of pair (list) of session id and index, where index is the original 0-based session_training_index of the case as it was
   *   trained. if specified, returns pairwise distances for all of these cases. ignored if feature_values is provided. if neither feature_values nor
   *   case_indices is specified, runs on the full dataset.
   */
  case_indices?: CaseIndices;

  /*
   * Number of columns to compute in the matrix.  if unspecified, is set to the same number as all the cases.
   */
  column_count?: number;

  /*
   * Starting column index of the full matrix of cases for which to compute distances. default value is 0
   * @default 0
   */
  column_offset?: number;

  /*
   * Which features to use when computing case distances. if unspecified uses all features.
   */
  features?: string[];

  /*
   * If specified, returns case distances of the local model relative to these values, ignores case_indices parameter.
   */
  feature_values?: any[];

  /*
   * Number of rows to compute in the matrix.  if unspecified, is set to the same number as all the cases.
   */
  row_count?: number;

  /*
   * Starting row index of the full matrix of cases for which to compute distances. default value is 0
   * @default 0
   */
  row_offset?: number;

  /*
   * Flag, if set to true will scale influence weights by each case's weight_feature weight. if unspecified,
   *   case weights will be used if the trainee has them.
   */
  use_case_weights?: boolean;

  /*
   * Name of feature whose values to use as case weights
   * @default ".case_weight"
   */
  weight_feature?: string;
};
