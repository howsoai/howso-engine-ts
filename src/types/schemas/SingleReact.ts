/**
 * SingleReact
 *
 * React to a provided context. if desired_conviction is provided, it does a generative react.
 *
 * output:
 *  default output of this method is a react object in the format of
 *  { 'action_values' : [ all_action_values ], 'action_features' : [ all_action_features ] }, where all_action_values is a list of all action
 *  values, reacted/generated and derived, in the same order as all_action_features, e.g., [2, "a", .75384] to match ['width','name','height']
 *  if details is specified, the react object will contain appropriate additional details properties and values,
 *    details example: { 'action_values': [2, "a", .75384], 'action_features' : ['width','name','height'], 'residual_conviction': 1.3,
 *     'influential_cases' : etc... }
 *   see api docs for documentation of all output properties
 * {long_running (true)}
 *
 * NOTE: This file is auto generated, do not modify manually.
 */
import { GenerateNewCases } from "./GenerateNewCases";
import { ReactDetails } from "./ReactDetails";
import { FeatureBoundsMap } from "./FeatureBoundsMap";
import { NewCaseThreshold } from "./NewCaseThreshold";

export type SingleReactRequest = {
  /*
   * Full list of features to output values for the case
   * @default []
   */
  action_features?: string[];

  /*
   * Values of action features. if specified will bypass react and only do the explanation if details is set
   * @default []
   */
  action_values?: any[];

  /*
   * Flag, if set to true will allow return of null values if there are nulls in the local model for the action features. applicable
   *   only to discriminative reacts.
   * @default false
   */
  allow_nulls?: boolean;

  /*
   * Pair (list) of session id and index, where index is the original 0-based session_training_index of the case as it was
   *       trained into the session. if this case does not exist, discriminative react outputs null, generative react ignores it.
   */
  case_indices?: (string | number)[];

  /*
   * List of context features. for generative react, features used to condition the generated case
   * @default []
   */
  context_features?: string[];

  /*
   * List of context values, for generative react, values used to condition the generated case
   * @default []
   */
  context_values?: any[];

  /*
   * List of action features whose values should be computed from the resulting action prior to output, in the specified
   *   order. must be a subset of action_features.
   *   note: both of these derived feature lists rely on the features' "derived_feature_code" attribute to compute the values.
   *   if 'derived_feature_code' attribute is undefined or references non-0 feature indices, the derived value will be null.
   * @default []
   */
  derived_action_features?: string[];

  /*
   * List of context features whose values should be computed from the provided contexts in the specified order.
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
   * See the description of the details parameter of #react
   */
  details?: ReactDetails;

  /*
   * If true will exclude sensitive features whose values will be
   *   replaced after synthesis from uniqueness check.
   *  only applicable when desired_conviction is specified.
   * @default false
   */
  exclude_novel_nominals_from_uniqueness_check?: boolean;

  /*
   * List of additional features to return with audit data
   * @default []
   */
  extra_features?: string[];

  /*
   * Assoc of :
   *     to ensure that specified features' generated values stay in bounds
   *   for nominal features instead of min/max it's a set of allowed values, ie:
   *     allow_null - default is true, if true nulls may be generated per their distribution in the data
   *  only used when desired_conviction is specified
   * @default {}
   */
  feature_bounds_map?: FeatureBoundsMap;

  /*
   * Enum, acceptable values are:
   *   null or 'no' : output any generated case
   *   'always' : only output original cases, outputs null for all feature values if unable to generate a new case
   *   'attempt' : output any generated case only if generation fails all initial attempts to output original cases
   * @default "no"
   */
  generate_new_cases?: GenerateNewCases;

  /*
   * Case_id, if set will query for k+1 cases and ignore the perfect matching case during the reaction
   */
  ignore_case?: string;

  /*
   * Flag, if set to true assumes provided categorical (nominal or ordinal) feature values already been substituted.
   * @default false
   */
  input_is_substituted?: boolean;

  /*
   * Series id, if specified will store an internal record of all reacts for that series
   */
  into_series_store?: string;

  /*
   * Flag, if set to true and specified along with case_indices, will set ignore_case to the one specified by case_indices.
   */
  leave_case_out?: boolean;

  /*
   * Distance to determine privacy cutoff. used to query the local minimum distance used in the distance ratio
   *    accepted values:
   *      'max': the maximum local distance
   *      'min': the minimum local distance
   *      'most_similar': the closest distance of the most similar case
   *      null: the minimum local distance
   * @default "min"
   */
  new_case_threshold?: NewCaseThreshold;

  /*
   * Flag, if true order of generated feature values will match the order of features
   * @default false
   */
  ordered_by_specified_features?: boolean;

  /*
   * List of feature names that will be made available during the execution of post_process feature attributes
   * @default []
   */
  post_process_features?: string[];

  /*
   * List of values corresponding to post_process_features that will be made available during the execution fo post_process feature attributes
   * @default []
   */
  post_process_values?: any[];

  /*
   * List of features that will preserve their values from the case specified by case_indices, appending and
   *   overwriting the specified context and context features as necessary.  for generative reacts, if case_indices isn't specified,
   *   will preserve feature values of a random case.
   * @default []
   */
  preserve_feature_values?: string[];

  /*
   * Flag, default is true, only applicable if a substitution value map has been set. if set to false, will not substitute categorical feature values.
   *  only used when desired_conviction is specified
   * @default true
   */
  substitute_output?: boolean;

  /*
   * Flag, if set to true will scale influence weights by each case's weight_feature weight.
   *   if a weight is missing, uses 1 as the weight. if unspecified, case weights will be used if the trainee has them.
   */
  use_case_weights?: boolean;

  /*
   * Flag, if false uses model feature residuals, if true recalculates regional model residuals. only used when desired_conviction is specified
   * @default true
   */
  use_regional_model_residuals?: boolean;

  /*
   * Name of feature whose values to use as case weights
   * @default ".case_weight"
   */
  weight_feature?: string;
};
