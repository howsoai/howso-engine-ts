/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface CaseRemoveRequest
 */
export interface CaseRemoveRequest {
  /**
   * The number of cases to move or remove. This is ignored if case_indices is specified.
   * @type {number}
   * @memberof CaseRemoveRequest
   */
  num_cases: number;
  /**
   * List of tuples containing the session id and index, where index is the original 0-based index of the case as
   * it was trained into the session. This explicitly specifies the cases to retrieve.
   * @type {Array<Array<any>>}
   * @memberof CaseRemoveRequest
   */
  case_indices?: Array<Array<any>>;
  /**
   * The condition map to select the cases to remove that meet all the provided conditions. The dictionary keys
   * are the feature name and values are one of:
   *   - None
   *   - A value, must match exactly.
   *   - An array of two numeric values, specifying an inclusive range. Only applicable to continuous and numeric ordinal features.
   *   - An array of string values, must match any of these values exactly. Only applicable to nominal and string ordinal features.
   * This is ignored if case_indices is specified.
   * @type {{ [key: string]: any; }}
   * @memberof CaseRemoveRequest
   */
  condition?: { [key: string]: any };
  /**
   * If specified, ignores the condition and operates on cases for the specified session id. This is ignored if case_indices is specified.
   * @type {string}
   * @memberof CaseRemoveRequest
   */
  condition_session?: string;
  /**
   * When specified, will distribute the removed cases' weights from this feature into their neighbors.
   * @type {string}
   * @memberof CaseRemoveRequest
   */
  distribute_weight_feature?: string;
  /**
   * Exact matching or fuzzy matching. This is ignored if case_indices is specified.
   * @type {string}
   * @memberof CaseRemoveRequest
   */
  precision?: CaseRemoveRequestPrecisionEnum;
}

/**
 * @export
 * @enum {string}
 */
export type CaseRemoveRequestPrecisionEnum = "exact" | "similar";

/**
 * Check if a given object implements the CaseRemoveRequest interface.
 */
export function instanceOfCaseRemoveRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "num_cases" in value;

  return isInstance;
}

export function CaseRemoveRequestFromJSON(json: any): CaseRemoveRequest {
  return CaseRemoveRequestFromJSONTyped(json, false);
}

export function CaseRemoveRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CaseRemoveRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    num_cases: json["num_cases"],
    case_indices: !exists(json, "case_indices") ? undefined : json["case_indices"],
    condition: !exists(json, "condition") ? undefined : json["condition"],
    condition_session: !exists(json, "condition_session") ? undefined : json["condition_session"],
    distribute_weight_feature: !exists(json, "distribute_weight_feature")
      ? undefined
      : json["distribute_weight_feature"],
    precision: !exists(json, "precision") ? undefined : json["precision"],
  };
}

export function CaseRemoveRequestToJSON(value?: CaseRemoveRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    num_cases: value.num_cases,
    case_indices: value.case_indices,
    condition: value.condition,
    condition_session: value.condition_session,
    distribute_weight_feature: value.distribute_weight_feature,
    precision: value.precision,
  };
}
