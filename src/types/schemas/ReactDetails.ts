/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 */
import type { Condition } from "./Condition";
import type { PredictionStat } from "./PredictionStat";

/**
 * ReactDetails schema.
 */
export type ReactDetails = {
  /**
   * When true, outputs an automatically determined (when 'num_boundary_cases' is not specified) relevant number of boundary cases. Uses both context and action features of the reacted case to determine the counterfactual boundary based on action features, which maximize the dissimilarity of action features while maximizing the similarity of context features. If action features aren't specified, uses familiarity conviction to determine the boundary instead.
   */
  boundary_cases?: boolean;
  /**
   * When true, outputs familiarity conviction of addition for each of the boundary cases.
   */
  boundary_cases_familiarity_convictions?: boolean;
  /**
   * The condition map to define the boundary within which the action of a prediction will be shifted to when the returned  boundary values are used as context values instead of those given. The dictionary keys are the feature name and values are one of:
   * - None
   * - A value, must match exactly.
   * - An array of two numeric values, specifying an inclusive range. Only applicable to continuous and numeric ordinal features.
   * - An array of string values, must match any of these values exactly. Only applicable to nominal and string ordinal features.
   * - A map with the key 'exclude' to either a value or an array of values. Must not match any of these values exactly. Only applicable to nominal and string ordinal features.
   * - A map with the key 'include' to either a value or an array of values. Must match any of these values exactly. Only applicable to nominal and string ordinal features.
   * Continuous edit-distance features (JSON, code, YAML, string) cannot have possible values or ranges specified in "boundary_value_action_outcome" (bounds are not well-defined and the search space is theoretically infinite.)
   */
  boundary_value_action_outcome?: Condition;
  /**
   * When specified, outputs a map of each specified feature to possible boundary values under "boundary_values". If 'boundary_value_action_outcome' is unspecified, then the returned values are values where the ratio of change in action to total change is maximized. If 'boundary_value_action_outcome' is specified, then the boundary values represent the closest found values for each context feature that shift the action to fulfill the condition.
   */
  boundary_value_context_features?: string[];
  /**
   * If True, outputs each influential case's Accuracy Contribution in predicting the action feature in the local data area, as if each individual case were included versus not included. Uses only the context features of the reacted case to determine that area. Uses full calculations, which uses leave-one-out for cases for computations.
   */
  case_full_accuracy_contributions?: boolean;
  /**
   * If true outputs each influential case's differences between the predicted action feature value and the predicted action feature value if each individual case were not included. Uses only the context features of the reacted case to determine that area. Uses full calculations, which uses leave-one-out for cases for computations.
   */
  case_full_prediction_contributions?: boolean;
  /**
   * If True, outputs each influential case's Accuracy Contribution in predicting the action feature in the local data area, as if each individual case were included versus not included. Uses only the context features of the reacted case to determine that area. Uses robust calculations, which uses uniform sampling from the power set of all combinations of cases.
   */
  case_robust_accuracy_contributions?: boolean;
  /**
   * If true outputs each influential case's differences between the predicted action feature value and the predicted action feature value if each individual case were not included. Uses only the context features of the reacted case to determine that area. Uses robust calculations, which uses uniform sampling from the power set of all combinations of cases.
   */
  case_robust_prediction_contributions?: boolean;
  /**
   * When true, outputs probabilities for each class for the action. Applicable only to categorical action features.
   */
  categorical_action_probabilities?: boolean;
  /**
   * If True, outputs a dictionary of the parameters used in the react call. These include k, p, distance_transform, feature_weights, feature_deviations, and nominal_class_counts.
   */
  derivation_parameters?: boolean;
  /**
   * When true, outputs the distance contribution (expected total surprisal contribution) for the reacted case. Uses both context and action feature values.
   */
  distance_contribution?: boolean;
  /**
   * When true, outputs the ratio of distance (relative surprisal) between this reacted case and its nearest case to the minimum distance (relative surprisal) in between the closest two cases in the local area. All distances are computed using only the specified context features.
   */
  distance_ratio?: boolean;
  /**
   * A list of feature names that specifies for what features will per-feature details be computed (residuals, contributions, mda, etc.). This should generally preserve compute, but will not when computing details robustly. Details will be computed for all context and action features if this is not specified.
   */
  features?: string[];
  /**
   * If True, outputs the deviations for each feature based on the data surrounding the prediction.
   */
  feature_deviations?: boolean;
  /**
   * When True will compute the Accuracy Contribution for each context feature at predicting the action feature value of the influential cases. Uses leave-one-out logic, dropping each feature and use the full set of remaining context features for each prediction.
   */
  feature_full_accuracy_contributions?: boolean;
  /**
   * If True, outputs each context feature's Accuracy Contribution in predicting the action feature as an explanation detail given that the specified prediction was already made as specified by the action value. Uses both context and action features of the reacted case to determine that area. Uses full calculations, which uses leave-one-out for cases for computations.
   */
  feature_full_accuracy_contributions_ex_post?: boolean;
  /**
   * If True outputs each context feature's absolute and directional differences between the predicted action feature value and the predicted action feature value if each context were not in the dataset for all context features in the local data area. Uses full calculations, which uses leave-one-out for cases for computations. Directional feature contributions are returned under the key 'feature_full_directional_prediction_contributions'.
   */
  feature_full_prediction_contributions?: boolean;
  /**
   * If True outputs each context feature's absolute and directional differences between the predicted action feature value and the predicted action feature value if each context feature were not in the dataset for all context features in this case, using only the values from this specific case. Uses full calculations, which uses leave-one-out for cases for computations. Directional case feature contributions are returned under the 'feature_full_directional_prediction_contributions_for_case' key.
   */
  feature_full_prediction_contributions_for_case?: boolean;
  /**
   * If True, outputs feature residuals for all (context and action) features locally around the prediction. Uses only the context features of the reacted case to determine that area. Uses full calculations, which uses leave-one-out for cases for computations.
   */
  feature_full_residuals?: boolean;
  /**
   * If True, outputs feature residuals for all (context and action) features for just the specified case. Uses leave-one-out for each feature, while using the others to predict the left out feature with their corresponding values from this case.
   */
  feature_full_residuals_for_case?: boolean;
  /**
   * If True, outputs this case's full residual conviction for each feature. Computed as the dataset feature full residual divided by each case's feature full residual.
   */
  feature_full_residual_convictions_for_case?: boolean;
  /**
   * When True will compute the Accuracy Contribution for each context feature at predicting the action feature value of the influential cases. Uses robust logic, making predictions using contexts sampled from the power set of context features.
   */
  feature_robust_accuracy_contributions?: boolean;
  /**
   * If True, outputs each context feature's Accuracy Contribution in predicting the action feature as an explanation detail given that the specified prediction was already made as specified by the action value. Uses both context and action features of the reacted case to determine that area. Uses robust calculations, which uses uniform sampling from the power set of features as the contexts for predictions.
   */
  feature_robust_accuracy_contributions_ex_post?: boolean;
  /**
   * If True outputs each context feature's absolute and directional differences between the predicted action feature value and the predicted action feature value if each context were not in the dataset for all context features in the local data area Uses robust calculations, which uses uniform sampling from the power set of features as the contexts for predictions. Directional feature contributions are returned under the key 'feature_robust_directional_prediction_contributions'.
   */
  feature_robust_prediction_contributions?: boolean;
  /**
   * If True outputs each context feature's absolute and directional differences between the predicted action feature value and the predicted action feature value if each context feature were not in the model for all context features in this case, using only the values from this specific case. Uses robust calculations, which uses uniform sampling from the power set of features as the contexts for predictions. Directional case feature contributions are returned under the 'feature_robust_directional_prediction_contributions_for_case' key.
   */
  feature_robust_prediction_contributions_for_case?: boolean;
  /**
   * If True, outputs feature residuals for all (context and action) features locally around the prediction. Uses only the context features of the reacted case to determine that area. Uses robust calculations, which uses uniform sampling from the power set of features as the contexts for predictions. 'selected_prediction_stats' controls the returned prediction stats.
   */
  feature_robust_residuals?: boolean;
  /**
   * If True, outputs feature residuals for all (context and action) features for just the specified case. Uses robust calculations, which uses uniform sampling from the power set of features as the contexts for predictions.
   */
  feature_robust_residuals_for_case?: boolean;
  /**
   * When true, outputs the number of attempts taken to generate each case. Only applicable when 'generate_new_cases' is "always" or "attempt". When used in react_series, "series_generate_attempts" is also returned.
   */
  generate_attempts?: boolean;
  /**
   * A dictionary of feature name to feature value. If specified, shows how a prediction could change in a what-if scenario where the influential cases' context feature values are replaced with the specified values. Iterates over all influential cases, predicting the action features each one using the updated hypothetical values. Outputs the predicted arithmetic over the influential cases for each action feature.
   */
  hypothetical_values?: Record<string, any>;
  /**
   * When true, outputs the most influential cases and their influence weights based on the surprisal of each case relative to the context being predicted among the cases. Uses only the context features of the reacted case.
   */
  influential_cases?: boolean;
  /**
   * When true, outputs familiarity conviction of addition for each of the influential cases.
   */
  influential_cases_familiarity_convictions?: boolean;
  /**
   * When true, outputs the surprisal for each of the influential cases.
   */
  influential_cases_raw_weights?: boolean;
  /**
   * When true, outputs an automatically determined (when 'num_most_similar_cases' is not specified) relevant number of similar cases, which will first include the influential cases. Uses only the context features of the reacted case.
   */
  most_similar_cases?: boolean;
  /**
   * When defined, outputs this manually specified number of boundary cases. Takes precedence over 'boundary_cases' parameter.
   */
  num_boundary_cases?: number;
  /**
   * When defined, outputs this manually specified number of most similar cases, which will first include the influential cases. Takes precedence over 'most_similar_cases' parameter.
   */
  num_most_similar_cases?: number;
  /**
   * When defined, outputs the specified number of most similar case indices when 'distance_ratio' is also set to true.
   */
  num_most_similar_case_indices?: number;
  /**
   * Specifies the number of robust samples to use for each case. Applicable only for computing robust feature contributions or robust case feature contributions. Defaults to 2000 when unspecified. Higher values will take longer but provide more stable results.
   */
  num_robust_prediction_contributions_samples_per_case?: number;
  /**
   * When true, outputs observational errors for all features as defined in feature attributes.
   */
  observational_errors?: boolean;
  /**
   * When true, outputs the reacted case's context feature values that are outside the min or max of the corresponding feature values of all the cases in the local data area. Uses only the context features of the reacted case to determine that area.
   */
  outlying_feature_values?: boolean;
  /**
   * When true outputs feature prediction stats for all (context and action) features locally around the prediction. The stats returned  are ("r2", "rmse", "spearman_coeff", "precision", "recall", "accuracy", "mcc", "confusion_matrix", "missing_value_accuracy"). Uses only the context features of the reacted case to determine that area. Uses full calculations, which uses leave-one-out context features for computations. 'selected_prediction_stats' controls the returned prediction stats.
   */
  prediction_stats?: boolean;
  /**
   * When true, outputs a collection of typical values around the given contexts for each context feature. If a list of feature names, outputs a collection of typical values around the given contexts for each specified feature.
   */
  relevant_values?: boolean | string[];
  /**
   * Types of stats to output. When unspecified, returns all except the confusion_matrix. If all, then returns all including the confusion_matrix.
   */
  selected_prediction_stats?: PredictionStat[];
  /**
   * When true, outputs the mean absolute deviation (MAD) of each continuous feature to represent the estimated uncertainty for each timestep of each generated series based on internal generative forecasts.
   */
  series_residuals?: boolean;
  /**
   * The number of generative series to use when estimating the uncertainty of the series over time. Defaults to 30 when unspecified.
   */
  series_residuals_num_samples?: number;
  /**
   * When true, outputs similarity conviction for the reacted case. Uses both context and action feature values as the case values for all computations. This is defined as expected (local) distance contribution divided by reacted case distance contribution.
   */
  similarity_conviction?: boolean;
};
