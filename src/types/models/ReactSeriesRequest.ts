/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists, mapValues } from "../runtime";
import type { FeatureBounds } from "./FeatureBounds";
import { FeatureBoundsFromJSON, FeatureBoundsToJSON } from "./FeatureBounds";
import type { ReactDetails } from "./ReactDetails";
import { ReactDetailsFromJSON, ReactDetailsToJSON } from "./ReactDetails";

/**
 *
 * @export
 * @interface ReactSeriesRequest
 */
export interface ReactSeriesRequest {
  /**
   * A 2D array of context values.
   * @type {Array<Array<any>>}
   * @memberof ReactSeriesRequest
   */
  contexts?: Array<Array<any>>;
  /**
   * One or more values for action features, if specified will only return the specified explanation
   * details for the given actions.
   * @type {Array<Array<any>>}
   * @memberof ReactSeriesRequest
   */
  actions?: Array<Array<any>>;
  /**
   * If set to true, assumes provided categorical (nominal or ordinal) feature values have already been substituted.
   * @type {boolean}
   * @memberof ReactSeriesRequest
   */
  input_is_substituted?: boolean;
  /**
   * Only applicable if a substitution value map has been set. If set to false, will not substitute categorical feature values.
   * @type {boolean}
   * @memberof ReactSeriesRequest
   */
  substitute_output?: boolean;
  /**
   *
   * @type {ReactDetails}
   * @memberof ReactSeriesRequest
   */
  details?: ReactDetails;
  /**
   * The context features to use for this reaction.
   * @type {Array<string>}
   * @memberof ReactSeriesRequest
   */
  context_features?: Array<string>;
  /**
   * The action features to use for this reaction.
   * @type {Array<string>}
   * @memberof ReactSeriesRequest
   */
  action_features?: Array<string>;
  /**
   * A list of feature names whose values should be computed from the provided context in the specified order.
   *
   * Note: Relies on the features' "derived_feature_code" attribute to compute the values. If "derived_feature_code"
   * attribute is undefined or references non-0 feature indices, the derived value will be null.
   * @type {Array<string>}
   * @memberof ReactSeriesRequest
   */
  derived_context_features?: Array<string>;
  /**
   * A list of feature names whose values should be computed after reaction from the resulting case prior to output, in the specified order.
   *
   * Note: Relies on the features' "derived_feature_code" attribute to compute the values. If "derived_feature_code"
   * attribute is undefined or references non-0 feature indices, the derived value will be null.
   * @type {Array<string>}
   * @memberof ReactSeriesRequest
   */
  derived_action_features?: Array<string>;
  /**
   * If specified will execute a generative react. If not specified will executed a discriminative react. Conviction is the ratio of expected surprisal to generated surprisal for each feature generated, values are in the range of (0,infinity].
   * @type {number}
   * @memberof ReactSeriesRequest
   */
  desired_conviction?: number;
  /**
   * For generative reacts only. If true, excludes features which have a subtype in their feature attributes from the uniqueness check performed when generate_new_cases is "always".
   * @type {boolean}
   * @memberof ReactSeriesRequest
   */
  exclude_novel_nominals_from_uniqueness_check?: boolean;
  /**
   * For generative reacts only. If false uses model feature residuals, if true recalculates regional model residuals.
   * @type {boolean}
   * @memberof ReactSeriesRequest
   */
  use_regional_model_residuals?: boolean;
  /**
   * For generative reacts only.
   * @type {{ [key: string]: FeatureBounds; }}
   * @memberof ReactSeriesRequest
   */
  feature_bounds_map?: { [key: string]: FeatureBounds };
  /**
   * Control whether generated cases can be those that already exist in the model. This parameter takes in a string that could be one of the following:
   *   a. "attempt": attempts to generate new cases and if its not possible to generate a new case, it might generate cases in "no" mode (see point c.)
   *   b. "always": always generates new cases and if its not possible to generate a new case, it returns nulls.
   *   c. "no": generates data based on the `desired_conviction` specified and the generated data is not guaranteed to be a new case (that is, a case not found in original dataset.)
   * @type {string}
   * @memberof ReactSeriesRequest
   */
  generate_new_cases?: ReactSeriesRequestGenerateNewCasesEnum;
  /**
   * List of features that will preserve their values from the case specified by `case_indices`, appending and overwriting the specified contexts as necessary. For generative reacts, if `case_indices` isn't specified will preserve feature values of a random case.
   * @type {Array<string>}
   * @memberof ReactSeriesRequest
   */
  preserve_feature_values?: Array<string>;
  /**
   * The privacy distance criteria for generated new cases.
   * @type {string}
   * @memberof ReactSeriesRequest
   */
  new_case_threshold?: ReactSeriesRequestNewCaseThresholdEnum;
  /**
   * List of tuples, of session id and index, where index is the original 0-based index of the case as it was trained into the session. If this case does not exist, discriminative react outputs null, generative react ignores it.
   * @type {Array<Array<any>>}
   * @memberof ReactSeriesRequest
   */
  case_indices?: Array<Array<any>>;
  /**
   * If set to True and specified along with case_indices, each individual react will respectively ignore the corresponding case specified by case_indices by leaving it out.
   * @type {boolean}
   * @memberof ReactSeriesRequest
   */
  leave_case_out?: boolean;
  /**
   * For generative reacts only. Features will be generated in the same order as provided in the 'action_features' parameter.
   * @type {boolean}
   * @memberof ReactSeriesRequest
   */
  ordered_by_specified_features?: boolean;
  /**
   * If set to True will scale influence weights by each case's weight_feature weight. If unspecified, case weights will be used if the Trainee has them.
   * @type {boolean}
   * @memberof ReactSeriesRequest
   */
  use_case_weights?: boolean;
  /**
   * The name of the feature whose values to use as case weights. When left unspecified, uses the internally
   * managed case weight.
   * @type {string}
   * @memberof ReactSeriesRequest
   */
  weight_feature?: string;
  /**
   * The number of series to generate.
   * @type {number}
   * @memberof ReactSeriesRequest
   */
  num_series_to_generate?: number;
  /**
   * When True, series ids are replaced with unique values on output. When False, will maintain or replace ids with existing trained values, but also allows output of series with duplicate existing ids.
   * @type {boolean}
   * @memberof ReactSeriesRequest
   */
  output_new_series_ids?: boolean;
  /**
   * Controls how closely generated series should follow existing series (plural). Choices are: "fixed" , "dynamic" or "no":
   *   a. "fixed", tracks the particular relevant series ID.
   *   b. "dynamic", tracks the particular relevant series ID, but is allowed to change the series ID that it tracks based on its current context.
   *   c. "no", does not track any particular series ID.
   * @type {string}
   * @memberof ReactSeriesRequest
   */
  series_id_tracking?: ReactSeriesRequestSeriesIdTrackingEnum;
  /**
   * Map of feature name to stop conditions. Stops series when a feature's value meets the specified conditions. When set, must provide either one mapping to apply to all series, or a mapping for each series.
   * @type {Array<any>}
   * @memberof ReactSeriesRequest
   */
  series_stop_maps?: Array<any>;
  /**
   * The maximum size a series is allowed to be. Default is 3 * model_size. A value of 0 is no limit. If forecasting using 'continue_series', then this value defines the maximum length of the forecast. When set, must provide either one max to apply to all series, or a max for each series.
   * @type {Array<number>}
   * @memberof ReactSeriesRequest
   */
  max_series_lengths?: Array<number>;
  /**
   * List of features to condition just the first case in a series, overwrites 'context_features' and 'derived_context_features' for that first case. All specified initial features must be in one of: 'context_features', 'action_features', 'derived_context_features' or 'derived_action_features'.
   * @type {Array<string>}
   * @memberof ReactSeriesRequest
   */
  initial_features?: Array<string>;
  /**
   * A 2d list of values corresponding to the initial_features, used to condition just the first case in each series. When set, must provide either one value to apply to all series, or a value for each series.
   * @type {Array<Array<any>>}
   * @memberof ReactSeriesRequest
   */
  initial_values?: Array<Array<any>>;
  /**
   * A 3d-list of context values, one for each feature for each row for each series. If specified, 'max_series_lengths' are ignored.
   * @type {Array<Array<Array<any>>>}
   * @memberof ReactSeriesRequest
   */
  series_context_values?: Array<Array<Array<any>>>;
  /**
   * List of context features corresponding to 'series_context_values', if specified must not overlap with any 'initial_features' or 'context_features'.
   * @type {Array<string>}
   * @memberof ReactSeriesRequest
   */
  series_context_features?: Array<string>;
  /**
   * The time steps at which to end synthesis. Time-series only. Must provide either one for all series, or exactly one per series.
   * @type {Array<any>}
   * @memberof ReactSeriesRequest
   */
  final_time_steps?: Array<any>;
  /**
   * The time steps at which to begin synthesis. Time-series only. Must provide either one for all series, or exactly one per series.
   * @type {Array<any>}
   * @memberof ReactSeriesRequest
   */
  init_time_steps?: Array<any>;
  /**
   * When true will attempt to continue existing series instead of starting new series. If continue_series_values is specified, then that series data will be forecasted. If initial_values provide series IDs, it will continue those explicitly specified IDs, otherwise it will randomly select series to continue. Note: terminated series with terminators cannot be continued and will result in null output.
   * @type {boolean}
   * @memberof ReactSeriesRequest
   */
  continue_series?: boolean;
  /**
   * The list of feature names corresponding to the values in each row of continue_series_values. This value is ignored if continue_series_values is not specified.
   * @type {Array<string>}
   * @memberof ReactSeriesRequest
   */
  continue_series_features?: Array<string>;
  /**
   * A 3d list of series data to be forecasted with feature values in the same order defined by continue_series_features. The value of continue_series will be ignored and treated as true if this value is specified.
   * @type {Array<Array<Array<any>>>}
   * @memberof ReactSeriesRequest
   */
  continue_series_values?: Array<Array<Array<any>>>;
}

/**
 * @export
 * @enum {string}
 */
export type ReactSeriesRequestGenerateNewCasesEnum = "attempt" | "always" | "no";
/**
 * @export
 * @enum {string}
 */
export type ReactSeriesRequestNewCaseThresholdEnum = "min" | "max" | "most_similar";
/**
 * @export
 * @enum {string}
 */
export type ReactSeriesRequestSeriesIdTrackingEnum = "fixed" | "dynamic" | "no";

/**
 * Check if a given object implements the ReactSeriesRequest interface.
 */
export function instanceOfReactSeriesRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ReactSeriesRequestFromJSON(json: any): ReactSeriesRequest {
  return ReactSeriesRequestFromJSONTyped(json, false);
}

export function ReactSeriesRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReactSeriesRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    contexts: !exists(json, "contexts") ? undefined : json["contexts"],
    actions: !exists(json, "actions") ? undefined : json["actions"],
    input_is_substituted: !exists(json, "input_is_substituted") ? undefined : json["input_is_substituted"],
    substitute_output: !exists(json, "substitute_output") ? undefined : json["substitute_output"],
    details: !exists(json, "details") ? undefined : ReactDetailsFromJSON(json["details"]),
    context_features: !exists(json, "context_features") ? undefined : json["context_features"],
    action_features: !exists(json, "action_features") ? undefined : json["action_features"],
    derived_context_features: !exists(json, "derived_context_features") ? undefined : json["derived_context_features"],
    derived_action_features: !exists(json, "derived_action_features") ? undefined : json["derived_action_features"],
    desired_conviction: !exists(json, "desired_conviction") ? undefined : json["desired_conviction"],
    exclude_novel_nominals_from_uniqueness_check: !exists(json, "exclude_novel_nominals_from_uniqueness_check")
      ? undefined
      : json["exclude_novel_nominals_from_uniqueness_check"],
    use_regional_model_residuals: !exists(json, "use_regional_model_residuals")
      ? undefined
      : json["use_regional_model_residuals"],
    feature_bounds_map: !exists(json, "feature_bounds_map")
      ? undefined
      : mapValues(json["feature_bounds_map"], FeatureBoundsFromJSON),
    generate_new_cases: !exists(json, "generate_new_cases") ? undefined : json["generate_new_cases"],
    preserve_feature_values: !exists(json, "preserve_feature_values") ? undefined : json["preserve_feature_values"],
    new_case_threshold: !exists(json, "new_case_threshold") ? undefined : json["new_case_threshold"],
    case_indices: !exists(json, "case_indices") ? undefined : json["case_indices"],
    leave_case_out: !exists(json, "leave_case_out") ? undefined : json["leave_case_out"],
    ordered_by_specified_features: !exists(json, "ordered_by_specified_features")
      ? undefined
      : json["ordered_by_specified_features"],
    use_case_weights: !exists(json, "use_case_weights") ? undefined : json["use_case_weights"],
    weight_feature: !exists(json, "weight_feature") ? undefined : json["weight_feature"],
    num_series_to_generate: !exists(json, "num_series_to_generate") ? undefined : json["num_series_to_generate"],
    output_new_series_ids: !exists(json, "output_new_series_ids") ? undefined : json["output_new_series_ids"],
    series_id_tracking: !exists(json, "series_id_tracking") ? undefined : json["series_id_tracking"],
    series_stop_maps: !exists(json, "series_stop_maps") ? undefined : json["series_stop_maps"],
    max_series_lengths: !exists(json, "max_series_lengths") ? undefined : json["max_series_lengths"],
    initial_features: !exists(json, "initial_features") ? undefined : json["initial_features"],
    initial_values: !exists(json, "initial_values") ? undefined : json["initial_values"],
    series_context_values: !exists(json, "series_context_values") ? undefined : json["series_context_values"],
    series_context_features: !exists(json, "series_context_features") ? undefined : json["series_context_features"],
    final_time_steps: !exists(json, "final_time_steps") ? undefined : json["final_time_steps"],
    init_time_steps: !exists(json, "init_time_steps") ? undefined : json["init_time_steps"],
    continue_series: !exists(json, "continue_series") ? undefined : json["continue_series"],
    continue_series_features: !exists(json, "continue_series_features") ? undefined : json["continue_series_features"],
    continue_series_values: !exists(json, "continue_series_values") ? undefined : json["continue_series_values"],
  };
}

export function ReactSeriesRequestToJSON(value?: ReactSeriesRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    contexts: value.contexts,
    actions: value.actions,
    input_is_substituted: value.input_is_substituted,
    substitute_output: value.substitute_output,
    details: ReactDetailsToJSON(value.details),
    context_features: value.context_features,
    action_features: value.action_features,
    derived_context_features: value.derived_context_features,
    derived_action_features: value.derived_action_features,
    desired_conviction: value.desired_conviction,
    exclude_novel_nominals_from_uniqueness_check: value.exclude_novel_nominals_from_uniqueness_check,
    use_regional_model_residuals: value.use_regional_model_residuals,
    feature_bounds_map:
      value.feature_bounds_map === undefined ? undefined : mapValues(value.feature_bounds_map, FeatureBoundsToJSON),
    generate_new_cases: value.generate_new_cases,
    preserve_feature_values: value.preserve_feature_values,
    new_case_threshold: value.new_case_threshold,
    case_indices: value.case_indices,
    leave_case_out: value.leave_case_out,
    ordered_by_specified_features: value.ordered_by_specified_features,
    use_case_weights: value.use_case_weights,
    weight_feature: value.weight_feature,
    num_series_to_generate: value.num_series_to_generate,
    output_new_series_ids: value.output_new_series_ids,
    series_id_tracking: value.series_id_tracking,
    series_stop_maps: value.series_stop_maps,
    max_series_lengths: value.max_series_lengths,
    initial_features: value.initial_features,
    initial_values: value.initial_values,
    series_context_values: value.series_context_values,
    series_context_features: value.series_context_features,
    final_time_steps: value.final_time_steps,
    init_time_steps: value.init_time_steps,
    continue_series: value.continue_series,
    continue_series_features: value.continue_series_features,
    continue_series_values: value.continue_series_values,
  };
}
