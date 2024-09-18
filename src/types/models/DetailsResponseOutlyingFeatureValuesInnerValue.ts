/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * Feature values from the reaction case that are below the min or above the max value of similar cases that were identified during a prediction.
 * @export
 * @interface DetailsResponseOutlyingFeatureValuesInnerValue
 */
export interface DetailsResponseOutlyingFeatureValuesInnerValue {
  /**
   *
   * @type {number}
   * @memberof DetailsResponseOutlyingFeatureValuesInnerValue
   */
  input_case_value?: number;
  /**
   *
   * @type {number}
   * @memberof DetailsResponseOutlyingFeatureValuesInnerValue
   */
  local_max?: number;
}

/**
 * Check if a given object implements the DetailsResponseOutlyingFeatureValuesInnerValue interface.
 */
export function instanceOfDetailsResponseOutlyingFeatureValuesInnerValue(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function DetailsResponseOutlyingFeatureValuesInnerValueFromJSON(
  json: any,
): DetailsResponseOutlyingFeatureValuesInnerValue {
  return DetailsResponseOutlyingFeatureValuesInnerValueFromJSONTyped(json, false);
}

export function DetailsResponseOutlyingFeatureValuesInnerValueFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): DetailsResponseOutlyingFeatureValuesInnerValue {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    input_case_value: !exists(json, "input_case_value") ? undefined : json["input_case_value"],
    local_max: !exists(json, "local_max") ? undefined : json["local_max"],
  };
}

export function DetailsResponseOutlyingFeatureValuesInnerValueToJSON(
  value?: DetailsResponseOutlyingFeatureValuesInnerValue | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    input_case_value: value.input_case_value,
    local_max: value.local_max,
  };
}
