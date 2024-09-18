/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { ReactGroupResponse } from "./ReactGroupResponse";
import { ReactGroupResponseFromJSON, ReactGroupResponseToJSON } from "./ReactGroupResponse";

/**
 *
 * @export
 * @interface ReactGroupActionOutput
 */
export interface ReactGroupActionOutput {
  /**
   * The async action's unique identifier.
   * @type {string}
   * @memberof ReactGroupActionOutput
   */
  action_id?: string;
  /**
   * The status of the action.
   * @type {string}
   * @memberof ReactGroupActionOutput
   */
  status: string;
  /**
   * The type of operation that is running.
   * @type {string}
   * @memberof ReactGroupActionOutput
   */
  operation_type: string;
  /**
   *
   * @type {ReactGroupResponse}
   * @memberof ReactGroupActionOutput
   */
  output?: ReactGroupResponse | null;
}

/**
 * Check if a given object implements the ReactGroupActionOutput interface.
 */
export function instanceOfReactGroupActionOutput(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "status" in value;
  isInstance = isInstance && "operation_type" in value;

  return isInstance;
}

export function ReactGroupActionOutputFromJSON(json: any): ReactGroupActionOutput {
  return ReactGroupActionOutputFromJSONTyped(json, false);
}

export function ReactGroupActionOutputFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReactGroupActionOutput {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    action_id: !exists(json, "action_id") ? undefined : json["action_id"],
    status: json["status"],
    operation_type: json["operation_type"],
    output: !exists(json, "output") ? undefined : ReactGroupResponseFromJSON(json["output"]),
  };
}

export function ReactGroupActionOutputToJSON(value?: ReactGroupActionOutput | null): any {
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
    output: ReactGroupResponseToJSON(value.output),
  };
}
