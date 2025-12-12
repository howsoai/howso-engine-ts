/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 */
import type { FeatureBounds } from "./FeatureBounds";
import type { FeatureDataType } from "./FeatureDataType";
import type { FeatureOriginalType } from "./FeatureOriginalType";
import type { FeatureType } from "./FeatureType";

/**
 * The mapping of attributes for a single feature
 */
export type FeatureAttributes = {
  /**
   * Configuration for auto deriving the values of a feature based on the otehr feature values of the case or series.
   */
  auto_derive_on_train?: {
    /**
     * The Amalgam code used to derive the feature value.
     */
    code?: string;
    /**
     * A list of features needed to derive code
     */
    code_features?: string[];
    /**
     * The train derive operation type.
     */
    derive_type?: "custom" | "end" | "start";
    /**
     * Feature name(s) that define the order of the series.
     */
    ordered_by_features?: string[];
    /**
     * Feature name(s) whose values are used to identify cases within the same series.
     */
    series_id_features?: string[];
  };
  bounds?: FeatureBounds;
  /**
   * A list of features needed to derive code
   */
  code_features?: string[];
  /**
   * Cyclic features are set by specifying a `cycle_length` value in the feature attributes. `cycle_length` requires a single value, which is the upper bound of the difference for the cycle range. For example, if `cycle_length` is 360,  then a value of 1 and 359 will have a difference of 2. Cyclic features have no restrictions in the input dataset, however, cyclic features will be output on a scale from 0 to `cycle_length`. To constrain the output to a different range, modify the `min` and `max` `bounds` feature attribute.
   *
   * Examples:
   * - degrees: values should be 0-359, cycle_length = 360
   * - days: values should be 0-6, cycle_length = 7
   * - hours: values should be 0-23, cycle_length = 24
   */
  cycle_length?: number;
  data_type?: FeatureDataType;
  /**
   * If specified, feature values should match the date format specified by this string. Only applicable to continuous features.
   */
  date_time_format?: string;
  /**
   * Decimal places to round to, default is no rounding. If `significant_digits` is also specified, the number will be rounded to the specified number of significant digits first, then rounded to the number of decimal points as specified by this parameter.
   */
  decimal_places?: number;
  /**
   * The default time zone for datetimes. If unspecified, uses 'UTC'.
   */
  default_time_zone?: string;
  /**
   * A list of other feature names that this feature either depends on or features that depend on this feature. Should be used when there are multi-type value features that tightly depend on values based on other multi-type value features.
   */
  dependent_features?: string[];
  /**
   * Code defining how the value for this feature could be derived if this feature is specified as a `derived_context_feature` or a `derived_action_feature` during react flows. For `react_series`, the data referenced is the accumulated series data (as a list of rows), and for non-series reacts, the data is the one single row. Each row is comprised of all the combined context and action features. Referencing data in these rows uses 0-based indexing, where the current row index is 0, the previous row's is 1, etc. The specified code may do simple logic and numeric operations on feature values referenced via feature name and row offset
   *
   * Examples:
   * - ``"(call value {feature "x" lag 1})``: Use the value for feature 'x' from the previously processed row (offset of 1, one lag value).
   * - ``"(- (call value {feature "y" lag 0}) (call value {feature "x" lag 1}))"``: Feature 'y' value from current (offset 0) row  minus feature 'x' value from previous (offset 1) row.
   */
  derived_feature_code?: string;
  /**
   * Set to true for nominal features containing nominal IDs, specifying that his feature should be used to compute case weights for id based privacy. For time series, this feature will be used as the id for each time series generation.
   */
  id_feature?: boolean;
  /**
   * The date time format locale. If unspecified, uses platform default locale.
   */
  locale?: string;
  /**
   * The number of time steps traced back by the maximum lag feature created for this feature.
   */
  max_row_lag?: number;
  /**
   * Flag a categorical nominal feature as non-sensitive. It is recommended that all nominal features be represented with either an `int-id` subtype or another available nominal subtype using the `subtype` attribute. However, if the nominal feature is non-sensitive, setting this parameter to true will bypass the `subtype` requirement. Only applicable to nominal features.
   */
  non_sensitive?: boolean;
  /**
   * Modify how dependent features with nulls are treated during a react, specifically when they use null as a context value. Only applicable to dependent features.
   *
   * When false (default), the feature will be treated as a non-dependent context feature.
   * When true for nominal types, treats null as an individual dependent class value, only cases that also have nulls as this feature's value will be considered.
   * When true for continuous types, only the cases with the same dependent feature values as the cases that also have nulls as this feature's value will be considered.
   */
  null_is_dependent?: boolean;
  /**
   * Specifies the observational mean absolute error for this feature. Use when the error value is already known.
   */
  observational_error?: number;
  /**
   * Original data formats used by clients. Automatically populated by clients to store client language specific context about features.
   */
  original_format?: any;
  /**
   * Original data type details. Used by clients to determine how to serialize and deserialize feature data.
   */
  original_type?: FeatureOriginalType;
  /**
   * The feature whose values this time-series feature's values are derived from.
   */
  parent?: string;
  /**
   * The type of time-series processing used by the parent feature.
   */
  parent_type?: "covariate" | "delta" | "rate";
  /**
   * Custom Amalgam code that is called on resulting values of this feature during react operations.
   */
  post_process?: string;
  /**
   * A sample of a value for the feature.
   */
  sample?: any;
  /**
   * A list of feature names that will share deviations with this feature. In analysis, the predictions computed for this feature and the features specified are combined to create deviations that are used for all of the involved features. If a time series feature, then child lag features will automatically share deviations. If 'shared_deviations' is specified as false, then automatically created lag features will not automatically share deviations.
   */
  shared_deviations?: string[] | boolean;
  /**
   * Round to the specified significant digits, default is no rounding.
   */
  significant_digits?: number;
  /**
   * The type used in novel nominal substitution.
   */
  subtype?: string;
  /**
   * Time series options for a feature.
   */
  time_series?: {
    /**
     * If specified, ensures that the largest difference between feature values is not larger than this specified value. A null value means no max boundary. The length of the list must match the number of derivatives as specified by `order`. Only applicable when time series type is set to `delta`.
     */
    delta_max?: number[];
    /**
     * If specified, ensures that the smallest difference between features values is not smaller than this specified value. A null value means no min boundary. The length of the list must match the number of derivatives as specified by `order`. Only applicable when time series type is set to `delta`.
     */
    delta_min?: number[];
    /**
     * The number of orders of derivatives that should be derived instead of synthesized. Ignored if order is not provided.
     */
    derived_orders?: number;
    /**
     * If specified, generates lag features containing previous values using the enumerated lag offsets. Takes precedence over `num_lags`. If neither `num_lags` nor `lags` is specified for a feature, then a single lag feature is generated.
     */
    lags?: number[];
    /**
     * If specified, generates the specified amount of lag features containing previous values. If `lags` is specified, then this parameter will be ignored. If neither `num_lags` nor `lags` is specified for a feature, then a single lag feature is generated.
     */
    num_lags?: number;
    /**
     * If provided, will generate the specified number of derivatives and boundary values.
     */
    order?: number;
    /**
     * If specified, ensures that the rate (the difference quotient, the discrete version of derivative) for this feature won't be more than the value provided. A null value means no max boundary. The value must be in epoch format for the time feature. The length of the list must match the number of derivatives as specified by `order`. Only applicable when time series type is set to `rate`.
     */
    rate_max?: number[];
    /**
     * If specified, ensures that the rate (the difference quotient, the discrete version of derivative) for this feature won't be less than the value provided. A null value means no min boundary. The value must be in epoch format for the time feature. The length of the list must match the number of derivatives as specified by `order`. Only applicable when time series type is set to `rate`.
     */
    rate_min?: number[];
    /**
     * When true, the feature will be treated as the time feature for time series modeling. Additionally, time features must use type `delta`.
     */
    time_feature?: boolean;
    /**
     * When `rate` is specified, uses the difference of the current value from its previous value divided by the change in time since the previous value. When `delta` is specified, uses the difference of the current value from its previous value regardless of the elapsed time. Set to `delta` if feature has `time_feature` set to true. When `covariate` is specified, temporal changes are not modeled and feature values are directly predicted with interpolation in series generation rather than derived using a rate or delta.
     */
    type?: "covariate" | "delta" | "rate";
    /**
     * Controls whether future values of independent time series are considered. Applicable only to the time feature. When false, the time feature is not universal and allows using future data from other series in decisions; this is applicable when the time is not globally relevant and is independent for each time series. When true, universally excludes using any data with from the future from all series; this is applicable when time is globally relevant and there are events that may affect all time series. If there is any possibility of global relevancy of time, it is generally recommended to set this value to true, which is the default.
     */
    universal?: boolean;
  };
  /**
   * The order of rate/delta being described by this time-series feature.
   */
  ts_order?: number;
  /**
   * The type of value being captured by this time-series feature.
   */
  ts_type?: "delta" | "lag" | "rate";
  type: FeatureType;
  /**
   * Flag feature as only having unique values. Only applicable to nominals features.
   */
  unique?: boolean;
};
