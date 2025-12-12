/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * EditCases
 *
 * Edit feature values for the specified cases.
 * Cases are specified by either case_indices or by the condition. If neither is provided, edits all cases.
 * Updates the accumulated data mass for the dataset proportional to the number of cases and features modified.
 * returns null if invalid features specified or an assoc with "count"
 */
import type { CaseIndices } from "./CaseIndices";
import type { Condition } from "./Condition";

/** Request parameters of the Trainee method: editCases. */
export type EditCasesRequest = {
  /**
   * List of pair (list) of session id and index, where index is the original 0-based session_training_index of the case as
   *   it was trained. If specified, ignores condition and condition_session
   * @default []
   */
  case_indices?: CaseIndices;

  /**
   * Assoc of feature->value(s)
   *     no value or (null) = select cases where that feature is (null)/missing
   *      - for continuous or numeric ordinal features:
   *       one value = must equal exactly the value or be close to it for fuzzy match
   *       two values = inclusive between, supports (null) on either side for less than/greater than conditions
   *       [(null) (null)] = select all non-null cases
   *      - for nominal or string ordinal features:
   *       n values = must match any of these values exactly
   * @default {}
   */
  condition?: Condition;

  /**
   * If specified ignores condition and operates on cases for the specified session id
   */
  condition_session?: string;

  /**
   * List of names of feature to edit
   */
  features: string[];

  /**
   * List of values corresponding to features
   */
  feature_values: any[];

  /**
   * Limit on the number of cases to edit; If set to zero there will be no limit.
   *   If null, will be set to k if precision is "similar" or no limit if precision is "exact". default is null
   */
  num_cases?: number;

  /**
   * Enum used only with 'condition' parameter, will find exact matches if 'exact' and similar cases if 'similar'.
   * @default "exact"
   */
  precision?: "exact" | "similar";

  /**
   * The session id when this call is being made
   * @default "none"
   */
  session?: string;
};

/** Response of the Trainee method: editCases. */
export type EditCasesResponse = {
  count: number;
};
