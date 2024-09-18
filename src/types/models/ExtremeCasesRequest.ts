/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * The body of an extreme cases request.
 * @export
 * @interface ExtremeCasesRequest
 */
export interface ExtremeCasesRequest {
  /**
   * The number of cases to return. If num is positive, this will return the top (largest value) cases. If num is negative, this will return smallest cases.
   * @type {number}
   * @memberof ExtremeCasesRequest
   */
  num: number;
  /**
   * The feature to sort by.
   * @type {string}
   * @memberof ExtremeCasesRequest
   */
  sort_feature: string;
  /**
   * The features to return values for.
   * @type {Array<string>}
   * @memberof ExtremeCasesRequest
   */
  features?: Array<string>;
}

/**
 * Check if a given object implements the ExtremeCasesRequest interface.
 */
export function instanceOfExtremeCasesRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "num" in value;
  isInstance = isInstance && "sort_feature" in value;

  return isInstance;
}

export function ExtremeCasesRequestFromJSON(json: any): ExtremeCasesRequest {
  return ExtremeCasesRequestFromJSONTyped(json, false);
}

export function ExtremeCasesRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ExtremeCasesRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    num: json["num"],
    sort_feature: json["sort_feature"],
    features: !exists(json, "features") ? undefined : json["features"],
  };
}

export function ExtremeCasesRequestToJSON(value?: ExtremeCasesRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    num: value.num,
    sort_feature: value.sort_feature,
    features: value.features,
  };
}
