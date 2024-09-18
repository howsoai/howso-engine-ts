/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface CaseCountResponse
 */
export interface CaseCountResponse {
  /**
   * The number of cases.
   * @type {number}
   * @memberof CaseCountResponse
   */
  count?: number;
}

/**
 * Check if a given object implements the CaseCountResponse interface.
 */
export function instanceOfCaseCountResponse(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function CaseCountResponseFromJSON(json: any): CaseCountResponse {
  return CaseCountResponseFromJSONTyped(json, false);
}

export function CaseCountResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CaseCountResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    count: !exists(json, "count") ? undefined : json["count"],
  };
}

export function CaseCountResponseToJSON(value?: CaseCountResponse | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    count: value.count,
  };
}
