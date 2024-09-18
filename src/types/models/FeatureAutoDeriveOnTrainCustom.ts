/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * Derive feature using the specified `code`. For each series, where each series is defined by `series_id_features`, the rows are processed in order, after being sorted by `ordered_by_features`. If series is not specified, processes the entire dataset. Referencing data in rows uses 0-based indexing, where the current row index is 0, the previous row's is 1, etc. Specified code may do simple logic and numeric operations on feature values referenced via feature name and row offset.
 *
 * Examples:
 * - ``"#x 1"`` : Use the value for feature 'x' from the previously processed row (offset of 1, one lag value).
 * - ``"(- #y 0 #x 1)"`` : Feature 'y' value from current (offset 0) row  minus feature 'x' value from previous (offset 1) row.
 * @export
 * @interface FeatureAutoDeriveOnTrainCustom
 */
export interface FeatureAutoDeriveOnTrainCustom {
  /**
   * The train derive operation type.
   * @type {string}
   * @memberof FeatureAutoDeriveOnTrainCustom
   */
  derive_type: string;
  /**
   * Amalgam code describing how feature could be derived.
   * @type {string}
   * @memberof FeatureAutoDeriveOnTrainCustom
   */
  code: string;
  /**
   * Feature name(s) of series for which to derive this feature. A series is the conjunction of all the features specified by this attribute.
   * @type {Array<string>}
   * @memberof FeatureAutoDeriveOnTrainCustom
   */
  series_id_features?: Array<string>;
  /**
   * Feature name(s) by which to order the series specified by `series_id_features`. Series values are order by the order of feature names specified by this attribute.
   * @type {Array<string>}
   * @memberof FeatureAutoDeriveOnTrainCustom
   */
  ordered_by_features?: Array<string>;
}

/**
 * Check if a given object implements the FeatureAutoDeriveOnTrainCustom interface.
 */
export function instanceOfFeatureAutoDeriveOnTrainCustom(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "derive_type" in value;
  isInstance = isInstance && "code" in value;

  return isInstance;
}

export function FeatureAutoDeriveOnTrainCustomFromJSON(json: any): FeatureAutoDeriveOnTrainCustom {
  return FeatureAutoDeriveOnTrainCustomFromJSONTyped(json, false);
}

export function FeatureAutoDeriveOnTrainCustomFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): FeatureAutoDeriveOnTrainCustom {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    derive_type: json["derive_type"],
    code: json["code"],
    series_id_features: !exists(json, "series_id_features") ? undefined : json["series_id_features"],
    ordered_by_features: !exists(json, "ordered_by_features") ? undefined : json["ordered_by_features"],
  };
}

export function FeatureAutoDeriveOnTrainCustomToJSON(value?: FeatureAutoDeriveOnTrainCustom | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    derive_type: value.derive_type,
    code: value.code,
    series_id_features: value.series_id_features,
    ordered_by_features: value.ordered_by_features,
  };
}
