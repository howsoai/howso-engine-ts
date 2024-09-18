/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { ReactAggregateResponseContentConfusionMatrix } from "./ReactAggregateResponseContentConfusionMatrix";
import {
  ReactAggregateResponseContentConfusionMatrixFromJSON,
  ReactAggregateResponseContentConfusionMatrixToJSON,
} from "./ReactAggregateResponseContentConfusionMatrix";

/**
 * Prediction feature statistics and details.
 * @export
 * @interface ReactAggregateResponseContent
 */
export interface ReactAggregateResponseContent {
  /**
   * The accuracy (1 - mean absolute error) value. Applicable only for nominal features, computed by computing residuals.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  accuracy?: number | null;
  /**
   *
   * @type {ReactAggregateResponseContentConfusionMatrix}
   * @memberof ReactAggregateResponseContent
   */
  confusion_matrix?: ReactAggregateResponseContentConfusionMatrix | null;
  /**
   * The full contribution to the predicted value of an action feature.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  feature_contributions_full?: number | null;
  /**
   * The robust contribution to the predicted value of an action feature.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  feature_contributions_robust?: number | null;
  /**
   * The mean absolute error value.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  mae?: number | null;
  /**
   * The full feature residuals.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  feature_residuals_full?: number | null;
  /**
   * The robust feature residuals.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  feature_residuals_robust?: number | null;
  /**
   * The full mean decrease in accuracy value. Computed by dropping each feature and use the full set of remaining context features for each prediction.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  feature_mda_full?: number | null;
  /**
   * The robust mean decrease in accuracy value. Computed by dropping each feature and use the full set of remaining context features for each prediction.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  feature_mda_robust?: number | null;
  /**
   * The full mean decrease in accuracy permutation value. Computed by scrambling each feature and using the full set of remaining context features for each prediction.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  feature_mda_permutation_full?: number | null;
  /**
   * The robust mean decrease in accuracy permutation value. Computed by scrambling each feature and using the full set of remaining context features for each prediction.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  feature_mda_permutation_robust?: number | null;
  /**
   * The precision (positive predictive) value. Applicable only for nominal features, computed by computing residuals.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  precision?: number | null;
  /**
   * The R-squared (coefficient of determination) value. Applicable only for continuous features, computed by computing residuals.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  r2?: number | null;
  /**
   * The recall (sensitivity) value. Applicable only for nominal features, computed by computing residuals.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  recall?: number | null;
  /**
   * The missing value accuracy.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  missing_value_accuracy?: number | null;
  /**
   * The root-mean-squared-error value. Applicable only for continuous features, computed by computing residuals.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  rmse?: number | null;
  /**
   * The Spearman's rank correlation coefficient value. Applicable only for continuous features, computed by computing residuals.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  spearman_coeff?: number | null;
  /**
   * The Matthews correlation coefficient value. Applicable only for nominal features, computed by computing residuals.
   * @type {number}
   * @memberof ReactAggregateResponseContent
   */
  mcc?: number | null;
}

/**
 * Check if a given object implements the ReactAggregateResponseContent interface.
 */
export function instanceOfReactAggregateResponseContent(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ReactAggregateResponseContentFromJSON(json: any): ReactAggregateResponseContent {
  return ReactAggregateResponseContentFromJSONTyped(json, false);
}

export function ReactAggregateResponseContentFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ReactAggregateResponseContent {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    accuracy: !exists(json, "accuracy") ? undefined : json["accuracy"],
    confusion_matrix: !exists(json, "confusion_matrix")
      ? undefined
      : ReactAggregateResponseContentConfusionMatrixFromJSON(json["confusion_matrix"]),
    feature_contributions_full: !exists(json, "feature_contributions_full")
      ? undefined
      : json["feature_contributions_full"],
    feature_contributions_robust: !exists(json, "feature_contributions_robust")
      ? undefined
      : json["feature_contributions_robust"],
    mae: !exists(json, "mae") ? undefined : json["mae"],
    feature_residuals_full: !exists(json, "feature_residuals_full") ? undefined : json["feature_residuals_full"],
    feature_residuals_robust: !exists(json, "feature_residuals_robust") ? undefined : json["feature_residuals_robust"],
    feature_mda_full: !exists(json, "feature_mda_full") ? undefined : json["feature_mda_full"],
    feature_mda_robust: !exists(json, "feature_mda_robust") ? undefined : json["feature_mda_robust"],
    feature_mda_permutation_full: !exists(json, "feature_mda_permutation_full")
      ? undefined
      : json["feature_mda_permutation_full"],
    feature_mda_permutation_robust: !exists(json, "feature_mda_permutation_robust")
      ? undefined
      : json["feature_mda_permutation_robust"],
    precision: !exists(json, "precision") ? undefined : json["precision"],
    r2: !exists(json, "r2") ? undefined : json["r2"],
    recall: !exists(json, "recall") ? undefined : json["recall"],
    missing_value_accuracy: !exists(json, "missing_value_accuracy") ? undefined : json["missing_value_accuracy"],
    rmse: !exists(json, "rmse") ? undefined : json["rmse"],
    spearman_coeff: !exists(json, "spearman_coeff") ? undefined : json["spearman_coeff"],
    mcc: !exists(json, "mcc") ? undefined : json["mcc"],
  };
}

export function ReactAggregateResponseContentToJSON(value?: ReactAggregateResponseContent | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    accuracy: value.accuracy,
    confusion_matrix: ReactAggregateResponseContentConfusionMatrixToJSON(value.confusion_matrix),
    feature_contributions_full: value.feature_contributions_full,
    feature_contributions_robust: value.feature_contributions_robust,
    mae: value.mae,
    feature_residuals_full: value.feature_residuals_full,
    feature_residuals_robust: value.feature_residuals_robust,
    feature_mda_full: value.feature_mda_full,
    feature_mda_robust: value.feature_mda_robust,
    feature_mda_permutation_full: value.feature_mda_permutation_full,
    feature_mda_permutation_robust: value.feature_mda_permutation_robust,
    precision: value.precision,
    r2: value.r2,
    recall: value.recall,
    missing_value_accuracy: value.missing_value_accuracy,
    rmse: value.rmse,
    spearman_coeff: value.spearman_coeff,
    mcc: value.mcc,
  };
}
