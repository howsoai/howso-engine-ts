/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * The feature familiarity conviction values.
 * @export
 * @interface FeatureConviction
 */
export interface FeatureConviction {
  /**
   * A dictionary of feature name to conviction value where each value is the familiarity conviction of adding the feature to the Model.
   * @type {{ [key: string]: number; }}
   * @memberof FeatureConviction
   */
  familiarity_conviction_addition?: { [key: string]: number };
  /**
   * A dictionary of feature name to conviction value where each value is the familiarity conviction of removing the feature from the Model.
   * @type {{ [key: string]: number; }}
   * @memberof FeatureConviction
   */
  familiarity_conviction_removal?: { [key: string]: number };
}

/**
 * Check if a given object implements the FeatureConviction interface.
 */
export function instanceOfFeatureConviction(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function FeatureConvictionFromJSON(json: any): FeatureConviction {
  return FeatureConvictionFromJSONTyped(json, false);
}

export function FeatureConvictionFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureConviction {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    familiarity_conviction_addition: !exists(json, "familiarity_conviction_addition")
      ? undefined
      : json["familiarity_conviction_addition"],
    familiarity_conviction_removal: !exists(json, "familiarity_conviction_removal")
      ? undefined
      : json["familiarity_conviction_removal"],
  };
}

export function FeatureConvictionToJSON(value?: FeatureConviction | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    familiarity_conviction_addition: value.familiarity_conviction_addition,
    familiarity_conviction_removal: value.familiarity_conviction_removal,
  };
}
