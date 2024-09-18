/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * Result of a destruct trainee operation.
 * @export
 * @interface DestructTraineeResponse
 */
export interface DestructTraineeResponse {
  /**
   *
   * @type {string}
   * @memberof DestructTraineeResponse
   */
  message?: string;
}

/**
 * Check if a given object implements the DestructTraineeResponse interface.
 */
export function instanceOfDestructTraineeResponse(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function DestructTraineeResponseFromJSON(json: any): DestructTraineeResponse {
  return DestructTraineeResponseFromJSONTyped(json, false);
}

export function DestructTraineeResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): DestructTraineeResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    message: !exists(json, "message") ? undefined : json["message"],
  };
}

export function DestructTraineeResponseToJSON(value?: DestructTraineeResponse | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    message: value.message,
  };
}
