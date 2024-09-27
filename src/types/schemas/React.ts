/**
 * React
 *
 * Run reacts in a batch, output a an assoc of list of outputs from each individual react.
 *
 * NOTE: This file is auto generated, do not modify manually.
 */
import { CaseIndices } from "./CaseIndices";
import { FeatureBoundsMap } from "./FeatureBoundsMap";
import { GenerateNewCases } from "./GenerateNewCases";
import { ReactDetails } from "./ReactDetails";

export type ReactRequest = {
  /*
   * Full list of features to output values for the case
   * @default []
   */
  action_features?: string[];

  /*
   * ;values of action features. if specified will bypass react and only do the explanation if details is set.
   * if specified must be either length of 1 or num_reacts. one list us used per individual reaction
   */
  action_values?: any[][];

  /*
   * Flag, if set to true will allow return of null values if there are nulls in the local model for the action features. applicable
   *   only to discriminative reacts.
   * @default false
   */
  allow_nulls?: boolean;

  /*
   * Pair (list) of session id and index, where index is the original 0-based session_training_index of the case as it was
   *   trained into the session. if this case does not exist, discriminative react outputs null, generative react ignores it.
   *  if specified must be either length of 1 or num_reacts.
   */
  case_indices?: CaseIndices;

  /*
   * List of context features. for generative react, features used to condition the generated case
   * @default []
   */
  context_features?: string[];

  /*
   * 2d-list of context values. for generative react, values used to condition the generated case
   * if specified must be either length of 1 or num_reacts. one list is used per individual reaction
   */
  context_values?: any[][];

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
   * An assoc of flags for which type of audit data to return, and corresponding values to return (if applicable) in the format of:
   *   (assoc
   *     "influential_cases" true or false. if true outputs the most influential cases and their influence weights
   *             based on the surprisal of each case relative to the context being predicted among the
   *             cases. uses only the context features of the reacted case.
   *
   *     "influential_cases_familiarity_convictions" true or false. if true outputs familiarity conviction of
   *             addition for each of the influential cases.
   *
   *      "influential_cases_raw_weights" true or false. if true outputs the surprisal for each of the influential cases.
   *             not applicable to generative reacts.
   *
   *      "derivation_parameters" true or false. if true outputs the parameters used during the react. these parameters
   *             include k, p, distance_transform, feature_weights, feature_deviations, nominal_class_counts, and flags to indicate
   *              if deviations or inverse residual weighting were used.
   *
   *      "hypothetical_values"  assoc context feature -> values. if specified, shows how a prediction could change
   *             in a what-if scenario where the influential cases' context feature values are replaced with
   *             the specified values.  iterates over all influential cases, predicting the action features
   *             for each one using the updated hypothetical values. outputs the predicted arithmetic
   *             average over the influential cases for each action feature.
   *
   *      "most_similar_cases" true or false. if true outputs an automatically determined (when
   *             'num_most_similar_cases' is not specified) relevant number of similar cases, which will
   *             first include the influential cases. uses only the context features of the reacted case.
   *
   *      "num_most_similar_cases" integer. outputs this manually specified number of most similar cases, which will
   *             first include the influential cases.
   *
   *      "num_most_similar_case_indices" integer. outputs the specified number of most similar case indices when
   *             'distance_ratio' is also set to true.
   *
   *      "boundary_cases" true or false. if true outputs an automatically determined (when 'num_boundary_cases' is
   *             not specified) relevant number of boundary cases. uses both context and action features
   *             of the reacted case to determine the counterfactual boundary based on action features,
   *             which maximize the dissimilarity of action features while maximizing the similarity of
   *             context features. if action features aren't specified, uses familarity conviction to
   *             determine the boundary instead.
   *
   *      "num_boundary_cases" integer. outputs this manually specified number of boundary cases.
   *
   *      'boundary_cases_familiarity_convictions" true or false. if true outputs familiarity conviction of addition for
   *             each of the boundary cases when 'boundary_cases' is also set to true.
   *
   *      "distance_ratio" true or false. if true outputs the ratio of distance (relative surprisal) between this
   *             reacted case and its nearest case to the minimum distance (relative surprisal) in between
   *             the closest two cases in the local area. all distances are computed using only the
   *             specified context features.
   *
   *      "distance_contribution" true of false. if true outputs the distance contribution (expected total surprisal
   *             contribution) for the reacted case. uses both context and action feature values.
   *
   *      "similarity_conviction" true or false. if true outputs similarity conviction for the reacted case.
   *             uses both context and action feature values as the case values for all computations. this is
   *             defined as expected (weighted-local) distance contribution / reacted case distance contribution.
   *
   *      "outlying_feature_values" true or false. if true outputs the reacted case's context feature values that are
   *             outside the min or max of the corresponding feature values of all the cases in the local
   *             model area. uses only the context features of the reacted case to determine that area.
   *
   *      "categorical_action_probabilities" true or false. if true outputs probabilities for each class for the action
   *             features. applicable only to categorical action features. single_react_series calls additionally
   *             output "aggregate_categorical_action_probabilities" for each series.
   *
   *      "observational_errors" true or false. if true outputs observational errors for all features as defined
   *             in feature attributes.
   *
   *      "feature_residuals_robust" true or false. if true outputs feature residuals for all (context and action) features
   *             locally around the prediction. uses only the context features of the reacted case to
   *             determine that area. uses robust calculations, which uses uniform sampling from
   *             the power set of features as the contexts for predictions.
   *
   *      "feature_residuals_full" true or false. if true outputs feature residuals for all (context and action) features
   *             locally around the prediction. uses only the context features of the reacted case to
   *             determine that area. uses full calculations, which uses leave-one-out context features for computations.
   *
   *      "prediction_stats" true or false. if true outputs full feature prediction stats for all (context and action)
   *             features locally around the prediction. the stats eligible to be returned are ("r2", "rmse", "spearman_coeff",
   *             "precision", "recall", "accuracy", "mcc", "confusion_matrix", "missing_value_accuracy"). confusion matrices
   *             may also be returned by setting 'confusion_matrices' to true. uses only the context features of the
   *             reacted case to determine that area. uses full calculations, which uses leave-one-out context features for
   *             computations.
   *
   *      "feature_mda_robust" true or false. if true outputs each context feature's robust mean decrease in accuracy of predicting
   *             the action feature given the context. uses only the context features of the reacted
   *             case to determine that area.  uses robust calculations, which uses uniform sampling from
   *             the power set of features as the contexts for predictions.
   *
   *      "feature_mda_full" true or false. if true outputs each context feature's full mean decrease in accuracy of predicting
   *             the action feature given the context. uses only the context features of the reacted
   *             case to determine that area. uses full calculations, which uses leave-one-out context features for computations.
   *
   *      "feature_mda_ex_post_robust" true or false. if true outputs each context feature's mean decrease in accuracy of
   *             predicting the action feature as a detail given that the specified prediction was
   *             already made as specified by the action value. uses both context and action features of
   *             the reacted case to determine that area. uses robust calculations, which uses uniform sampling from
   *             the power set of features as the contexts for predictions.
   *
   *      "feature_mda_ex_post_full" true or false. if true outputs each context feature's mean decrease in accuracy of
   *             predicting the action feature as a detail given that the specified prediction was
   *             already made as specified by the action value. uses both context and action features of
   *             the reacted case to determine that area. uses full calculations, which uses leave-one-out for features for computations.
   *
   *      "feature_contributions_robust" true or false. if true outputs each context feature's differences between the
   *             predicted action feature value and the predicted action feature value if each context
   *             feature were not in the model for all context features in the local model area. outputs
   *             both 'feature_contributions' and non-absolute 'directional_feature_contributions'.
   *              uses robust calculations, which uses uniform sampling from the power set of features as
   *             the contexts for predictions.
   *
   *      "feature_contributions_full" true or false. if true outputs each context feature's differences between the
   *             predicted action feature value and the predicted action feature value if each context
   *             feature were not in the model for all context features in the local model area. outputs
   *             both 'feature_contributions' and non-absolute 'directional_feature_contributions'.
   *             uses full calculations, which uses leave-one-out context features for computations.
   *
   *      "case_mda_robust" true or false. if true outputs each influential case's mean decrease in accuracy of predicting
   *             the action feature in the local model area, as if each individual case were included
   *             versus not included. uses only the context features of the reacted case to determine
   *             that area. uses robust calculations, which uses uniform sampling from the power set of all combinations of cases.
   *
   *      "case_mda_full" true or false. if true outputs each influential case's mean decrease in accuracy of predicting
   *             the action feature in the local model area, as if each individual case were included
   *             versus not included. uses only the context features of the reacted case to determine
   *             that area. uses full calculations, which uses leave-one-out for cases for computations.
   *
   *      "case_contributions_robust" true or false. if true outputs each influential case's differences between the
   *             predicted action feature value and the predicted action feature value if each
   *             individual case were not included. uses only the context features of the reacted case
   *             to determine that area. uses robust calculations, which uses uniform sampling from the power set of all
   *             combinations of cases.
   *
   *      "case_contributions_full" true or false. if true outputs each influential case's differences between the
   *             predicted action feature value and the predicted action feature value if each
   *             individual case were not included. uses only the context features of the reacted case
   *             to determine that area. uses full calculations, which uses leave-one-out for cases for computations.
   *
   *      "case_feature_residuals_robust"  true or false. if true outputs feature residuals for all (context and action)
   *             features for just the specified case. uses leave-one-out for each feature, while
   *             using the others to predict the left out feature with their corresponding values
   *             from this case. uses robust calculations, which uses uniform sampling from
   *             the power set of features as the contexts for predictions.
   *
   *      "case_feature_residuals_full"  true or false. if true outputs feature residuals for all (context and action)
   *             features for just the specified case. uses leave-one-out for each feature, while
   *             using the others to predict the left out feature with their corresponding values
   *             from this case. uses full calculations, which uses leave-one-out context features for computations.
   *
   *      "case_feature_contributions_robust" true or false. if true outputs each context feature's differences between the
   *             predicted action feature value and the predicted action feature value if each context
   *             feature were not in the model for all context features in this case, using only the
   *             values from this specific case. uses robust calculations, which uses uniform sampling from
   *             the power set of features as the contexts for predictions.
   *
   *      "case_feature_contributions_full" true or false. if true outputs each context feature's differences between the
   *             predicted action feature value and the predicted action feature value if each context
   *             feature were not in the model for all context features in this case, using only the
   *             values from this specific case. uses full calculations, which uses leave-one-out context features for computations.
   *
   *      "num_robust_influence_samples_per_case" integer. specifies the number of robust samples to use for each case.
   *             applicable only for computing robust feature contributions or robust case feature contributions.
   *             when unspecified, defaults to 2000. higher values will take longer but provide more stable results.
   *
   *      "case_feature_residual_convictions_robust" true or false. if true outputs this case's robust feature residual
   *             convictions for the region around the prediction. uses only the context features of
   *             the reacted case to determine that region. computed as: region feature residual / case feature residual.
   *             uses robust calculations, which uses uniform sampling from the power set of features as the contexts for predictions.
   *
   *      "case_feature_residual_convictions_full" true or false. if true outputs this case's full feature residual
   *             convictions for the region around the prediction. uses only the context features of
   *             the reacted case to determine that region. computed as: region feature residual / case feature residual.
   *             uses full calculations, which uses leave-one-out context features for computations.
   *
   *         "features" list of features that specifies what features to calculate per-feature details for. (contributions, mda, residuals, etc)
   *              when robust computations are false. this should generally preserve compute, but will not when computing details robustly.
   *
   *         "generate_attempts" true or false. if true, outputs the total number of attempts to generate the unique case. only applicable for generative
   *                        reacts. when used with reactseries, "series_generate_attempts" is also returned.
   *   )
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
  new_case_threshold?: "min" | "max" | "most_similar";

  /*
   * Total number of cases to generate for generative reacts.
   */
  num_cases_to_generate?: number;

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
   * 2d-list of values corresponding to post_process_features that will be made available during the execution of post_process feature attributes.
   * if specified must be either length of 1 or num_reacts. one list is used per individual reaction.
   */
  post_process_values?: any[][];

  /*
   * List of features that will preserve their values from the case specified by case_indices, appending and
   *   overwriting the specified context and context features as necessary.  for generative reacts, if case_indices isn't specified,
   *   will preserve feature values of a random case.
   * @default []
   */
  preserve_feature_values?: string[];

  /*
   * See #react for description.  if specified must be length of num_reacts.
   */
  rand_seed?: any[];

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
