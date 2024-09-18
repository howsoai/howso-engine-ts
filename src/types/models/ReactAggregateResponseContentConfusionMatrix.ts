/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface ReactAggregateResponseContentConfusionMatrix
 */
export interface ReactAggregateResponseContentConfusionMatrix {
  /**
   * The sparse confusion matrix for the predicted values of an action feature.
   * @type {{ [key: string]: { [key: string]: number; }; }}
   * @memberof ReactAggregateResponseContentConfusionMatrix
   */
  matrix?: { [key: string]: { [key: string]: number } };
  /**
   * Total count of all correct predictions for classes that did not have a statistically significant amount.
   * @type {number}
   * @memberof ReactAggregateResponseContentConfusionMatrix
   */
  leftover_correct?: number;
  /**
   * Total count of all incorrect predictions for classes that did not have a statistically significant amount.
   * @type {number}
   * @memberof ReactAggregateResponseContentConfusionMatrix
   */
  leftover_incorrect?: number;
  /**
   * Total count of all other statistically insignificant predictions for classes that were predicted correctly with significance.
   * @type {number}
   * @memberof ReactAggregateResponseContentConfusionMatrix
   */
  other_counts?: number;
}

/**
 * Check if a given object implements the ReactAggregateResponseContentConfusionMatrix interface.
 */
export function instanceOfReactAggregateResponseContentConfusionMatrix(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ReactAggregateResponseContentConfusionMatrixFromJSON(
  json: any,
): ReactAggregateResponseContentConfusionMatrix {
  return ReactAggregateResponseContentConfusionMatrixFromJSONTyped(json, false);
}

export function ReactAggregateResponseContentConfusionMatrixFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ReactAggregateResponseContentConfusionMatrix {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    matrix: !exists(json, "matrix") ? undefined : json["matrix"],
    leftover_correct: !exists(json, "leftover_correct") ? undefined : json["leftover_correct"],
    leftover_incorrect: !exists(json, "leftover_incorrect") ? undefined : json["leftover_incorrect"],
    other_counts: !exists(json, "other_counts") ? undefined : json["other_counts"],
  };
}

export function ReactAggregateResponseContentConfusionMatrixToJSON(
  value?: ReactAggregateResponseContentConfusionMatrix | null,
): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    matrix: value.matrix,
    leftover_correct: value.leftover_correct,
    leftover_incorrect: value.leftover_incorrect,
    other_counts: value.other_counts,
  };
}
