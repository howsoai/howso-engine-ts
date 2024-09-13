/**
 * Howso API
 * OpenAPI implementation for interacting with the Howso API.
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists } from "../runtime";
/**
 * The body of a remove series store request.
 * @export
 * @interface RemoveSeriesStoreRequest
 */
export interface RemoveSeriesStoreRequest {
  /**
   * The name of a series to remove.
   * @type {string}
   * @memberof RemoveSeriesStoreRequest
   */
  series?: string | null;
}

/**
 * Check if a given object implements the RemoveSeriesStoreRequest interface.
 */
export function instanceOfRemoveSeriesStoreRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function RemoveSeriesStoreRequestFromJSON(json: any): RemoveSeriesStoreRequest {
  return RemoveSeriesStoreRequestFromJSONTyped(json, false);
}

export function RemoveSeriesStoreRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): RemoveSeriesStoreRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    series: !exists(json, "series") ? undefined : json["series"],
  };
}

export function RemoveSeriesStoreRequestToJSON(value?: RemoveSeriesStoreRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    series: value.series,
  };
}
