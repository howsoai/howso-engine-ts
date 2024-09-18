/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface CaseEditRequest
 */
export interface CaseEditRequest {
  /**
   * The names of the features to edit.
   * @type {Array<string>}
   * @memberof CaseEditRequest
   */
  features?: Array<string>;
  /**
   * The feature values to edit the case with.
   * @type {Array<any>}
   * @memberof CaseEditRequest
   */
  feature_values?: Array<any>;
  /**
   * List of tuples containing the session id and index, where index is the original 0-based index of the case as
   * it was trained into the session. This explicitly specifies the cases to edit. When specified, `condition`
   * and `condition_session` are ignored.
   * @type {Array<Array<any>>}
   * @memberof CaseEditRequest
   */
  case_indices?: Array<Array<any>>;
  /**
   * A condition map to select which cases to edit. The dictionary keys are the feature name and values are one of:
   *   - None
   *   - A value, must match exactly.
   *   - An array of two numeric values, specifying an inclusive range. Only applicable to continuous and numeric ordinal features.
   *   - An array of string values, must match any of these values exactly. Only applicable to nominal and string ordinal features.
   * @type {{ [key: string]: any; }}
   * @memberof CaseEditRequest
   */
  condition?: { [key: string]: any };
  /**
   * If specified, ignores the condition and operates on cases for the specified session id.
   * @type {string}
   * @memberof CaseEditRequest
   */
  condition_session?: string;
  /**
   * The maximum number of cases to edit. If not specified, the limit will be k cases if precision is
   * "similar", or no limit if precision is "exact".
   * @type {number}
   * @memberof CaseEditRequest
   */
  num_cases?: number;
  /**
   * Exact matching or fuzzy matching.
   * @type {string}
   * @memberof CaseEditRequest
   */
  precision?: CaseEditRequestPrecisionEnum;
}

/**
 * @export
 * @enum {string}
 */
export type CaseEditRequestPrecisionEnum = "exact" | "similar";

/**
 * Check if a given object implements the CaseEditRequest interface.
 */
export function instanceOfCaseEditRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function CaseEditRequestFromJSON(json: any): CaseEditRequest {
  return CaseEditRequestFromJSONTyped(json, false);
}

export function CaseEditRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CaseEditRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    features: !exists(json, "features") ? undefined : json["features"],
    feature_values: !exists(json, "feature_values") ? undefined : json["feature_values"],
    case_indices: !exists(json, "case_indices") ? undefined : json["case_indices"],
    condition: !exists(json, "condition") ? undefined : json["condition"],
    condition_session: !exists(json, "condition_session") ? undefined : json["condition_session"],
    num_cases: !exists(json, "num_cases") ? undefined : json["num_cases"],
    precision: !exists(json, "precision") ? undefined : json["precision"],
  };
}

export function CaseEditRequestToJSON(value?: CaseEditRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    features: value.features,
    feature_values: value.feature_values,
    case_indices: value.case_indices,
    condition: value.condition,
    condition_session: value.condition_session,
    num_cases: value.num_cases,
    precision: value.precision,
  };
}
