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
 *
 * @export
 * @interface DetailsResponseDistanceRatioPartsInner
 */
export interface DetailsResponseDistanceRatioPartsInner {
  /**
   *
   * @type {number}
   * @memberof DetailsResponseDistanceRatioPartsInner
   */
  local_distance_contribution?: number | null;
  /**
   *
   * @type {number}
   * @memberof DetailsResponseDistanceRatioPartsInner
   */
  nearest_distance?: number | null;
}

/**
 * Check if a given object implements the DetailsResponseDistanceRatioPartsInner interface.
 */
export function instanceOfDetailsResponseDistanceRatioPartsInner(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function DetailsResponseDistanceRatioPartsInnerFromJSON(json: any): DetailsResponseDistanceRatioPartsInner {
  return DetailsResponseDistanceRatioPartsInnerFromJSONTyped(json, false);
}

export function DetailsResponseDistanceRatioPartsInnerFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): DetailsResponseDistanceRatioPartsInner {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    local_distance_contribution: !exists(json, "local_distance_contribution")
      ? undefined
      : json["local_distance_contribution"],
    nearest_distance: !exists(json, "nearest_distance") ? undefined : json["nearest_distance"],
  };
}

export function DetailsResponseDistanceRatioPartsInnerToJSON(
  value?: DetailsResponseDistanceRatioPartsInner | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    local_distance_contribution: value.local_distance_contribution,
    nearest_distance: value.nearest_distance,
  };
}
