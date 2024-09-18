/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface TraineeAcquireResourcesRequest
 */
export interface TraineeAcquireResourcesRequest {
  /**
   * The maximum seconds to wait to acquire resources.
   * @type {number}
   * @memberof TraineeAcquireResourcesRequest
   */
  timeout?: number;
}

/**
 * Check if a given object implements the TraineeAcquireResourcesRequest interface.
 */
export function instanceOfTraineeAcquireResourcesRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function TraineeAcquireResourcesRequestFromJSON(json: any): TraineeAcquireResourcesRequest {
  return TraineeAcquireResourcesRequestFromJSONTyped(json, false);
}

export function TraineeAcquireResourcesRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): TraineeAcquireResourcesRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    timeout: !exists(json, "timeout") ? undefined : json["timeout"],
  };
}

export function TraineeAcquireResourcesRequestToJSON(value?: TraineeAcquireResourcesRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    timeout: value.timeout,
  };
}
