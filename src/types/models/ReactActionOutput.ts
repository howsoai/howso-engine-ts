/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { ReactResponse } from "./ReactResponse";
import { ReactResponseFromJSON, ReactResponseToJSON } from "./ReactResponse";

/**
 *
 * @export
 * @interface ReactActionOutput
 */
export interface ReactActionOutput {
  /**
   * The async action's unique identifier.
   * @type {string}
   * @memberof ReactActionOutput
   */
  action_id?: string;
  /**
   * The status of the action.
   * @type {string}
   * @memberof ReactActionOutput
   */
  status: string;
  /**
   * The type of operation that is running.
   * @type {string}
   * @memberof ReactActionOutput
   */
  operation_type: string;
  /**
   *
   * @type {ReactResponse}
   * @memberof ReactActionOutput
   */
  output?: ReactResponse | null;
}

/**
 * Check if a given object implements the ReactActionOutput interface.
 */
export function instanceOfReactActionOutput(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "status" in value;
  isInstance = isInstance && "operation_type" in value;

  return isInstance;
}

export function ReactActionOutputFromJSON(json: any): ReactActionOutput {
  return ReactActionOutputFromJSONTyped(json, false);
}

export function ReactActionOutputFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReactActionOutput {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    action_id: !exists(json, "action_id") ? undefined : json["action_id"],
    status: json["status"],
    operation_type: json["operation_type"],
    output: !exists(json, "output") ? undefined : ReactResponseFromJSON(json["output"]),
  };
}

export function ReactActionOutputToJSON(value?: ReactActionOutput | null): any {
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
    output: ReactResponseToJSON(value.output),
  };
}
