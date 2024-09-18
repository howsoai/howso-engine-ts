/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * A matrix of data.
 * @export
 * @interface Cases
 */
export interface Cases {
  /**
   * The feature names that correspond to the case columns.
   * @type {Array<string>}
   * @memberof Cases
   */
  features?: Array<string>;
  /**
   * A 2D array of case values.
   * @type {Array<Array<any>>}
   * @memberof Cases
   */
  cases?: Array<Array<any>>;
}

/**
 * Check if a given object implements the Cases interface.
 */
export function instanceOfCases(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function CasesFromJSON(json: any): Cases {
  return CasesFromJSONTyped(json, false);
}

export function CasesFromJSONTyped(json: any, ignoreDiscriminator: boolean): Cases {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    features: !exists(json, "features") ? undefined : json["features"],
    cases: !exists(json, "cases") ? undefined : json["cases"],
  };
}

export function CasesToJSON(value?: Cases | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    features: value.features,
    cases: value.cases,
  };
}
