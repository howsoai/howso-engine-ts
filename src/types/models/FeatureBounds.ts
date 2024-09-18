/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * Bounds for feature value generation.
 * @export
 * @interface FeatureBounds
 */
export interface FeatureBounds {
  /**
   * The minimum value to be output. May be a number or date string.
   * @type {any}
   * @memberof FeatureBounds
   */
  min?: any | null;
  /**
   * The maximum value to be output. May be a number or date string.
   * @type {any}
   * @memberof FeatureBounds
   */
  max?: any | null;
  /**
   * Explicitly allowed values to be output.
   * @type {Array<any>}
   * @memberof FeatureBounds
   */
  allowed?: Array<any>;
  /**
   * Allow nulls to be output, per their distribution in the data. Defaults to true.
   * @type {boolean}
   * @memberof FeatureBounds
   */
  allow_null?: boolean;
  /**
   * Amalgam code, whose logic has to evaluate to true for value to be considered valid when this feature is being generated. Same format as 'derived_feature_code'.
   *
   * Examples:
   * - ``"(> #f1 0 #f2 0)"``: Feature 'f1' value from current (offset 0) data must be bigger than feature 'f2' value from current (offset 0) data.
   * @type {string}
   * @memberof FeatureBounds
   */
  constraint?: string;
}

/**
 * Check if a given object implements the FeatureBounds interface.
 */
export function instanceOfFeatureBounds(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function FeatureBoundsFromJSON(json: any): FeatureBounds {
  return FeatureBoundsFromJSONTyped(json, false);
}

export function FeatureBoundsFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureBounds {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    min: !exists(json, "min") ? undefined : json["min"],
    max: !exists(json, "max") ? undefined : json["max"],
    allowed: !exists(json, "allowed") ? undefined : json["allowed"],
    allow_null: !exists(json, "allow_null") ? undefined : json["allow_null"],
    constraint: !exists(json, "constraint") ? undefined : json["constraint"],
  };
}

export function FeatureBoundsToJSON(value?: FeatureBounds | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    min: value.min,
    max: value.max,
    allowed: value.allowed,
    allow_null: value.allow_null,
    constraint: value.constraint,
  };
}
