/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * Returns details and audit data for a given reaction for the specified audit data flags.
 * Local and regional models are used to determine details:
 *     Local model -  only the most similar cases used to directly determine the prediction value, used to compute affects of cases directly
 *                     responsible for the predicted output.
 *     Regional model - the most similar cases to the prediction, represented by the maximum of either 30 or the local model size. Used in
 *                     situations where relying on a small local model may produce noisy results.
 * @export
 * @interface ReactDetails
 */
export interface ReactDetails {
  /**
   * When true, outputs the most influential cases and their influence weights based on the surprisal of each case relative to the context being predicted among the cases. Uses only the context features of the reacted case.
   * @type {boolean}
   * @memberof ReactDetails
   */
  influential_cases?: boolean;
  /**
   * If True, outputs a dictionary of the parameters used in the react call. These include k, p, distance_transform, feature_weights, feature_deviations, nominal_class_counts, and use_irw.
   * @type {boolean}
   * @memberof ReactDetails
   */
  derivation_parameters?: boolean;
  /**
   * When true, outputs familiarity conviction of addition for each of the influential cases.
   * @type {boolean}
   * @memberof ReactDetails
   */
  influential_cases_familiarity_convictions?: boolean;
  /**
   * When true, outputs the surprisal for each of the influential cases.
   * @type {boolean}
   * @memberof ReactDetails
   */
  influential_cases_raw_weights?: boolean;
  /**
   * When true, outputs an automatically determined (when 'num_most_similar_cases' is not specified) relevant number of similar cases, which will first include the influential cases. Uses only the context features of the reacted case.
   * @type {boolean}
   * @memberof ReactDetails
   */
  most_similar_cases?: boolean;
  /**
   * When defined, outputs this manually specified number of most similar cases, which will first include the influential cases. Takes precedence over 'most_similar_cases' parameter.
   * @type {number}
   * @memberof ReactDetails
   */
  num_most_similar_cases?: number;
  /**
   * When defined, outputs the specified number of most similar case indices when 'distance_ratio' is also set to true.
   * @type {number}
   * @memberof ReactDetails
   */
  num_most_similar_case_indices?: number;
  /**
   * Specifies the number of robust samples to use for each case. Applicable only for computing robust feature contributions or robust case feature contributions. Defaults to 2000 when unspecified. Higher values will take longer but provide more stable results.
   * @type {number}
   * @memberof ReactDetails
   */
  num_robust_influence_samples_per_case?: number;
  /**
   * When true, outputs an automatically determined (when 'num_boundary_cases' is not specified) relevant number of boundary cases. Uses both context and action features of the reacted case to determine the counterfactual boundary based on action features, which maximize the dissimilarity of action features while maximizing the similarity of context features. If action features aren't specified, uses familiarity conviction to determine the boundary instead.
   * @type {boolean}
   * @memberof ReactDetails
   */
  boundary_cases?: boolean;
  /**
   * When defined, outputs this manually specified number of boundary cases. Takes precedence over 'boundary_cases' parameter.
   * @type {number}
   * @memberof ReactDetails
   */
  num_boundary_cases?: number;
  /**
   * When true, outputs familiarity conviction of addition for each of the boundary cases.
   * @type {boolean}
   * @memberof ReactDetails
   */
  boundary_cases_familiarity_convictions?: boolean;
  /**
   * A list of feature names that specifies for what features will per-feature details be computed (residuals, contributions, mda, etc.). This should generally preserve compute, but will not when computing details robustly. Details will be computed for all context and action features if this is not specified.
   * @type {Array<string>}
   * @memberof ReactDetails
   */
  features?: Array<string>;
  /**
   * If True, outputs feature residuals for all (context and action) features locally around the prediction. Uses only the context features of the reacted case to determine that area. Uses full calculations, which uses leave-one-out for cases for computations.
   * @type {boolean}
   * @memberof ReactDetails
   */
  feature_residuals_full?: boolean;
  /**
   * If True, outputs feature residuals for all (context and action) features locally around the prediction. Uses only the context features of the reacted case to determine that area. Uses robust calculations, which uses uniform sampling from the power set of features as the contexts for predictions. 'selected_prediction_stats' controls the returned prediction stats.
   * @type {boolean}
   * @memberof ReactDetails
   */
  feature_residuals_robust?: boolean;
  /**
   * When true outputs feature prediction stats for all (context and action) features locally around the prediction. The stats returned  are ("r2", "rmse", "spearman_coeff", "precision", "recall", "accuracy", "mcc", "confusion_matrix", "missing_value_accuracy"). Uses only the context features of the reacted case to determine that area. Uses full calculations, which uses leave-one-out context features for computations. 'selected_prediction_stats' controls the returned prediction stats.
   * @type {boolean}
   * @memberof ReactDetails
   */
  prediction_stats?: boolean;
  /**
   * When True will compute Mean Decrease in Accuracy (MDA) for each context feature at predicting the action feature. Drop each feature and use the full set of remaining context features for each prediction. False removes cached values.
   * @type {boolean}
   * @memberof ReactDetails
   */
  feature_mda_full?: boolean;
  /**
   * Compute Mean Decrease in Accuracy MDA by dropping each feature and using the robust (power set/permutations) set of remaining context features for each prediction. False removes cached values.
   * @type {boolean}
   * @memberof ReactDetails
   */
  feature_mda_robust?: boolean;
  /**
   * If True, outputs each context feature's mean decrease in accuracy of predicting the action feature as an explanation detail given that the specified prediction was already made as specified by the action value. Uses both context and action features of the reacted case to determine that area. Uses full calculations, which uses leave-one-out for cases for computations.
   * @type {boolean}
   * @memberof ReactDetails
   */
  feature_mda_ex_post_full?: boolean;
  /**
   * If True, outputs each context feature's mean decrease in accuracy of predicting the action feature as an explanation detail given that the specified prediction was already made as specified by the action value. Uses both context and action features of the reacted case to determine that area. Uses robust calculations, which uses uniform sampling from the power set of features as the contexts for predictions.
   * @type {boolean}
   * @memberof ReactDetails
   */
  feature_mda_ex_post_robust?: boolean;
  /**
   * If True outputs each context feature's absolute and directional differences between the predicted action feature value and the predicted action feature value if each context were not in the model for all context features in the local model area. Uses full calculations, which uses leave-one-out for cases for computations. Directional feature contributions are returned under the key 'directional_feature_contributions_full'.
   * @type {boolean}
   * @memberof ReactDetails
   */
  feature_contributions_full?: boolean;
  /**
   * If True outputs each context feature's absolute and directional differences between the predicted action feature value and the predicted action feature value if each context were not in the model for all context features in the local model area Uses robust calculations, which uses uniform sampling from the power set of features as the contexts for predictions. Directional feature contributions are returned under the key 'directional_feature_contributions_robust'.
   * @type {boolean}
   * @memberof ReactDetails
   */
  feature_contributions_robust?: boolean;
  /**
   * If True outputs each context feature's absolute and directional differences between the predicted action feature value and the predicted action feature value if each context feature were not in the model for all context features in this case, using only the values from this specific case. Uses full calculations, which uses leave-one-out for cases for computations. Directional case feature contributions are returned under the 'case_directional_feature_contributions_full' key.
   * @type {boolean}
   * @memberof ReactDetails
   */
  case_feature_contributions_full?: boolean;
  /**
   * If True outputs each context feature's absolute and directional differences between the predicted action feature value and the predicted action feature value if each context feature were not in the model for all context features in this case, using only the values from this specific case. Uses robust calculations, which uses uniform sampling from the power set of features as the contexts for predictions. Directional case feature contributions are returned under the 'case_directional_feature_contributions_robust' key.
   * @type {boolean}
   * @memberof ReactDetails
   */
  case_feature_contributions_robust?: boolean;
  /**
   * If True, outputs feature residuals for all (context and action) features for just the specified case. Uses leave-one-out for each feature, while using the others to predict the left out feature with their corresponding values from this case. Uses full calculations, which uses leave-one-out for cases for computations.
   * @type {boolean}
   * @memberof ReactDetails
   */
  case_feature_residuals_full?: boolean;
  /**
   * If True, outputs feature residuals for all (context and action) features for just the specified case. Uses leave-one-out for each feature, while using the others to predict the left out feature with their corresponding values from this case. Uses robust calculations, which uses uniform sampling from the power set of features as the contexts for predictions.
   * @type {boolean}
   * @memberof ReactDetails
   */
  case_feature_residuals_robust?: boolean;
  /**
   * If True, outputs each influential case's mean decrease in accuracy of predicting the action feature in the local model area, as if each individual case were included versus not included. Uses only the context features of the reacted case to determine that area. Uses full calculations, which uses leave-one-out for cases for computations.
   * @type {boolean}
   * @memberof ReactDetails
   */
  case_mda_full?: boolean;
  /**
   * If True, outputs each influential case's mean decrease in accuracy of predicting the action feature in the local model area, as if each individual case were included versus not included. Uses only the context features of the reacted case to determine that area. Uses robust calculations, which uses uniform sampling from the power set of all combinations of cases.
   * @type {boolean}
   * @memberof ReactDetails
   */
  case_mda_robust?: boolean;
  /**
   * If true outputs each influential case's differences between the predicted action feature value and the predicted action feature value if each individual case were not included. Uses only the context features of the reacted case to determine that area. Uses full calculations, which uses leave-one-out for cases for computations.
   * @type {boolean}
   * @memberof ReactDetails
   */
  case_contributions_full?: boolean;
  /**
   * If true outputs each influential case's differences between the predicted action feature value and the predicted action feature value if each individual case were not included. Uses only the context features of the reacted case to determine that area. Uses robust calculations, which uses uniform sampling from the power set of all combinations of cases.
   * @type {boolean}
   * @memberof ReactDetails
   */
  case_contributions_robust?: boolean;
  /**
   * If True, outputs this case's feature residual convictions for the global model. Computed as: global model feature residual divided by case feature residual. Uses full calculations, which uses leave-one-out for cases for computations.
   * @type {boolean}
   * @memberof ReactDetails
   */
  global_case_feature_residual_convictions_full?: boolean;
  /**
   * If True, outputs this case's feature residual convictions for the global model. Computed as: global model feature residual divided by case feature residual. Uses robust calculations, which uses uniform sampling from the power set of features as the contexts for predictions.
   * @type {boolean}
   * @memberof ReactDetails
   */
  global_case_feature_residual_convictions_robust?: boolean;
  /**
   * If True, outputs this case's feature residual convictions for the region around the prediction. Uses only the context features of the reacted case to determine that region. Computed as: region feature residual divided by case feature residual. Uses full calculations, which uses leave-one-out for cases for computations.
   * @type {boolean}
   * @memberof ReactDetails
   */
  local_case_feature_residual_convictions_full?: boolean;
  /**
   * If True, outputs this case's feature residual convictions for the region around the prediction. Uses only the context features of the reacted case to determine that region. Computed as: region feature residual divided by case feature residual. Uses robust calculations, which uses uniform sampling from the power set of features as the contexts for predictions.
   * @type {boolean}
   * @memberof ReactDetails
   */
  local_case_feature_residual_convictions_robust?: boolean;
  /**
   * When true, outputs the reacted case's context feature values that are outside the min or max of the corresponding feature values of all the cases in the local model area. Uses only the context features of the reacted case to determine that area.
   * @type {boolean}
   * @memberof ReactDetails
   */
  outlying_feature_values?: boolean;
  /**
   * When true, outputs probabilities for each class for the action. Applicable only to categorical action features.
   * @type {boolean}
   * @memberof ReactDetails
   */
  categorical_action_probabilities?: boolean;
  /**
   * A dictionary of feature name to feature value. If specified, shows how a prediction could change in a what-if scenario where the influential cases' context feature values are replaced with the specified values. Iterates over all influential cases, predicting the action features each one using the updated hypothetical values. Outputs the predicted arithmetic over the influential cases for each action feature.
   * @type {{ [key: string]: any; }}
   * @memberof ReactDetails
   */
  hypothetical_values?: { [key: string]: any };
  /**
   * When true, outputs the ratio of distance (relative surprisal) between this reacted case and its nearest case to the minimum distance (relative surprisal) in between the closest two cases in the local area. All distances are computed using only the specified context features.
   * @type {boolean}
   * @memberof ReactDetails
   */
  distance_ratio?: boolean;
  /**
   * When true, outputs the distance contribution (expected total surprisal contribution) for the reacted case. Uses both context and action feature values.
   * @type {boolean}
   * @memberof ReactDetails
   */
  distance_contribution?: boolean;
  /**
   * When true, outputs similarity conviction for the reacted case. Uses both context and action feature values as the case values for all computations. This is defined as expected (local) distance contribution divided by reacted case distance contribution.
   * @type {boolean}
   * @memberof ReactDetails
   */
  similarity_conviction?: boolean;
  /**
   * When true, outputs observational errors for all features as defined in feature attributes.
   * @type {boolean}
   * @memberof ReactDetails
   */
  observational_errors?: boolean;
  /**
   * When true, outputs the number of attempts taken to generate each case. Only applicable when 'generate_new_cases' is "always" or "attempt". When used in react_series, "series_generate_attempts" is also returned.
   * @type {boolean}
   * @memberof ReactDetails
   */
  generate_attempts?: boolean;
  /**
   * Types of stats to output. When unspecified, returns all except the confusion_matrix. If all, then returns all including the confusion_matrix.
   * @type {Array<string>}
   * @memberof ReactAggregateDetails
   */
  selected_prediction_stats?: Array<ReactDetailsSelectedPredictionStat>;
}

/**
 * @export
 * @enum {string}
 */
export type ReactDetailsSelectedPredictionStat =
  // Returns all the the available prediction stats, including the confusion matrix.
  | "all"
  // The number of correct predictions divided by the total number of predictions.
  | "accuracy"
  // A sparse map of actual feature value to a map of predicted feature value to counts.
  | "confusion_matrix"
  // Mean absolute error. For continuous features, this is calculated as the mean of absolute values of the difference between the actual and predicted values. For nominal features, this is 1 - the average categorical action probability of each case’s correct classes. Categorical action probabilities are the probabilities for each class for the action feature.
  | "mae"
  // Mean decrease in accuracy when each feature is dropped from the model, applies to all features.
  | "mda"
  // Mean decrease in accuracy that used scrambling of feature values instead of dropping each feature, applies to all features.
  | "feature_mda_permutation_full"
  // Precision (positive predictive) value for nominal features only.
  | "precision"
  // The r-squared coefficient of determination, for continuous features only.
  | "r2"
  // Recall (sensitivity) value for nominal features only.
  | "recall"
  // Root mean squared error, for continuous features only.
  | "rmse"
  // Spearman’s rank correlation coefficient, for continuous features only.
  | "spearman_coeff"
  // Matthews correlation coefficient, for nominal features only.
  | "mcc";

/**
 * Check if a given object implements the ReactDetails interface.
 */
export function instanceOfReactDetails(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ReactDetailsFromJSON(json: any): ReactDetails {
  return ReactDetailsFromJSONTyped(json, false);
}

export function ReactDetailsFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReactDetails {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    influential_cases: !exists(json, "influential_cases") ? undefined : json["influential_cases"],
    derivation_parameters: !exists(json, "derivation_parameters") ? undefined : json["derivation_parameters"],
    influential_cases_familiarity_convictions: !exists(json, "influential_cases_familiarity_convictions")
      ? undefined
      : json["influential_cases_familiarity_convictions"],
    influential_cases_raw_weights: !exists(json, "influential_cases_raw_weights")
      ? undefined
      : json["influential_cases_raw_weights"],
    most_similar_cases: !exists(json, "most_similar_cases") ? undefined : json["most_similar_cases"],
    num_most_similar_cases: !exists(json, "num_most_similar_cases") ? undefined : json["num_most_similar_cases"],
    num_most_similar_case_indices: !exists(json, "num_most_similar_case_indices")
      ? undefined
      : json["num_most_similar_case_indices"],
    num_robust_influence_samples_per_case: !exists(json, "num_robust_influence_samples_per_case")
      ? undefined
      : json["num_robust_influence_samples_per_case"],
    boundary_cases: !exists(json, "boundary_cases") ? undefined : json["boundary_cases"],
    num_boundary_cases: !exists(json, "num_boundary_cases") ? undefined : json["num_boundary_cases"],
    boundary_cases_familiarity_convictions: !exists(json, "boundary_cases_familiarity_convictions")
      ? undefined
      : json["boundary_cases_familiarity_convictions"],
    features: !exists(json, "features") ? undefined : json["features"],
    feature_residuals_full: !exists(json, "feature_residuals_full") ? undefined : json["feature_residuals_full"],
    feature_residuals_robust: !exists(json, "feature_residuals_robust") ? undefined : json["feature_residuals_robust"],
    prediction_stats: !exists(json, "prediction_stats") ? undefined : json["prediction_stats"],
    feature_mda_full: !exists(json, "feature_mda_full") ? undefined : json["feature_mda_full"],
    feature_mda_robust: !exists(json, "feature_mda_robust") ? undefined : json["feature_mda_robust"],
    feature_mda_ex_post_full: !exists(json, "feature_mda_ex_post_full") ? undefined : json["feature_mda_ex_post_full"],
    feature_mda_ex_post_robust: !exists(json, "feature_mda_ex_post_robust")
      ? undefined
      : json["feature_mda_ex_post_robust"],
    feature_contributions_full: !exists(json, "feature_contributions_full")
      ? undefined
      : json["feature_contributions_full"],
    feature_contributions_robust: !exists(json, "feature_contributions_robust")
      ? undefined
      : json["feature_contributions_robust"],
    case_feature_contributions_full: !exists(json, "case_feature_contributions_full")
      ? undefined
      : json["case_feature_contributions_full"],
    case_feature_contributions_robust: !exists(json, "case_feature_contributions_robust")
      ? undefined
      : json["case_feature_contributions_robust"],
    case_feature_residuals_full: !exists(json, "case_feature_residuals_full")
      ? undefined
      : json["case_feature_residuals_full"],
    case_feature_residuals_robust: !exists(json, "case_feature_residuals_robust")
      ? undefined
      : json["case_feature_residuals_robust"],
    case_mda_full: !exists(json, "case_mda_full") ? undefined : json["case_mda_full"],
    case_mda_robust: !exists(json, "case_mda_robust") ? undefined : json["case_mda_robust"],
    case_contributions_full: !exists(json, "case_contributions_full") ? undefined : json["case_contributions_full"],
    case_contributions_robust: !exists(json, "case_contributions_robust")
      ? undefined
      : json["case_contributions_robust"],
    global_case_feature_residual_convictions_full: !exists(json, "global_case_feature_residual_convictions_full")
      ? undefined
      : json["global_case_feature_residual_convictions_full"],
    global_case_feature_residual_convictions_robust: !exists(json, "global_case_feature_residual_convictions_robust")
      ? undefined
      : json["global_case_feature_residual_convictions_robust"],
    local_case_feature_residual_convictions_full: !exists(json, "local_case_feature_residual_convictions_full")
      ? undefined
      : json["local_case_feature_residual_convictions_full"],
    local_case_feature_residual_convictions_robust: !exists(json, "local_case_feature_residual_convictions_robust")
      ? undefined
      : json["local_case_feature_residual_convictions_robust"],
    outlying_feature_values: !exists(json, "outlying_feature_values") ? undefined : json["outlying_feature_values"],
    categorical_action_probabilities: !exists(json, "categorical_action_probabilities")
      ? undefined
      : json["categorical_action_probabilities"],
    hypothetical_values: !exists(json, "hypothetical_values") ? undefined : json["hypothetical_values"],
    distance_ratio: !exists(json, "distance_ratio") ? undefined : json["distance_ratio"],
    distance_contribution: !exists(json, "distance_contribution") ? undefined : json["distance_contribution"],
    similarity_conviction: !exists(json, "similarity_conviction") ? undefined : json["similarity_conviction"],
    observational_errors: !exists(json, "observational_errors") ? undefined : json["observational_errors"],
    generate_attempts: !exists(json, "generate_attempts") ? undefined : json["generate_attempts"],
    selected_prediction_stats: !exists(json, "selected_prediction_stats")
      ? undefined
      : json["selected_prediction_stats"],
  };
}

export function ReactDetailsToJSON(value?: ReactDetails | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    influential_cases: value.influential_cases,
    derivation_parameters: value.derivation_parameters,
    influential_cases_familiarity_convictions: value.influential_cases_familiarity_convictions,
    influential_cases_raw_weights: value.influential_cases_raw_weights,
    most_similar_cases: value.most_similar_cases,
    num_most_similar_cases: value.num_most_similar_cases,
    num_most_similar_case_indices: value.num_most_similar_case_indices,
    num_robust_influence_samples_per_case: value.num_robust_influence_samples_per_case,
    boundary_cases: value.boundary_cases,
    num_boundary_cases: value.num_boundary_cases,
    boundary_cases_familiarity_convictions: value.boundary_cases_familiarity_convictions,
    features: value.features,
    feature_residuals_full: value.feature_residuals_full,
    feature_residuals_robust: value.feature_residuals_robust,
    prediction_stats: value.prediction_stats,
    feature_mda_full: value.feature_mda_full,
    feature_mda_robust: value.feature_mda_robust,
    feature_mda_ex_post_full: value.feature_mda_ex_post_full,
    feature_mda_ex_post_robust: value.feature_mda_ex_post_robust,
    feature_contributions_full: value.feature_contributions_full,
    feature_contributions_robust: value.feature_contributions_robust,
    case_feature_contributions_full: value.case_feature_contributions_full,
    case_feature_contributions_robust: value.case_feature_contributions_robust,
    case_feature_residuals_full: value.case_feature_residuals_full,
    case_feature_residuals_robust: value.case_feature_residuals_robust,
    case_mda_full: value.case_mda_full,
    case_mda_robust: value.case_mda_robust,
    case_contributions_full: value.case_contributions_full,
    case_contributions_robust: value.case_contributions_robust,
    global_case_feature_residual_convictions_full: value.global_case_feature_residual_convictions_full,
    global_case_feature_residual_convictions_robust: value.global_case_feature_residual_convictions_robust,
    local_case_feature_residual_convictions_full: value.local_case_feature_residual_convictions_full,
    local_case_feature_residual_convictions_robust: value.local_case_feature_residual_convictions_robust,
    outlying_feature_values: value.outlying_feature_values,
    categorical_action_probabilities: value.categorical_action_probabilities,
    hypothetical_values: value.hypothetical_values,
    distance_ratio: value.distance_ratio,
    distance_contribution: value.distance_contribution,
    similarity_conviction: value.similarity_conviction,
    observational_errors: value.observational_errors,
    generate_attempts: value.generate_attempts,
    selected_prediction_stats: value.selected_prediction_stats,
  };
}
