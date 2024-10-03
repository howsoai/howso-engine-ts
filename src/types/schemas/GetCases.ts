/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * GetCases
 *
 * Returns assoc with features and cases - a list of lists of all feature values. Retrieves all feature values for cases for
 * all (unordered) sessions in the order they were trained within each session. If a session is specified, only that session's
 * cases wil be output.
 */
import type { CaseIndices } from "./CaseIndices";
import type { Condition } from "./Condition";
import type { Precision } from "./Precision";

export type GetCasesRequest = {
  /**
   * List of pair (list) of session id and index, where index is the original 0-based session_training_index of the
   *   case as it was trained. If specified, ignores session and condition/precision parameters.
   */
  case_indices?: CaseIndices;

  /**
   * A query condition describing the cases to return.
   */
  condition?: Condition;

  /**
   * List of features to retrieve.
   * @default []
   */
  features?: string[];

  /**
   * If true, will return the audit data of which features for each row were imputed (auto-filled)
   * @default false
   */
  indicate_imputed?: boolean;

  /**
   * Limit on the number of cases to retrieve; If set to zero there will be no limit.
   *   If null, will be set to k if precision is "similar" or no limit if precision is "exact". default is null
   */
  num_cases?: number;

  /**
   * Flag, when true only returns an assoc of case ids and no features
   * @default false
   */
  output_ids?: boolean;

  /**
   * String, default is 'exact', used only with 'condition' parameter, will find exact matches if 'exact' and similar cases if 'similar'.
   * @default "exact"
   */
  precision?: Precision;

  /**
   * Session from which to get cases (even if by condition).
   */
  session?: string;

  /**
   * Set flag to skip decoding feature values into their nominal values for output.
   * @default 0
   */
  skip_decoding?: number;
};

export type GetCasesResponse = {
  cases?: any[][];
  features?: string[];
};
