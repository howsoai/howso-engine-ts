/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface ImputeRequest
 */
export interface ImputeRequest {
  /**
   * Larger batch size will increase speed but decrease accuracy.
   * Batch size indicates how many rows to fill before recomputing conviction.
   * The default value (which is 1) should return the best accuracy but might be slower.
   * Higher values should improve performance but may decrease accuracy of results.
   * @type {number}
   * @memberof ImputeRequest
   */
  batch_size?: number;
  /**
   *
   * @type {Array<string>}
   * @memberof ImputeRequest
   */
  features?: Array<string>;
  /**
   *
   * @type {Array<string>}
   * @memberof ImputeRequest
   */
  features_to_impute?: Array<string>;
}

/**
 * Check if a given object implements the ImputeRequest interface.
 */
export function instanceOfImputeRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ImputeRequestFromJSON(json: any): ImputeRequest {
  return ImputeRequestFromJSONTyped(json, false);
}

export function ImputeRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ImputeRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    batch_size: !exists(json, "batch_size") ? undefined : json["batch_size"],
    features: !exists(json, "features") ? undefined : json["features"],
    features_to_impute: !exists(json, "features_to_impute") ? undefined : json["features_to_impute"],
  };
}

export function ImputeRequestToJSON(value?: ImputeRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    batch_size: value.batch_size,
    features: value.features,
    features_to_impute: value.features_to_impute,
  };
}
