/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { FeatureAutoDeriveOnTrain } from "./FeatureAutoDeriveOnTrain";
import { FeatureAutoDeriveOnTrainFromJSON, FeatureAutoDeriveOnTrainToJSON } from "./FeatureAutoDeriveOnTrain";
import type { FeatureBounds } from "./FeatureBounds";
import { FeatureBoundsFromJSON, FeatureBoundsToJSON } from "./FeatureBounds";
import type { FeatureOriginalType } from "./FeatureOriginalType";
import { FeatureOriginalTypeFromJSON, FeatureOriginalTypeToJSON } from "./FeatureOriginalType";
import type { FeatureTimeSeries } from "./FeatureTimeSeries";
import { FeatureTimeSeriesFromJSON, FeatureTimeSeriesToJSON } from "./FeatureTimeSeries";

/**
 * The mapping of attributes for a single feature.
 * @export
 * @interface FeatureAttributes
 */
export interface FeatureAttributes {
  /**
   * The type of the feature.
   *
   * - continuous: A continuous numeric value. (e.g. Temperature or humidity)
   * - nominal: A numeric or string value with no ordering. (e.g. The name of a fruit)
   * - ordinal: A nominal numeric value with ordering. (e.g. Rating scale, 1-5 stars)
   * @type {string}
   * @memberof FeatureAttributes
   */
  type: FeatureAttributesTypeEnum;
  /**
   *
   * @type {FeatureAutoDeriveOnTrain}
   * @memberof FeatureAttributes
   */
  auto_derive_on_train?: FeatureAutoDeriveOnTrain;
  /**
   *
   * @type {FeatureBounds}
   * @memberof FeatureAttributes
   */
  bounds?: FeatureBounds;
  /**
   * Cyclic features are set by specifying a `cycle_length` value in the feature attributes. `cycle_length` requires a single value, which is the upper bound of the difference for the cycle range. For example, if `cycle_length` is 360,  then a value of 1 and 359 will have a difference of 2. Cyclic features have no restrictions in the input dataset, however, cyclic features will be output on a scale from 0 to `cycle_length`. To constrain the output to a different range, modify the `min` and `max` `bounds` feature attribute.
   * Examples:
   * - degrees: values should be 0-359, cycle_length = 360
   * - days: values should be 0-6, cycle_length = 7
   * - hours: values should be 0-23, cycle_length = 24
   * @type {number}
   * @memberof FeatureAttributes
   */
  cycle_length?: number;
  /**
   * Specify the data type for features with a type of nominal or continuous. Default is `string` for nominals and
   * `number` for continuous.
   *
   * Valid values include:
   *
   * - `string`, `number`, `formatted_date_time`, `json`, `amalgam`, `yaml`: Valid for both nominal and continuous.
   *
   * - `string_mixable`: Valid only when type is continuous (predicted values may result in interpolated strings
   *   containing a combination of characters from multiple original values).
   *
   * - `boolean`: Valid only for nominals.
   * @type {string}
   * @memberof FeatureAttributes
   */
  data_type?: FeatureAttributesDataTypeEnum;
  /**
   * If specified, feature values should match the date format specified by this string. Only applicable to continuous features.
   * @type {string}
   * @memberof FeatureAttributes
   */
  date_time_format?: string;
  /**
   * Decimal places to round to, default is no rounding. If `significant_digits` is also specified, the number will be rounded to the specified number of significant digits first, then rounded to the number of decimal points as specified by this parameter.
   * @type {number}
   * @memberof FeatureAttributes
   */
  decimal_places?: number;
  /**
   * A list of other feature names that this feature either depends on or features that depend on this feature. Should be used when there are multi-type value features that tightly depend on values based on other multi-type value features.
   * @type {Array<string>}
   * @memberof FeatureAttributes
   */
  dependent_features?: Array<string>;
  /**
   * Code defining how the value for this feature could be derived if this feature is specified as a `derived_context_feature` or a `derived_action_feature` during react flows. For `react_series`, the data referenced is the accumulated series data (as a list of rows), and for non-series reacts, the data is the one single row. Each row is comprised of all the combined context and action features. Referencing data in these rows uses 0-based indexing, where the current row index is 0, the previous row's is 1, etc. The specified code may do simple logic and numeric operations on feature values referenced via feature name and row offset.
   *
   * Examples:
   * - ``"#x 1"``: Use the value for feature 'x' from the previously processed row (offset of 1, one lag value).
   * - ``"(- #y 0 #x 1)"``: Feature 'y' value from current (offset 0) row  minus feature 'x' value from previous (offset 1) row.
   * @type {string}
   * @memberof FeatureAttributes
   */
  derived_feature_code?: string;
  /**
   * Set to true for nominal features containing nominal IDs, specifying that his feature should be used to compute case weights for id based privacy. For time series, this feature will be used as the id for each time series generation.
   * @type {boolean}
   * @memberof FeatureAttributes
   */
  id_feature?: boolean;
  /**
   * The date time format locale. If unspecified, uses platform default locale.
   * @type {string}
   * @memberof FeatureAttributes
   */
  locale?: string;
  /**
   * Flag a categorical nominal feature as non-sensitive. It is recommended that all nominal features be represented with either an `int-id` subtype or another available nominal subtype using the `subtype` attribute. However, if the nominal feature is non-sensitive, setting this parameter to true will bypass the `subtype` requirement. Only applicable to nominal features.
   * @type {boolean}
   * @memberof FeatureAttributes
   */
  non_sensitive?: boolean;
  /**
   * Modify how dependent features with nulls are treated during a react, specifically when they use null as a context value. Only applicable to dependent features.
   * When false (default), the feature will be treated as a non-dependent context feature. When true for nominal types, treats null as an individual dependent class value, only cases that also have nulls as this feature's value will be considered. When true for continuous types, only the cases with the same dependent feature values as the cases that also have nulls as this feature's value will be considered.
   * @type {boolean}
   * @memberof FeatureAttributes
   */
  null_is_dependent?: boolean;
  /**
   * Specifies the observational mean absolute error for this feature. Use when the error value is already known. Defaults to 0.
   * @type {number}
   * @memberof FeatureAttributes
   */
  observational_error?: number;
  /**
   *
   * @type {FeatureOriginalType}
   * @memberof FeatureAttributes
   */
  original_type?: FeatureOriginalType;
  /**
   * Original data formats used by clients. Automatically populated by clients to store client language specific context about features.
   * @type {{ [key: string]: any; }}
   * @memberof FeatureAttributes
   */
  original_format?: { [key: string]: any };
  /**
   * Custom Amalgam code that is called on resulting values of this feature during react operations.
   * @type {string}
   * @memberof FeatureAttributes
   */
  post_process?: string;
  /**
   * A stringified sample of non-null data from the feature if available. The `include_sample` parameter must be specified during infer feature attributes for this property to be returned.
   * @type {string}
   * @memberof FeatureAttributes
   */
  sample?: string | null;
  /**
   * Round to the specified significant digits, default is no rounding.
   * @type {number}
   * @memberof FeatureAttributes
   */
  significant_digits?: number;
  /**
   * The type used in novel nominal substitution.
   * @type {string}
   * @memberof FeatureAttributes
   */
  subtype?: string;
  /**
   *
   * @type {FeatureTimeSeries}
   * @memberof FeatureAttributes
   */
  time_series?: FeatureTimeSeries;
  /**
   * Flag feature as only having unique values. Only applicable to nominals features.
   * @type {boolean}
   * @memberof FeatureAttributes
   */
  unique?: boolean;
}

/**
 * @export
 * @enum {string}
 */
export type FeatureAttributesTypeEnum = "continuous" | "nominal" | "ordinal";
/**
 * @export
 * @enum {string}
 */
export type FeatureAttributesDataTypeEnum =
  | "string"
  | "number"
  | "boolean"
  | "formatted_date_time"
  | "string_mixable"
  | "json"
  | "yaml"
  | "amalgam";

/**
 * Check if a given object implements the FeatureAttributes interface.
 */
export function instanceOfFeatureAttributes(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "type" in value;

  return isInstance;
}

export function FeatureAttributesFromJSON(json: any): FeatureAttributes {
  return FeatureAttributesFromJSONTyped(json, false);
}

export function FeatureAttributesFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureAttributes {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    type: json["type"],
    auto_derive_on_train: !exists(json, "auto_derive_on_train")
      ? undefined
      : FeatureAutoDeriveOnTrainFromJSON(json["auto_derive_on_train"]),
    bounds: !exists(json, "bounds") ? undefined : FeatureBoundsFromJSON(json["bounds"]),
    cycle_length: !exists(json, "cycle_length") ? undefined : json["cycle_length"],
    data_type: !exists(json, "data_type") ? undefined : json["data_type"],
    date_time_format: !exists(json, "date_time_format") ? undefined : json["date_time_format"],
    decimal_places: !exists(json, "decimal_places") ? undefined : json["decimal_places"],
    dependent_features: !exists(json, "dependent_features") ? undefined : json["dependent_features"],
    derived_feature_code: !exists(json, "derived_feature_code") ? undefined : json["derived_feature_code"],
    id_feature: !exists(json, "id_feature") ? undefined : json["id_feature"],
    locale: !exists(json, "locale") ? undefined : json["locale"],
    non_sensitive: !exists(json, "non_sensitive") ? undefined : json["non_sensitive"],
    null_is_dependent: !exists(json, "null_is_dependent") ? undefined : json["null_is_dependent"],
    observational_error: !exists(json, "observational_error") ? undefined : json["observational_error"],
    original_type: !exists(json, "original_type") ? undefined : FeatureOriginalTypeFromJSON(json["original_type"]),
    original_format: !exists(json, "original_format") ? undefined : json["original_format"],
    post_process: !exists(json, "post_process") ? undefined : json["post_process"],
    sample: !exists(json, "sample") ? undefined : json["sample"],
    significant_digits: !exists(json, "significant_digits") ? undefined : json["significant_digits"],
    subtype: !exists(json, "subtype") ? undefined : json["subtype"],
    time_series: !exists(json, "time_series") ? undefined : FeatureTimeSeriesFromJSON(json["time_series"]),
    unique: !exists(json, "unique") ? undefined : json["unique"],
  };
}

export function FeatureAttributesToJSON(value?: FeatureAttributes | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    type: value.type,
    auto_derive_on_train: FeatureAutoDeriveOnTrainToJSON(value.auto_derive_on_train),
    bounds: FeatureBoundsToJSON(value.bounds),
    cycle_length: value.cycle_length,
    data_type: value.data_type,
    date_time_format: value.date_time_format,
    decimal_places: value.decimal_places,
    dependent_features: value.dependent_features,
    derived_feature_code: value.derived_feature_code,
    id_feature: value.id_feature,
    locale: value.locale,
    non_sensitive: value.non_sensitive,
    null_is_dependent: value.null_is_dependent,
    observational_error: value.observational_error,
    original_type: FeatureOriginalTypeToJSON(value.original_type),
    original_format: value.original_format,
    post_process: value.post_process,
    sample: value.sample,
    significant_digits: value.significant_digits,
    subtype: value.subtype,
    time_series: FeatureTimeSeriesToJSON(value.time_series),
    unique: value.unique,
  };
}
