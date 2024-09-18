/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { ReactAggregateDetails } from "./ReactAggregateDetails";
import { ReactAggregateDetailsFromJSON, ReactAggregateDetailsToJSON } from "./ReactAggregateDetails";

/**
 * Request body for react aggregate.
 * @export
 * @interface ReactAggregateRequest
 */
export interface ReactAggregateRequest {
  /**
   *
   * @type {ReactAggregateDetails}
   * @memberof ReactAggregateRequest
   */
  details?: ReactAggregateDetails;
  /**
   * Name of target feature for which to do computations. If "prediction_stats_action_feature" and "feature_influences_action_feature" are not provided, they will default to this value. If "feature_influences_action_feature" is not provided and feature influences "details" are selected, this feature must be provided.
   * @type {string}
   * @memberof ReactAggregateRequest
   */
  action_feature?: string;
  /**
   * When feature influences such as contributions and mda, use this feature as the action feature.  If not provided, will default to the "action_feature" if provided. If "action_feature" is not provided and feature influences "details" are selected, this feature must be provided.
   * @type {string}
   * @memberof ReactAggregateRequest
   */
  feature_influences_action_feature?: string;
  /**
   * When calculating residuals and prediction stats, uses this target features's hyperparameters. The trainee must have been analyzed with this feature as the action feature first. If both "prediction_stats_action_feature" and "action_feature" are not provided, by default residuals and prediction stats uses ".targetless" hyperparameters. If "action_feature" is provided, and this value is not provided, will default to "action_feature".
   * @type {string}
   * @memberof ReactAggregateRequest
   */
  prediction_stats_action_feature?: string;
  /**
   * List of features names to use as contexts for computations. Defaults to all non-unique features if not specified.
   * @type {Array<string>}
   * @memberof ReactAggregateRequest
   */
  context_features?: Array<string>;
  /**
   * Full path for hyperparameters to use for computation. If specified for any residual computations, takes precedence over action_feature parameter.
   * @type {Array<string>}
   * @memberof ReactAggregateRequest
   */
  hyperparameter_param_path?: Array<string>;
  /**
   * Total sample size of model to use (using sampling with replacement) for robust contribution computation. Defaults to 300.
   * @type {number}
   * @memberof ReactAggregateRequest
   */
  num_robust_influence_samples?: number;
  /**
   * Specifies the number of robust samples to use for each case for robust contribution computations. Defaults to 300 + 2 * (number of features).
   * @type {number}
   * @memberof ReactAggregateRequest
   */
  num_robust_influence_samples_per_case?: number;
  /**
   * Total sample size of model to use (using sampling with replacement) for robust mda and residual computation. Defaults to 1000 * (1 + log(number of features)).  Note: robust mda will be updated to use num_robust_influence_samples in a future release.
   * @type {number}
   * @memberof ReactAggregateRequest
   */
  num_robust_residual_samples?: number;
  /**
   * Total sample size of model to use (using sampling with replacement) for all non-robust computation. Defaults to 1000. If specified overrides sample_model_fraction.
   * @type {number}
   * @memberof ReactAggregateRequest
   */
  num_samples?: number;
  /**
   * When specified, will attempt to return residuals that were computed using hyperparameters with the specified robust or non-robust type.
   * @type {boolean}
   * @memberof ReactAggregateRequest
   */
  robust_hyperparameters?: boolean;
  /**
   * A value between 0.0 - 1.0, percent of model to use in sampling (using sampling without replacement). Applicable only to non-robust computation. Ignored if num_samples is specified. Higher values provide better accuracy at the cost of compute time.
   * @type {number}
   * @memberof ReactAggregateRequest
   */
  sample_model_fraction?: number;
  /**
   * If specified will calculate residuals only on a sub model of the specified size from the full model. Applicable only to models > 1000 cases.
   * @type {number}
   * @memberof ReactAggregateRequest
   */
  sub_model_size?: number;
  /**
   * The number of predictions a class should have (value of a cell in the matrix) for it to remain in the confusion matrix. If the count is less than this value, it will be accumulated into a single value of all insignificant predictions for the class and removed from the confusion matrix. Defaults to 10, applicable only to confusion matrices when computing residuals.
   * @type {number}
   * @memberof ReactAggregateRequest
   */
  confusion_matrix_min_count?: number;
  /**
   * When calculating residuals and prediction stats, uses this target features's hyperparameters. The trainee must have been analyzed with this feature as the action feature first. If not provided, by default residuals and prediction stats uses .targetless hyperparameters.
   * @type {string}
   * @memberof ReactAggregateRequest
   */
  residuals_hyperparameter_feature?: string;
  /**
   * When True, will scale influence weights by each case's weight_feature weight. If unspecified, case weights will be used if the Trainee has them.
   * @type {boolean}
   * @memberof ReactAggregateRequest
   */
  use_case_weights?: boolean;
  /**
   * The name of the feature whose values to use as case weights. When left unspecified uses the internally managed case weight.
   * @type {string}
   * @memberof ReactAggregateRequest
   */
  weight_feature?: string;
}

/**
 * Check if a given object implements the ReactAggregateRequest interface.
 */
export function instanceOfReactAggregateRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ReactAggregateRequestFromJSON(json: any): ReactAggregateRequest {
  return ReactAggregateRequestFromJSONTyped(json, false);
}

export function ReactAggregateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReactAggregateRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    details: !exists(json, "details") ? undefined : ReactAggregateDetailsFromJSON(json["details"]),
    action_feature: !exists(json, "action_feature") ? undefined : json["action_feature"],
    feature_influences_action_feature: !exists(json, "feature_influences_action_feature")
      ? undefined
      : json["feature_influences_action_feature"],
    prediction_stats_action_feature: !exists(json, "prediction_stats_action_feature")
      ? undefined
      : json["prediction_stats_action_feature"],
    context_features: !exists(json, "context_features") ? undefined : json["context_features"],
    hyperparameter_param_path: !exists(json, "hyperparameter_param_path")
      ? undefined
      : json["hyperparameter_param_path"],
    num_robust_influence_samples: !exists(json, "num_robust_influence_samples")
      ? undefined
      : json["num_robust_influence_samples"],
    num_robust_influence_samples_per_case: !exists(json, "num_robust_influence_samples_per_case")
      ? undefined
      : json["num_robust_influence_samples_per_case"],
    num_robust_residual_samples: !exists(json, "num_robust_residual_samples")
      ? undefined
      : json["num_robust_residual_samples"],
    num_samples: !exists(json, "num_samples") ? undefined : json["num_samples"],
    robust_hyperparameters: !exists(json, "robust_hyperparameters") ? undefined : json["robust_hyperparameters"],
    sample_model_fraction: !exists(json, "sample_model_fraction") ? undefined : json["sample_model_fraction"],
    sub_model_size: !exists(json, "sub_model_size") ? undefined : json["sub_model_size"],
    confusion_matrix_min_count: !exists(json, "confusion_matrix_min_count")
      ? undefined
      : json["confusion_matrix_min_count"],
    residuals_hyperparameter_feature: !exists(json, "residuals_hyperparameter_feature")
      ? undefined
      : json["residuals_hyperparameter_feature"],
    use_case_weights: !exists(json, "use_case_weights") ? undefined : json["use_case_weights"],
    weight_feature: !exists(json, "weight_feature") ? undefined : json["weight_feature"],
  };
}

export function ReactAggregateRequestToJSON(value?: ReactAggregateRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    details: ReactAggregateDetailsToJSON(value.details),
    action_feature: value.action_feature,
    feature_influences_action_feature: value.feature_influences_action_feature,
    prediction_stats_action_feature: value.prediction_stats_action_feature,
    context_features: value.context_features,
    hyperparameter_param_path: value.hyperparameter_param_path,
    num_robust_influence_samples: value.num_robust_influence_samples,
    num_robust_influence_samples_per_case: value.num_robust_influence_samples_per_case,
    num_robust_residual_samples: value.num_robust_residual_samples,
    num_samples: value.num_samples,
    robust_hyperparameters: value.robust_hyperparameters,
    sample_model_fraction: value.sample_model_fraction,
    sub_model_size: value.sub_model_size,
    confusion_matrix_min_count: value.confusion_matrix_min_count,
    residuals_hyperparameter_feature: value.residuals_hyperparameter_feature,
    use_case_weights: value.use_case_weights,
    weight_feature: value.weight_feature,
  };
}
