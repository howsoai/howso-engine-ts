/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * The response body for evaluate
 * @export
 * @interface EvaluateResponse
 */
export interface EvaluateResponse {
  /**
   *
   * @type {any}
   * @memberof EvaluateResponse
   */
  aggregated?: any | null;
  /**
   * Map of feature name to list of values derived from custom code
   * @type {{ [key: string]: Array<any>; }}
   * @memberof EvaluateResponse
   */
  evaluated?: { [key: string]: Array<any> };
}

/**
 * Check if a given object implements the EvaluateResponse interface.
 */
export function instanceOfEvaluateResponse(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function EvaluateResponseFromJSON(json: any): EvaluateResponse {
  return EvaluateResponseFromJSONTyped(json, false);
}

export function EvaluateResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): EvaluateResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    aggregated: !exists(json, "aggregated") ? undefined : json["aggregated"],
    evaluated: !exists(json, "evaluated") ? undefined : json["evaluated"],
  };
}

export function EvaluateResponseToJSON(value?: EvaluateResponse | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    aggregated: value.aggregated,
    evaluated: value.evaluated,
  };
}
