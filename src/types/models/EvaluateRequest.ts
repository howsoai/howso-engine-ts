/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * Request body for evaluate
 * @export
 * @interface EvaluateRequest
 */
export interface EvaluateRequest {
  /**
   * Map of feature name to custom code string
   * @type {{ [key: string]: string; }}
   * @memberof EvaluateRequest
   */
  features_to_code_map: { [key: string]: string };
  /**
   *
   * @type {string}
   * @memberof EvaluateRequest
   */
  aggregation_code?: string;
}

/**
 * Check if a given object implements the EvaluateRequest interface.
 */
export function instanceOfEvaluateRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "features_to_code_map" in value;

  return isInstance;
}

export function EvaluateRequestFromJSON(json: any): EvaluateRequest {
  return EvaluateRequestFromJSONTyped(json, false);
}

export function EvaluateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): EvaluateRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    features_to_code_map: json["features_to_code_map"],
    aggregation_code: !exists(json, "aggregation_code") ? undefined : json["aggregation_code"],
  };
}

export function EvaluateRequestToJSON(value?: EvaluateRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    features_to_code_map: value.features_to_code_map,
    aggregation_code: value.aggregation_code,
  };
}
