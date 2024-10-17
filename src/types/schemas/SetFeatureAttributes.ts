/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * SetFeatureAttributes
 *
 * Set all features and their attributes for the trainee, and returns the updated feature attributes
 */
import type { FeatureAttributesIndex } from "./FeatureAttributesIndex";

export type SetFeatureAttributesRequest = {
  /**
   * Flag, default to true. create time series feature attributes if necessary
   * @default true
   */
  create_ts_attributes?: boolean;

  /**
   * Assoc of feature -> attributes, attributes defined below:
   *
   *   'type': string, one of 'continuous', 'ordinal' or 'nominal'. Default is 'continuous'.
   *
   *   'bounds' : assoc of of bounds for feature value generation, keys of assoc defined below as:
   *     'min': number or date string, the minimum value to be output
   *     'max': number or date string, the maximum value to be output
   *     'allowed': list of explicitly allowed values to be output. Example: ["low", "medium", "high"]
   *     'allow_null': flag, allow nulls to be output, per their distribution in the data. Defaults to true
   *     'constraint': code, whose logic has to evaluate to true for value to be considered valid.
   *       Same format as 'derived_feature_code. Example: "(> #f1 0 #f2 0)"
   *
   *   'cycle_length': integer, specifies cycle length of cyclic feature, default is no cycle length
   *
   *   'date_time_format': string datetime format, only applicable to continuous features. If specified, feature values
   *             should match the date or time format specified by this string and sets 'data_type' to 'formatted_date_time'.
   *             Example: "%Y-%m-%d". If unspecified but 'data_type' is 'formatted_date_time', this will be set to
   *             ISO8601 format of "%Y-%m-%dT%H:%M:%S", if 'data_type' is 'formatted_time', this will be
   *             ISO8601 format of "%H:%M%S".
   *
   *   'locale': string, the date time format locale. If unspecified, uses platform default locale. Example: "en_US"
   *
   *   'significant_digits': integer, round to the specified significant digits, default is no rounding
   *
   *   'decimal_places': integer, decimal places to round to, default is no rounding. If "significant_digits"
   *           is also specified, the number will be rounded to the specified number of significant
   *           digits first, then rounded to the number of decimal points as specified by this parameter
   *
   *   'observational_error': number, specifies the observational mean absolute error for this feature. Use when the error
   *             value is already known. Default is 0
   *
   *   'data_type': string, specify the data type for features with a type of nominal or continuous
   *         Defaults to 'string' for nominals and 'number' for continuous
   *         Valid values for both are: 'string', 'number', 'json', 'amalgam', 'yaml'
   *         'string_mixable', 'formatted_time' and 'formatted_date_time' are valid only when type is continuous
   *         'boolean' is valid only when type is nominal
   *
   *   'id_feature': boolean, Set to true only for nominal features containing nominal IDs to specify that this
   *         feature should be used to compute case weights for id based privacy. For time series,
   *         this feature will be used as the id for each time series generation. Default is false
   *
   *   'unique': boolean, flag feature as only having unique values. Only applicable to nominal features. Defaults to false.
   *
   *   'dependent_features': list, a list of other feature(s) that this feature depends on or that are dependent on this
   *                        feature. This restricts the cases that can be selected as neighbors (such as in react) to ones
   *             that satisfy the dependency, if possible. If this is not possible, either due to insufficient data
   *             which satisfy the dependency or because dependencies are probabilistic, the dependency may not be
   *             maintained. Be aware that dependencies introduce further constraints to data and so several
   *             dependencies or dependencies on already constrained datasets may restrict which operations are
   *             possible while maintaining the dependency. As a rule of thumb, sets of features that have
   *             dependency relationships should generally not include more than 1 continuous feature, unless
   *             the continuous features have a small number of values that are commonly used.
   *
   *   'null_is_dependent': boolean, modifies how dependent features with nulls are treated during a react, specifically
   *             when they use null as a context value. Only applicable to dependent features. When false, the
   *             feature will be treated as a non-dependent context feature. When true for nominal types,
   *             treats null as an individual dependent class value, only cases that also have nulls as this
   *             feature's value will be considered. When true for continuous types, only the cases with the
   *             same dependent feature values as the cases that also have nulls as this feature's value
   *             will be considered. Default is false.
   *
   *   'auto_derive_on_train': assoc, defines how to create and derive all the values for this feature from
   *               the trained dataset. For full list of specific 'auto_derive_on_train' feature
   *               attributes refer the comments at the top of the derive.amlg module.
   *
   *   'derived_feature_code': string, code defining how the value for this feature could be derived if this feature
   *               is specified as a "derived_context_feature" or a "derived_action_feature" during
   *               react flows. For react_series, the data referenced is the accumulated series data
   *               (as a list of rows), and for non-series reacts, the data is the one single row.
   *               Each row is comprised of all the combined context and action features. Referencing
   *               data in these rows uses 0-based indexing, where the current row index is 0, the
   *               previous row's is 1, etc. Specified code may do simple logic and numeric operations
   *               on feature values referenced via feature name and row offset.
   *               Examples:
   *               "#x 1" - Use the value for feature 'x' from the previously processed row (offset of 1, one lag value).
   *               "(- #y 0 #x 1)" - Feature 'y' value from current (offset 0) row minus feature 'x' value from previous (offset 1) row.
   *
   *   'post_process': string, custom Amalgam code that is called on resulting values of this feature during react operations.
   *           Example: "(set_digits #x 0 3.1 (list 1 0) 2 3 (false))"
   *
   *   'non_sensitive': boolean, flag a categorical nominal feature as non-sensitive. It is recommended that
   *           all nominal features be represented with either an 'int-id' subtype or another
   *           available nominal subtype using the 'subtype' attribute. However, if the nominal
   *           feature is non-sensitive, setting this parameter to true will bypass the 'subtype'
   *           requirement. Only applicable to nominal features. Default is false
   *
   *   'subtype': string, the type used in novel nominal substitution.
   *
   *   'original_type': string, original data type details. Used by clients to determine how to serialize and deserialize  feature data.
   *
   *   'original_format': string, original data formats used by clients. Automatically populated by clients
   *           to store client language specific context about features.
   *
   *   'time_series': assoc, defining time series options for a feature, keys of assoc defined below as:
   *
   *     'type': string, one of "rate" or "delta". When 'rate' is specified, uses the difference of the current value
   *         from its previous value divided by the change in time since the previous value.
   *         When 'delta' is specified, uses the difference of the current value from its previous value
   *         regardless of the elapsed time. Set to 'delta' if feature has 'time_feature' set to true.
   *
   *     'time_feature': boolean, When true, the feature will be treated as the time feature for time
   *             series modeling. Additionally, time features must use type 'delta'. Default is false.
   *
   *     'order': integer, if provided, will generate the specified number of derivatives and boundary values. Default is 1
   *
   *     'derived_orders': integer, The number of orders of derivatives that should be derived instead of synthesized.
   *             Ignored if order is not provided. Default is 0.
   *
   *     'lags': list of number, if specified, generates lag features containing previous values using the enumerated lag offsets.
   *         Takes precedence over 'num_lags'. If neither 'num_lags' nor 'lags' is specified for a feature, then a single
   *         lag feature is generated. Example: [1,2]
   *
   *     'num_lags': integer, if specified, generates the specified amount of lag features containing previous values.
   *           If 'lags' is specified, then this parameter will be ignored. If neither 'num_lags' nor 'lags' is specified
   *           for a feature, then a single lag feature is generated. Default is 1.
   *
   *     'rate_min': list of number, if specified, ensures that the rate (the difference quotient, the discrete version
   *           of derivative) for this feature won't be less than the value provided. A null value means no min boundary.
   *           The value must be in epoch format for the time feature. The length of the list must match the number of
   *           derivatives as specified by 'order'. Only applicable when time series type is set to 'rate'. Example: [0.1]
   *
   *     'rate_max': list of number, if specified, ensures that the rate (the difference quotient, the discrete version
   *           of derivative) for this feature won't be more than the value provided. A null value means no max boundary.
   *           The value must be in epoch format for the time feature. The length of the list must match the number of
   *           derivatives as specified by 'order'. Only applicable when time series type is set to 'rate'. Example: [0.8]
   *
   *     'delta_min': list of number, if specified, ensures that the smallest difference between features values is not smaller
   *           than this specified value. A null value means no min boundary. The length of the list must match the number of
   *           derivatives as specified by 'order'. Only applicable when time series type is set to 'delta'. Example: [0.2]
   *
   *     'delta_max': list of number, if specified, ensures that the largest difference between feature values is not larger than
   *           this specified value. A null value means no max boundary. The length of the list must match the number of
   *           derivatives as specified by 'order'. Only applicable when time series type is set to 'delta'. Example: [2.0]
   *
   *     'series_has_terminators': boolean, when true, requires that the model identify and learn values that explicitly denote
   *                 the end of a series. Only applicable to id features for a series. Default is false
   *
   *     'stop_on_terminator': boolean, when true, requires that a series ends on a terminator value.
   *               Only applicable to id features for a series. Default is false
   *
   *     'universal': boolean, applicable only to the time_feature, controls whether future values of independent time series are considered.
   *           When false, time_feature is not universal and allows using future data from other series in decisions;
   *           this is applicable when the time is not globally relevant and is independent for each time series.
   *           When true, universally excludes using any data with from the future from all series;
   *           this is applicable when time is globally relevant and there are events that may affect all time series.
   *           If there is any possibility of global relevancy of time, it is generally recommended to set this value to true, which is the default.
   */
  feature_attributes: FeatureAttributesIndex;
};
