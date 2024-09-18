/**
 * Howso API
 * OpenAPI implementation for interacting with the Howso API.
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * Derive feature by creating two new continuous features: `.series_progress` and `.series_progress_delta`. Series progress values range from 0 to 1.0 for each case in the series. Series progress delta values are the delta value of the progress for each case. Both of these features are used to determine when to stop series synthesis.
 * @export
 * @interface FeatureAutoDeriveOnTrainProgress
 */
export interface FeatureAutoDeriveOnTrainProgress {
  /**
   * The train derive operation type.
   * @type {string}
   * @memberof FeatureAutoDeriveOnTrainProgress
   */
  derive_type: string;
  /**
   * Feature name(s) of series for which to derive this feature. A series is the conjunction of all the features specified by this attribute.
   * @type {Array<string>}
   * @memberof FeatureAutoDeriveOnTrainProgress
   */
  series_id_features: Array<string>;
}

/**
 * Check if a given object implements the FeatureAutoDeriveOnTrainProgress interface.
 */
export function instanceOfFeatureAutoDeriveOnTrainProgress(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "derive_type" in value;
  isInstance = isInstance && "series_id_features" in value;

  return isInstance;
}

export function FeatureAutoDeriveOnTrainProgressFromJSON(json: any): FeatureAutoDeriveOnTrainProgress {
  return FeatureAutoDeriveOnTrainProgressFromJSONTyped(json, false);
}

export function FeatureAutoDeriveOnTrainProgressFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): FeatureAutoDeriveOnTrainProgress {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    derive_type: json["derive_type"],
    series_id_features: json["series_id_features"],
  };
}

export function FeatureAutoDeriveOnTrainProgressToJSON(value?: FeatureAutoDeriveOnTrainProgress | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    derive_type: value.derive_type,
    series_id_features: value.series_id_features,
  };
}