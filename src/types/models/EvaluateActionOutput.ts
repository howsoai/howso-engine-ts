/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { EvaluateResponse } from "./EvaluateResponse";
import { EvaluateResponseFromJSON, EvaluateResponseToJSON } from "./EvaluateResponse";

/**
 *
 * @export
 * @interface EvaluateActionOutput
 */
export interface EvaluateActionOutput {
  /**
   * The async action's unique identifier.
   * @type {string}
   * @memberof EvaluateActionOutput
   */
  action_id?: string;
  /**
   * The status of the action.
   * @type {string}
   * @memberof EvaluateActionOutput
   */
  status: string;
  /**
   * The type of operation that is running.
   * @type {string}
   * @memberof EvaluateActionOutput
   */
  operation_type: string;
  /**
   *
   * @type {EvaluateResponse}
   * @memberof EvaluateActionOutput
   */
  output?: EvaluateResponse | null;
}

/**
 * Check if a given object implements the EvaluateActionOutput interface.
 */
export function instanceOfEvaluateActionOutput(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "status" in value;
  isInstance = isInstance && "operation_type" in value;

  return isInstance;
}

export function EvaluateActionOutputFromJSON(json: any): EvaluateActionOutput {
  return EvaluateActionOutputFromJSONTyped(json, false);
}

export function EvaluateActionOutputFromJSONTyped(json: any, ignoreDiscriminator: boolean): EvaluateActionOutput {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    action_id: !exists(json, "action_id") ? undefined : json["action_id"],
    status: json["status"],
    operation_type: json["operation_type"],
    output: !exists(json, "output") ? undefined : EvaluateResponseFromJSON(json["output"]),
  };
}

export function EvaluateActionOutputToJSON(value?: EvaluateActionOutput | null): any {
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
    output: EvaluateResponseToJSON(value.output),
  };
}
