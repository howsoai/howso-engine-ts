/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * MoveCases
 *
 * Moves all cases that match the specified conditions in the hierarchy of the specified trainee
 */
import type { CaseIndices } from "./CaseIndices";
import type { Condition } from "./Condition";
import type { Precision } from "./Precision";

/** Request parameters of the Trainee method: moveCases. */
export type MoveCasesRequest = {
  /**
   * A list of session id and training index tuples that specify which cases are to be moved
   */
  case_indices?: CaseIndices;

  /**
   * Assoc of feature->value(s) (no value = must have feature, one value = must equal exactly the value, two values = inclusive between). Ignored if case_indices is specified.
   * @default {}
   */
  condition?: Condition;

  /**
   * Name of feature into which to distribute the removed cases' weights to their neighbors.
   *     Applicable only if not preserving session data.
   */
  distribute_weight_feature?: string;

  /**
   * Limit on the number of cases to move; If set to zero there will be no limit. Ignored if case_indices is specified.
   *   If null, will be set to k if precision is "similar" or no limit if precision is "exact". default is null
   */
  num_cases?: number;

  /**
   * Flag, whether to query for 'exact' matches; if set to 'similar' will move num_cases with the most similar values. Ignored if case_indices is specified.
   * @default "exact"
   */
  precision?: Precision;

  /**
   * If true will just move cases from source to target, otherwise will do session cleanup
   * @default false
   */
  preserve_session_data?: boolean;

  /**
   * The session id when this call is being made. Used for training the cases into the target_trainee once when not preserving session data.
   * @default "none"
   */
  session?: string;

  /**
   * Id of source trainee from which to move cases. Ignored if source_name_path is specified.
   *   If neither source_name_path nor source_id are specified, moves cases from the trainee itself.
   */
  source_id?: string;

  /**
   * List of strings specifying the user-friendly path of the child subtrainee from which to move cases.
   */
  source_name_path?: string[];

  /**
   * Id of target trainee to move cases to. Ignored if target_name_path is specified.
   *   If neither target_name_path nor target_id are specified, moves cases to the trainee itself.
   */
  target_id?: string;

  /**
   * List of strings specifying the user-friendly path of the child subtrainee to move cases to.
   */
  target_name_path?: string[];
};

/** Response of the Trainee method: moveCases. */
export type MoveCasesResponse = {
  count: number;
};
