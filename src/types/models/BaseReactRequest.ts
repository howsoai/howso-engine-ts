/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists, mapValues } from "../runtime";
import type { FeatureBounds } from "./FeatureBounds";
import { FeatureBoundsFromJSON, FeatureBoundsToJSON } from "./FeatureBounds";
import type { ReactDetails } from "./ReactDetails";
import { ReactDetailsFromJSON, ReactDetailsToJSON } from "./ReactDetails";

/**
 * Base parameters that apply to react and react series operations.
 * @export
 * @interface BaseReactRequest
 */
export interface BaseReactRequest {
  /**
   * A 2D array of context values.
   * @type {Array<Array<any>>}
   * @memberof BaseReactRequest
   */
  contexts?: Array<Array<any>>;
  /**
   * One or more values for action features, if specified will only return the specified explanation
   * details for the given actions.
   * @type {Array<Array<any>>}
   * @memberof BaseReactRequest
   */
  actions?: Array<Array<any>>;
  /**
   * If set to true, assumes provided categorical (nominal or ordinal) feature values have already been substituted.
   * @type {boolean}
   * @memberof BaseReactRequest
   */
  input_is_substituted?: boolean;
  /**
   * Only applicable if a substitution value map has been set. If set to false, will not substitute categorical feature values.
   * @type {boolean}
   * @memberof BaseReactRequest
   */
  substitute_output?: boolean;
  /**
   *
   * @type {ReactDetails}
   * @memberof BaseReactRequest
   */
  details?: ReactDetails;
  /**
   * The context features to use for this reaction.
   * @type {Array<string>}
   * @memberof BaseReactRequest
   */
  context_features?: Array<string>;
  /**
   * The action features to use for this reaction.
   * @type {Array<string>}
   * @memberof BaseReactRequest
   */
  action_features?: Array<string>;
  /**
   * A list of feature names whose values should be computed from the provided context in the specified order.
   *
   * Note: Relies on the features' "derived_feature_code" attribute to compute the values. If "derived_feature_code"
   * attribute is undefined or references non-0 feature indices, the derived value will be null.
   * @type {Array<string>}
   * @memberof BaseReactRequest
   */
  derived_context_features?: Array<string>;
  /**
   * A list of feature names whose values should be computed after reaction from the resulting case prior to output, in the specified order.
   *
   * Note: Relies on the features' "derived_feature_code" attribute to compute the values. If "derived_feature_code"
   * attribute is undefined or references non-0 feature indices, the derived value will be null.
   * @type {Array<string>}
   * @memberof BaseReactRequest
   */
  derived_action_features?: Array<string>;
  /**
   * If specified will execute a generative react. If not specified will executed a discriminative react. Conviction is the ratio of expected surprisal to generated surprisal for each feature generated, values are in the range of (0,infinity].
   * @type {number}
   * @memberof BaseReactRequest
   */
  desired_conviction?: number;
  /**
   * For generative reacts only. If true, excludes features which have a subtype in their feature attributes from the uniqueness check performed when generate_new_cases is "always".
   * @type {boolean}
   * @memberof BaseReactRequest
   */
  exclude_novel_nominals_from_uniqueness_check?: boolean;
  /**
   * For generative reacts only. If false uses model feature residuals, if true recalculates regional model residuals.
   * @type {boolean}
   * @memberof BaseReactRequest
   */
  use_regional_model_residuals?: boolean;
  /**
   * For generative reacts only.
   * @type {{ [key: string]: FeatureBounds; }}
   * @memberof BaseReactRequest
   */
  feature_bounds_map?: { [key: string]: FeatureBounds };
  /**
   * Control whether generated cases can be those that already exist in the model. This parameter takes in a string that could be one of the following:
   *   a. "attempt": attempts to generate new cases and if its not possible to generate a new case, it might generate cases in "no" mode (see point c.)
   *   b. "always": always generates new cases and if its not possible to generate a new case, it returns nulls.
   *   c. "no": generates data based on the `desired_conviction` specified and the generated data is not guaranteed to be a new case (that is, a case not found in original dataset.)
   * @type {string}
   * @memberof BaseReactRequest
   */
  generate_new_cases?: BaseReactRequestGenerateNewCasesEnum;
  /**
   * List of features that will preserve their values from the case specified by `case_indices`, appending and overwriting the specified contexts as necessary. For generative reacts, if `case_indices` isn't specified will preserve feature values of a random case.
   * @type {Array<string>}
   * @memberof BaseReactRequest
   */
  preserve_feature_values?: Array<string>;
  /**
   * The privacy distance criteria for generated new cases.
   * @type {string}
   * @memberof BaseReactRequest
   */
  new_case_threshold?: BaseReactRequestNewCaseThresholdEnum;
  /**
   * List of tuples, of session id and index, where index is the original 0-based index of the case as it was trained into the session. If this case does not exist, discriminative react outputs null, generative react ignores it.
   * @type {Array<Array<any>>}
   * @memberof BaseReactRequest
   */
  case_indices?: Array<Array<any>>;
  /**
   * If set to True and specified along with case_indices, each individual react will respectively ignore the corresponding case specified by case_indices by leaving it out.
   * @type {boolean}
   * @memberof BaseReactRequest
   */
  leave_case_out?: boolean;
  /**
   * For generative reacts only. Features will be generated in the same order as provided in the 'action_features' parameter.
   * @type {boolean}
   * @memberof BaseReactRequest
   */
  ordered_by_specified_features?: boolean;
  /**
   * If set to True will scale influence weights by each case's weight_feature weight. If unspecified, case weights will be used if the Trainee has them.
   * @type {boolean}
   * @memberof BaseReactRequest
   */
  use_case_weights?: boolean;
  /**
   * The name of the feature whose values to use as case weights. When left unspecified, uses the internally
   * managed case weight.
   * @type {string}
   * @memberof BaseReactRequest
   */
  weight_feature?: string;
}

/**
 * @export
 * @enum {string}
 */
export type BaseReactRequestGenerateNewCasesEnum = "attempt" | "always" | "no";
/**
 * @export
 * @enum {string}
 */
export type BaseReactRequestNewCaseThresholdEnum = "min" | "max" | "most_similar";

/**
 * Check if a given object implements the BaseReactRequest interface.
 */
export function instanceOfBaseReactRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function BaseReactRequestFromJSON(json: any): BaseReactRequest {
  return BaseReactRequestFromJSONTyped(json, false);
}

export function BaseReactRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): BaseReactRequest {
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
  };
}

export function BaseReactRequestToJSON(value?: BaseReactRequest | null): any {
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
  };
}
