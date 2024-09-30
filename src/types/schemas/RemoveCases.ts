/**
 * RemoveCases
 *
 * Removes all cases that match the specified conditions from trainee
 *
 * NOTE: This file is auto generated, do not modify manually.
 */
import type { CaseIndices } from "./CaseIndices";
import type { Condition } from "./Condition";
import type { Precision } from "./Precision";

export type RemoveCasesRequest = {
  /*
   * A list of session id and training index tuples that specify which cases are to be removed
   */
  case_indices?: CaseIndices;

  /*
   * Assoc of feature->value(s) (no value = must have feature, one value = must equal exactly the value, two values = inclusive between). ignored if case_indices is specified.
   * @default {}
   */
  condition?: Condition;

  /*
   * If specified, ignores condition and instead operates on all cases that were trained with this session id. ignored if case_indices is specified.
   */
  condition_session?: string;

  /*
   * Name of feature into which to distribute the removed cases' weights to their neighbors.
   */
  distribute_weight_feature?: string;

  /*
   * Limit on the number of cases to move; if set to zero there will be no limit. ignored if case_indices is specified.
   *   if null, will be set to k if precision is "similar" or no limit if precision is "exact". default is null
   */
  num_cases?: number;

  /*
   * Flag, whether to query for 'exact' matches; if set to 'similar' will remove num_cases with the most similar values. ignored if case_indices is specified.
   * @default "exact"
   */
  precision?: Precision;
};
