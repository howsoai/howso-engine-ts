/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * The result of the train request.
 * @export
 * @interface TrainResponse
 */
export interface TrainResponse {
  /**
   * The indices of ablated cases.
   * @type {Array<number>}
   * @memberof TrainResponse
   */
  ablated_indices?: Array<number>;
  /**
   * The number of cases that were trained.
   * @type {number}
   * @memberof TrainResponse
   */
  num_trained?: number;
  /**
   * Status message output. Valid status values are:
   *   null - default output, no status
   *   "analyze" - if auto analysis is enabled, the model has grown large enough to be analyzed again,
   *     and 'skip_auto_analyze' was True on the call to `train`.
   *   "analyzed" - if auto analysis is enabled and there was an analysis that occurred during training.
   * @type {string}
   * @memberof TrainResponse
   */
  status?: string | null;
}

/**
 * Check if a given object implements the TrainResponse interface.
 */
export function instanceOfTrainResponse(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function TrainResponseFromJSON(json: any): TrainResponse {
  return TrainResponseFromJSONTyped(json, false);
}

export function TrainResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrainResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    ablated_indices: !exists(json, "ablated_indices") ? undefined : json["ablated_indices"],
    num_trained: !exists(json, "num_trained") ? undefined : json["num_trained"],
    status: !exists(json, "status") ? undefined : json["status"],
  };
}

export function TrainResponseToJSON(value?: TrainResponse | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    ablated_indices: value.ablated_indices,
    num_trained: value.num_trained,
    status: value.status,
  };
}
