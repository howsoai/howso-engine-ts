/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * ReactSeriesStationary
 *
 * React to series data predicting stationary feature values, values that do not change
 * over the timesteps of the series.
 */
import type { Condition } from "./Condition";
import type { DesiredConviction } from "./DesiredConviction";
import type { GoalFeatures } from "./GoalFeatures";
import type { UseCaseWeights } from "./UseCaseWeights";

/** Request parameters of the Trainee method: reactSeriesStationary. */
export type ReactSeriesStationaryRequest = {
  /**
   * Thea names of features to predict.
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
   * The names of features to use as contexts to predict the features named in "action_features". If unspecified, then the
   * features specified in "series_context_features" will be used if available. Otherwise, all non-action features will be used.
   * @default []
   */
  context_features?: string[];

  /**
   * If null, will do a discriminative react. If specified, will do a generative react
   *   For Generative React, value of desired avg conviction of generated cases, in the range of (0,infinity] with 1 as standard
   *   larger values will increase the variance (or creativity) of the generated case from the existing dataset
   *   smaller values will decrease the variance (or creativity) of the generated case from the existing dataset
   */
  desired_conviction?: DesiredConviction;

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
   * Flag, if true then all time-series features (lags, rates, etc) derived from features specified in context features will be automatically
   * used as contexts in addition to the specified context features.
   * {type "boolean"}
   * flag, if set to true assumes provided categorical (nominal or ordinal) feature values already been substituted.
   * @default false
   */
  input_is_substituted?: boolean;

  /**
   * The names of the features whose values are given in "series_context_values" in the same order within each row. Must be
   * specified if "series_context_values" is specified.
   * @default []
   */
  series_context_features?: string[];

  /**
   * A list of lists of lists of anything. A list of series, which are lists of rows, which are lists of feature values.
   */
  series_context_values?: any;

  /**
   * The names of the features whose values are given in "series_ids" in the same order within each sublist. Must be
   * specified if "series_ids" is specified.
   * @default []
   */
  series_id_features?: string[];

  /**
   * A list of lists. A list of series IDs, which are a list of ID feature values. Each sublist should specify a
   * a unique set of ID feature values that uniquely select a trained series from the trained data. If "series_ids"
   * is specified, then "series_id_features" must also be specified and series_context_values will be ignored.
   */
  series_id_values?: any;

  /**
   * Flag, if set to true this changes generative output to use aggregation instead of selection before adding noise.
   * By default generative output uses selection.
   * @default false
   */
  use_aggregation_based_differential_privacy?: boolean;

  /**
   * Flag, if set to true will scale influence weights by each case's weight_feature weight. If unspecified,
   *   case weights will be used if the trainee has them.
   */
  use_case_weights?: UseCaseWeights;

  /**
   * Flag, if true all time-series features that are derived from features specified as context_features will additionally be added as contexts
   * @default true
   */
  use_derived_ts_features?: boolean;

  /**
   * Flag, if true will use differentially private approach to adding noise during generative reacts. Default is false.
   * Only used when desired_conviction is specified.
   * @default false
   */
  use_differential_privacy?: boolean;

  /**
   * Name of feature whose values to use as case weights
   * @default ".case_weight"
   */
  weight_feature?: string;
};

/** Response of the Trainee method: reactSeriesStationary. */
export type ReactSeriesStationaryResponse = {
  /**
   * The list of feature names that correspond to the values in each list of values in 'action_values'.
   */
  action_features: string[];
  /**
   * A list of lists of predicted values for each series.
   */
  action_values: any[][];
};
