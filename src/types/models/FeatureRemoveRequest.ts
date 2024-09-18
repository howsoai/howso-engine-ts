/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * The body of a feature removal request.
 * @export
 * @interface FeatureRemoveRequest
 */
export interface FeatureRemoveRequest {
  /**
   * The name of the feature.
   * @type {string}
   * @memberof FeatureRemoveRequest
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
   * @memberof FeatureRemoveRequest
   */
  condition?: object;
  /**
   * If specified, ignores the condition and operates on cases for the specified session id.
   * @type {string}
   * @memberof FeatureRemoveRequest
   */
  condition_session?: string;
}

/**
 * Check if a given object implements the FeatureRemoveRequest interface.
 */
export function instanceOfFeatureRemoveRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "feature" in value;

  return isInstance;
}

export function FeatureRemoveRequestFromJSON(json: any): FeatureRemoveRequest {
  return FeatureRemoveRequestFromJSONTyped(json, false);
}

export function FeatureRemoveRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureRemoveRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    feature: json["feature"],
    condition: !exists(json, "condition") ? undefined : json["condition"],
    condition_session: !exists(json, "condition_session") ? undefined : json["condition_session"],
  };
}

export function FeatureRemoveRequestToJSON(value?: FeatureRemoveRequest | null): any {
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
  };
}
