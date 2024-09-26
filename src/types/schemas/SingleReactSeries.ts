/**
 * SingleReactSeries
 *
 * React in a series until a series_stop_map condition is met. aggregates rows of data corresponding to the specified context, action,
 * derived_context and derived_action features, utilizing previous rows to derive values as necessary. outputs an assoc of "action_features" and
 * corresponding "series" where "series" is the completed 'matrix' for the corresponding action_features and derived_action_features.
 *
 * NOTE: This file is auto generated, do not modify manually.
 */
import { FeatureBoundsMap } from "./FeatureBoundsMap";
import { GenerateNewCases } from "./GenerateNewCases";

export type SingleReactSeriesRequest = {
  /*
   * List of feature names corresponding to values in each row of action_values
   * @default []
   */
  action_features?: string[];

  /*
   * List of predicted feature values for non time-series features
   * @default []
   */
  action_values?: any[];

  /*
   * List of feature names corresponding to values in each row of context_values
   * @default []
   */
  context_features?: string[];

  /*
   * List of context feature values for non time-series features
   * @default []
   */
  context_values?: any[];

  /*
   * Flag, default is false.  when true will attempt to continue existing series instead of starting new series.
   *   if initial_values provide series ids, it will continue those explicitly specified ids, otherwise it will randomly select series to continue.
   *   note: terminated series with terminators cannot be continued and will result in null output.
   * @default false
   */
  continue_series?: boolean;

  /*
   * List of features corresponding to the values in each row of continue_series_values.
   *   this value is ignored if continue_series_values is not specified.
   */
  continue_series_features?: string[];

  /*
   * List of lists of values, when specified will continue this specific untrained series as defined by these values.
   *   continue_series flag will be ignored and treated as true if this value is specified.
   */
  continue_series_values?: any[][];

  /*
   * List of action features whose values should be computed from the resulting last row in series, in the specified
   *   order. must be a subset of action_features.
   *   note: both of these derived feature lists rely on the features' "derived_feature_code" attribute to compute the values.
   *   if 'derived_feature_code' attribute is undefined or references non-existing feature indices, the derived value will be null.
   * @default []
   */
  derived_action_features?: string[];

  /*
   * List of context features whose values should be computed from the entire series in the specified order.
   *   must be different than context_features.
   * @default []
   */
  derived_context_features?: string[];

  /*
   * If null, will do a discriminative react. if specified, will do a generative react
   *   for generative react, value of desired avg conviction of generated cases, in the range of (0,infinity] with 1 as standard
   *   larger values will increase the variance (or creativity) of the generated case from the existing model
   *   smaller values will decrease the variance (or creativity) of the generated case from the existing model
   */
  desired_conviction?: number;

  /*
   * List of additional features to return with audit data from details
   * @default []
   */
  extra_features?: string[];

  /*
   * Assoc of :
   *     to ensure that specified features' generated values stay in bounds
   *   for nominal features instead of min/max it's a set of allowed values, ie:
   *     allow_null - default is true, if true nulls may be generated per their distribution in the data
   * @default {}
   */
  feature_bounds_map?: Record<string, FeatureBoundsMap>;

  /*
   * Enum, acceptable values are:
   *   null or 'no' : output any generated case
   *   'always' : only output original cases, outputs null for all feature values if unable to generate a new case
   *   'attempt' : output any generated case only if generation fails all initial attempts to output original cases
   * @default "no"
   */
  generate_new_cases?: GenerateNewCases;

  /*
   * List of features to condition just the first case in a series, overwrites context_features and
   *   derived_context_features for that first case. all specified initial features must be in one of: context_features, action_features,
   *   derived_context_features or derived_action_features. if provided a value that isn't in one of those lists, it will be ignored.
   * @default []
   */
  initial_features?: string[];

  /*
   * List of values corresponding to the initial_features, used to condition just the first case in a series.
   */
  initial_values?: any[];

  /*
   * Flag, if set to true assumes provided categorical (nominal or ordinal) feature values already been substituted.
   * @default false
   */
  input_is_substituted?: boolean;

  /*
   * Maximum size a series is allowed to be.  default is 3 * model_size, a 0 or less is no limit.
   *   if forecasting with 'continue_series', this defines the maximum length of the forecast.
   */
  max_series_length?: number;

  /*
   * Distance to determine privacy cutoff. used to query the local minimum distance used in the distance ratio
   *    accepted values:
   *      'max': the maximum local distance
   *      'min': the minimum local distance
   *      'most_similar': the closest distance of the most similar case
   *      null: the minimum local distance
   * @default "min"
   */
  new_case_threshold?: string;

  /*
   * Flag, default to true. if true, series ids are replaced with unique values on output.
   *   if false, will maintain or replace ids with existing trained values, but also allows output of series with duplicate existing ids.
   * @default true
   */
  output_new_series_ids?: boolean;

  /*
   * List of features that will preserve their values from the case specified by case_indices, appending and
   *   overwriting the specified context and context features as necessary.  for generative reacts, if case_indices isn't specified,
   *   will preserve feature values of a random case.
   * @default []
   */
  preserve_feature_values?: string[];

  /*
   * List of features corresponding to series_context_values
   * @default []
   */
  series_context_features?: string[];

  /*
   * 2d-list of values, context value for each feature for each row of the series.
   *   if specified, max_series_length is ignored.
   * @default []
   */
  series_context_values?: any[][];

  /*
   * Controls how closely generated series should follow existing series (plural).
   *   choices are: "fixed", "dynamic" or "no". if "fixed", tracks the particular relevant series id. if "dynamic", tracks the particular
   *   relevant series id, but is allowed to change the series id that it tracks based on its current context. if "no", does not track any particular series id.
   * @default "fixed"
   */
  series_id_tracking?: "fixed" | "dynamic" | "no";

  /*
   * Assoc of feature -> stop conditions:
   *   for continuous features:  { feature:  { "min" : val,  "max": val } } - stops series when feature value exceeds max or is smaller than min
   *   for nominal features:  { feature:  { "values" : ['val1', 'val2' ]} }  - stops series when feature value matches any of the values listed
   *   specifying ".series_progress" with a value between 0 and 1.0 corresponding to percent completion e.g., { ".series_progress" : .95 } -
   *     stops series when it progresses at or beyond 95%.
   * @default {}
   */
  series_stop_map?: Record<string, any>;

  /*
   * Flag, default is true, only applicable if a substitution value map has been set. if set to false, will not substitute categorical feature values.
   * @default true
   */
  substitute_output?: boolean;

  /*
   * Flag, whether to use case weights or not. if unspecified will automatically select based on cached parameters
   */
  use_case_weights?: boolean;

  /*
   * Flag, if false uses model feature residuals, if true recalculates regional model residuals.
   * @default true
   */
  use_regional_model_residuals?: boolean;

  /*
   * Name of the feature that stores case weights
   * @default ".case_weight"
   */
  weight_feature?: string;
};
