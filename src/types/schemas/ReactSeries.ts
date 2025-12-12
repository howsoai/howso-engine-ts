/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * ReactSeries
 *
 * React in a series until a series_stop_map condition is met. Aggregates rows of data corresponding to the specified context, action,
 * derived_context and derived_action features, utilizing previous rows to derive values as necessary. Outputs an assoc of "action_features" and
 * corresponding "series" where "series" is the completed 'matrix' for the corresponding action_features and derived_action_features.
 */
import type { Cases } from "./Cases";
import type { CategoricalActionProbabilities } from "./CategoricalActionProbabilities";
import type { Condition } from "./Condition";
import type { DesiredConviction } from "./DesiredConviction";
import type { FeatureBounds } from "./FeatureBounds";
import type { GenerateNewCases } from "./GenerateNewCases";
import type { GoalFeatures } from "./GoalFeatures";
import type { NewCaseMinDistanceRatio } from "./NewCaseMinDistanceRatio";
import type { NewCaseThreshold } from "./NewCaseThreshold";
import type { ReactDetails } from "./ReactDetails";
import type { UseCaseWeights } from "./UseCaseWeights";

/** Request parameters of the Trainee method: reactSeries. */
export type ReactSeriesRequest = {
  /**
   * List of feature names corresponding to values in each row of action_values
   * @default []
   */
  action_features?: string[];

  /**
   * A mapping of conditions for features that will be used to constrain the queries used to find the most similar
   * trained cases to the given contexts.
   * assoc of feature->value(s).
   *     no value or (null) = select cases where that feature is (null)/missing
   *   - for continuous or numeric ordinal features:
   *     one value = must equal exactly the value or be close to it for fuzzy match
   *     two values = inclusive between, supports (null) on either side for less than/greater than conditions
   *     [(null) (null)] = select all non-null cases
   *   - for nominal or string ordinal features:
   *     n values = must match any of these values exactly
   */
  constraints?: Condition;

  /**
   * Flag, default is false.  When true, react_series will do a forecast of a series.
   *   When true, either series_id_values or series_context_values must be specified.
   * @default false
   */
  continue_series?: boolean;

  /**
   * List of action features whose values should be computed from the resulting last row in series, in the specified
   *   order. Must be a subset of action_features.
   *   Note: both of these derived feature lists rely on the features' "derived_feature_code" attribute to compute the values.
   *   If 'derived_feature_code' attribute is undefined or references non-existing feature indices, the derived value will be null.
   * @default []
   */
  derived_action_features?: string[];

  /**
   * List of context features whose values should be computed from the entire series in the specified order.
   *   Must be different than context_features.
   * @default []
   */
  derived_context_features?: string[];

  /**
   * If null, will do a discriminative react. If specified, will do a generative react
   *   For Generative React, value of desired avg conviction of generated cases, in the range of (0,infinity] with 1 as standard
   *   larger values will increase the variance (or creativity) of the generated case from the existing dataset
   *   smaller values will decrease the variance (or creativity) of the generated case from the existing dataset
   */
  desired_conviction?: DesiredConviction;

  /**
   * See the description for the details parameter of #react
   */
  details?: ReactDetails;

  /**
   * If true will exclude sensitive features whose values will be
   *   replaced after synthesis from uniqueness check.
   */
  exclude_novel_nominals_from_uniqueness_check?: boolean;

  /**
   * List of additional features to return with audit data from details
   */
  extra_features?: string[];

  /**
   * Assoc of :
   *   { feature : { "min": a, "max": b, "allow_null": false/true } }
   *   to ensure that specified features' generated values stay in bounds
   *   for nominal features instead of min/max it's a set of allowed values, ie:
   *   { feature: { "allowed" : [ "value1", "value2" ... ] }, "allow_null": false/true }
   *   allow_null - default is true, if true nulls may be generated per their distribution in the data
   * @default {}
   */
  feature_bounds_map?: Record<string, FeatureBounds>;

  /**
   * A mapping of feature name to custom code strings that will be evaluated to update the value of the feature they are mapped from after inference/derivation.
   * In the time-series synthesis, these custom codes are executed just after the original feature value is derived or synthed, but before
   * any other features would be derived or generated from the value. This means that the result of this custom code may be used as the
   * context in the generation or derivation of other feature values within a single timestep. Custom code will be able to access feature
   * values of the current time step as well as previously generated timesteps.
   */
  feature_post_process_code_map?: Record<string, string>;

  /**
   * Time step values at which to end synthesis for each series, applicable only for time series.
   */
  final_time_steps?: (number | string)[];

  /**
   * Enum, acceptable values are:
   *   null or 'no' : output any generated case
   *   'always' : only output original cases, outputs null for all feature values if unable to generate a new case
   *   'attempt' : output any generated case only if generation fails all initial attempts to output original cases
   * @default "no"
   */
  generate_new_cases?: GenerateNewCases;

  /**
   * Assoc of :
   *     { feature : { "goal" : "min"/"max", "value" : value }}
   *     A mapping of feature name to the goals for the feature, which will cause the react to achieve the goals as appropriate
   *     for the context.  This is useful for conditioning responses when it is challenging or impossible to know appropriate
   *     values ahead of time, such as maximizing the reward or minimizing cost for reinforcement learning, or conditioning a
   *     forecast based on attempting to achieve some value.  Goal features will reevaluate the inference for the given context
   *     optimizing for the specified goals. Valid keys in the map are:
   *     "goal": "min" or "max", will make a prediction while minimizing or maximizing the value for the feature or
   *     "value" : value, will make a prediction while approaching the specified value
   *   note: nominal features only support 'value', 'goal' is ignored.
   *       for non-nominals, if both are provided, only 'goal' is considered.
   * @default {}
   */
  goal_features_map?: Record<string, GoalFeatures>;

  /**
   * Time step values at which to begin synthesis for each series, applicable only for time series.
   */
  init_time_steps?: (number | string)[];

  /**
   * Flag, if set to true assumes provided categorical (nominal or ordinal) feature values already been substituted.
   * @default false
   */
  input_is_substituted?: boolean;

  /**
   * Flag, if true and series IDs are specified with series_id_values, then that series' cases will be held out of queries made within the
   * react_series call.
   * @default false
   */
  leave_series_out?: boolean;

  /**
   * List of maximum sizes each series is allowed to be.  Default is 3 * dataset_size, a 0 or less is no limit.
   *   If forecasting with 'continue_series', this defines the maximum length of the forecast.
   */
  max_series_lengths?: number[];

  /**
   * Parameter that adjusts the required distance ratio for a newly generated case to be considered private.
   *   When unspecified, defaults to 1.0 and generated cases with a ratio of 1.0 or greater are considered private.
   *    Larger values will increase strictness of privacy check.
   *    Smaller values will loosen the privacy check. Must be a positive number, since 0 would function same as `generate_new_cases='no'`
   */
  new_case_min_distance_ratio?: NewCaseMinDistanceRatio;

  /**
   * Distance to determine privacy cutoff. Used to query the local minimum distance used in the distance ratio
   *    accepted values:
   *      'max': the maximum local distance
   *      'min': the minimum local distance
   *      'most_similar': the closest distance of the most similar case
   *      null: the minimum local distance
   * @default "min"
   */
  new_case_threshold?: NewCaseThreshold;

  /**
   * Total number of series to generate, for generative reacts.
   *
   *    All of the following parameters, if specified, must be either length of 1 or equal to the length of
   *   series_context_values for discriminative reacts, and num_series_to_generate for generative reacts.
   */
  num_series_to_generate?: number;

  /**
   * Flag, if true order of generated feature values will match the order of features
   */
  ordered_by_specified_features?: boolean;

  /**
   * Flag, if true series ids are replaced with unique values on output.
   * @default true
   */
  output_new_series_ids?: boolean;

  /**
   * List of features that will preserve their values from the case specified by case_indices, appending and
   *   overwriting the specified context and context features as necessary.  For generative reacts, if case_indices isn't specified,
   *   will preserve feature values of a random case.
   * @default []
   */
  preserve_feature_values?: string[];

  /**
   * List of features corresponding to series_context_values
   * @default []
   */
  series_context_features?: string[];

  /**
   * 3d-list of values, context value for each feature for each row of each series. series_context_features must be specified if this parameter
   * is specified. If continue_series is true, then this data is forecasted. Otherwise this data conditions each row of the generated series.
   *   If specified and not using continue_series, then max_series_lengths are ignored.
   */
  series_context_values?: any[][][];

  /**
   * List of series ID features used to uniquely select a trained series.
   *   This list should contain all ID features, but the order can vary depending on the order of the
   *   features values given in series_id_values.
   * @default []
   */
  series_id_features?: string[];

  /**
   * Controls how closely generated series should follow existing series (plural).
   *   Choices are: "fixed", "dynamic" or "no". If "fixed", tracks the particular relevant series ID. If "dynamic", tracks the particular
   *   relevant series ID, but is allowed to change the series ID that it tracks based on its current context. If "no", does not track any particular series ID.
   * @default "fixed"
   */
  series_id_tracking?: "dynamic" | "fixed" | "no";

  /**
   * 2d-list of values whose order corresponds to the list of features defined in series_id_features, used to identify trained series.
   */
  series_id_values?: any[][];

  /**
   * List of assocs of feature -> stop conditions:
   *   for continuous features:  { feature:  { "min" : val,  "max": val } } - stops series when feature value exceeds max or is smaller than min
   *   for nominal features:  { feature:  { "values" : ['val1', 'val2' ]} }  - stops series when feature value matches any of the values listed
   *  one assoc is used per series.
   * @default []
   */
  series_stop_maps?: Record<string, any>[];

  /**
   * Flag, default is true, only applicable if a substitution value map has been set. If set to false, will not substitute categorical feature values.
   * @default true
   */
  substitute_output?: boolean;

  /**
   * Flag, if set to true this changes generative output to use aggregation instead of selection before adding noise.
   * By default generative output uses selection.
   * @default false
   */
  use_aggregation_based_differential_privacy?: boolean;

  /**
   * Flag, if true will internally generate values for all trained features and derived features while generating a series.
   * if false, will only generate values for the features specified as action features and the features necessary to derive them, reducing
   * the expected runtime but possibly reducing accuracy.
   * @default true
   */
  use_all_features?: boolean;

  /**
   * Flag, whether to use case weights or not. If unspecified will automatically select based on cached parameters
   */
  use_case_weights?: UseCaseWeights;

  /**
   * Flag, if true will use differentially private approach to adding noise during generative reacts. Default is false.
   * Only used when desired_conviction is specified.
   * @default false
   */
  use_differential_privacy?: boolean;

  /**
   * Name of the feature that stores case weights
   * @default ".case_weight"
   */
  weight_feature?: string;
};

/** Response of the Trainee method: reactSeries. */
export type ReactSeriesResponse = {
  /**
   * The list of feature names that correspond to the values in each list of values in 'action_values'.
   */
  action_features: string[];
  /**
   * A list of individual series.
   */
  action_values: any[][][];
  /**
   * A list of aggregated categorical action probabilities for each nominal features across all the cases of each series.
   */
  aggregated_categorical_action_probabilities?: Record<string, CategoricalActionProbabilities>[];
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  boundary_cases?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  boundary_values?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_full_accuracy_contributions?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_full_prediction_contributions?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_robust_accuracy_contributions?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  case_robust_prediction_contributions?: any;
  /**
   * A list of the detail result lists for each case of each series.
   */
  categorical_action_probabilities?: Record<string, CategoricalActionProbabilities>[][];
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  context_features?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  context_values?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  derivation_parameters?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  distance_contribution?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  distance_ratio?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  distance_ratio_parts?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_deviations?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_full_accuracy_contributions?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_full_accuracy_contributions_ex_post?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_full_directional_prediction_contributions?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_full_directional_prediction_contributions_for_case?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_full_prediction_contributions?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_full_prediction_contributions_for_case?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_full_residuals?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_full_residuals_for_case?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_full_residual_convictions_for_case?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_robust_accuracy_contributions?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_robust_accuracy_contributions_ex_post?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_robust_directional_prediction_contributions?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_robust_directional_prediction_contributions_for_case?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_robust_prediction_contributions?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_robust_prediction_contributions_for_case?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_robust_residuals?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  feature_robust_residuals_for_case?: any;
  /**
   * A list of the detail result lists for each case of each series.
   */
  generate_attempts?: number[][];
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  hypothetical_values?: any;
  /**
   * A list of the detail result lists for each case of each series.
   */
  influential_cases?: Cases[][];
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  most_similar_cases?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  most_similar_case_indices?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  non_clustered_distance_contribution?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  non_clustered_similarity_conviction?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  observational_errors?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  outlying_feature_values?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  predicted_values_for_case?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  prediction_stats?: any;
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  relevant_values?: any;
  /**
   * A list of generation attempts for each series as a whole.
   */
  series_generate_attempts?: number[];
  /**
   * A list of lists of estimated uncertainties of continuous features for each time step of the returned series.
   */
  series_residuals?: Record<string, any>[][];
  /**
   * Experimental. The same detail as in standard #react, but accumulated for each case in each series.
   */
  similarity_conviction?: any;
};
