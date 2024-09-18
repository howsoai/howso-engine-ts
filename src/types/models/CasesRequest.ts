/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * The body of a case request.
 * @export
 * @interface CasesRequest
 */
export interface CasesRequest {
  /**
   * Features to return.  If not specified, the trainee's default feature
   * set will be used.
   * @type {Array<string>}
   * @memberof CasesRequest
   */
  features?: Array<string>;
  /**
   * If specified, cases for this specific session will be returned in
   * the order they were trained.
   * @type {string}
   * @memberof CasesRequest
   */
  session?: string;
  /**
   * If true, the response will include the list of imputed features.
   * @type {boolean}
   * @memberof CasesRequest
   */
  indicate_imputed?: boolean;
  /**
   * List of tuples containing the session id and index, where index is the original 0-based index of the case as
   * it was trained into the session. This explicitly specifies the cases to retrieve.
   * @type {Array<Array<any>>}
   * @memberof CasesRequest
   */
  case_indices?: Array<Array<any>>;
  /**
   * The condition map to select the cases to remove that meet all the provided conditions. The dictionary keys
   * are the feature name and values are one of:
   *   - None
   *   - A value, must match exactly.
   *   - An array of two numeric values, specifying an inclusive range. Only applicable to continuous and numeric ordinal features.
   *   - An array of string values, must match any of these values exactly. Only applicable to nominal and string ordinal features.
   * @type {{ [key: string]: any; }}
   * @memberof CasesRequest
   */
  condition?: { [key: string]: any };
  /**
   * The maximum number of cases to retrieve. If not specified, the limit will be k cases if precision is "similar", or
   * no limit if precision is "exact".
   * @type {number}
   * @memberof CasesRequest
   */
  num_cases?: number;
  /**
   * Exact matching or fuzzy matching.
   * @type {string}
   * @memberof CasesRequest
   */
  precision?: CasesRequestPrecisionEnum;
}

/**
 * @export
 * @enum {string}
 */
export type CasesRequestPrecisionEnum = "exact" | "similar";

/**
 * Check if a given object implements the CasesRequest interface.
 */
export function instanceOfCasesRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function CasesRequestFromJSON(json: any): CasesRequest {
  return CasesRequestFromJSONTyped(json, false);
}

export function CasesRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CasesRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    features: !exists(json, "features") ? undefined : json["features"],
    session: !exists(json, "session") ? undefined : json["session"],
    indicate_imputed: !exists(json, "indicate_imputed") ? undefined : json["indicate_imputed"],
    case_indices: !exists(json, "case_indices") ? undefined : json["case_indices"],
    condition: !exists(json, "condition") ? undefined : json["condition"],
    num_cases: !exists(json, "num_cases") ? undefined : json["num_cases"],
    precision: !exists(json, "precision") ? undefined : json["precision"],
  };
}

export function CasesRequestToJSON(value?: CasesRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    features: value.features,
    session: value.session,
    indicate_imputed: value.indicate_imputed,
    case_indices: value.case_indices,
    condition: value.condition,
    num_cases: value.num_cases,
    precision: value.precision,
  };
}
