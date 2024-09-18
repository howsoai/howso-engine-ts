/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { TrainResponse } from "./TrainResponse";
import { TrainResponseFromJSON, TrainResponseToJSON } from "./TrainResponse";

/**
 *
 * @export
 * @interface TrainActionOutput
 */
export interface TrainActionOutput {
  /**
   * The async action's unique identifier.
   * @type {string}
   * @memberof TrainActionOutput
   */
  action_id?: string;
  /**
   * The status of the action.
   * @type {string}
   * @memberof TrainActionOutput
   */
  status: string;
  /**
   * The type of operation that is running.
   * @type {string}
   * @memberof TrainActionOutput
   */
  operation_type: string;
  /**
   *
   * @type {TrainResponse}
   * @memberof TrainActionOutput
   */
  output?: TrainResponse | null;
}

/**
 * Check if a given object implements the TrainActionOutput interface.
 */
export function instanceOfTrainActionOutput(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "status" in value;
  isInstance = isInstance && "operation_type" in value;

  return isInstance;
}

export function TrainActionOutputFromJSON(json: any): TrainActionOutput {
  return TrainActionOutputFromJSONTyped(json, false);
}

export function TrainActionOutputFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrainActionOutput {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    action_id: !exists(json, "action_id") ? undefined : json["action_id"],
    status: json["status"],
    operation_type: json["operation_type"],
    output: !exists(json, "output") ? undefined : TrainResponseFromJSON(json["output"]),
  };
}

export function TrainActionOutputToJSON(value?: TrainActionOutput | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    action_id: value.action_id,
    status: value.status,
    operation_type: value.operation_type,
    output: TrainResponseToJSON(value.output),
  };
}
