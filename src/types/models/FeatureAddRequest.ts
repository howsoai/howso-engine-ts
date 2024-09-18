/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { FeatureAttributes } from "./FeatureAttributes";
import { FeatureAttributesFromJSON, FeatureAttributesToJSON } from "./FeatureAttributes";

/**
 * The body of an add feature request.
 * @export
 * @interface FeatureAddRequest
 */
export interface FeatureAddRequest {
  /**
   * The name of the feature.
   * @type {string}
   * @memberof FeatureAddRequest
   */
  feature: string;
  /**
   * A condition map where features will only be modified when certain criteria is met. If no value is provided,
   * the feature will be modified in all cases of the model and feature metadata will be updated. If an empty
   * object is provided, the feature will be modified in all cases of the model but the feature metadata will not
   * be updated. The object keys are the feature name and values are one of:
   *   - None
   *   - A value, must match exactly.
   *   - An array of two numeric values, specifying an inclusive range. Only applicable to continuous and numeric ordinal features.
   *   - An array of string values, must match any of these values exactly. Only applicable to nominal and string ordinal features.
   * @type {object}
   * @memberof FeatureAddRequest
   */
  condition?: object;
  /**
   * If specified, ignores the condition and operates on cases for the specified session id.
   * @type {string}
   * @memberof FeatureAddRequest
   */
  condition_session?: string;
  /**
   * A value to apply to the feature for all cases trained the session/trainee.
   * @type {any}
   * @memberof FeatureAddRequest
   */
  feature_value?: any | null;
  /**
   *
   * @type {FeatureAttributes}
   * @memberof FeatureAddRequest
   */
  feature_attributes?: FeatureAttributes;
  /**
   * Whether to overwrite the feature if it exists.
   * @type {boolean}
   * @memberof FeatureAddRequest
   */
  overwrite?: boolean;
}

/**
 * Check if a given object implements the FeatureAddRequest interface.
 */
export function instanceOfFeatureAddRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "feature" in value;

  return isInstance;
}

export function FeatureAddRequestFromJSON(json: any): FeatureAddRequest {
  return FeatureAddRequestFromJSONTyped(json, false);
}

export function FeatureAddRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureAddRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    feature: json["feature"],
    condition: !exists(json, "condition") ? undefined : json["condition"],
    condition_session: !exists(json, "condition_session") ? undefined : json["condition_session"],
    feature_value: !exists(json, "feature_value") ? undefined : json["feature_value"],
    feature_attributes: !exists(json, "feature_attributes")
      ? undefined
      : FeatureAttributesFromJSON(json["feature_attributes"]),
    overwrite: !exists(json, "overwrite") ? undefined : json["overwrite"],
  };
}

export function FeatureAddRequestToJSON(value?: FeatureAddRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    feature: value.feature,
    condition: value.condition,
    condition_session: value.condition_session,
    feature_value: value.feature_value,
    feature_attributes: FeatureAttributesToJSON(value.feature_attributes),
    overwrite: value.overwrite,
  };
}
