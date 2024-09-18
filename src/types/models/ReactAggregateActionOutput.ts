/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { ReactAggregateResponse } from "./ReactAggregateResponse";
import { ReactAggregateResponseFromJSON, ReactAggregateResponseToJSON } from "./ReactAggregateResponse";

/**
 *
 * @export
 * @interface ReactAggregateActionOutput
 */
export interface ReactAggregateActionOutput {
  /**
   * The async action's unique identifier.
   * @type {string}
   * @memberof ReactAggregateActionOutput
   */
  action_id?: string;
  /**
   * The status of the action.
   * @type {string}
   * @memberof ReactAggregateActionOutput
   */
  status: string;
  /**
   * The type of operation that is running.
   * @type {string}
   * @memberof ReactAggregateActionOutput
   */
  operation_type: string;
  /**
   *
   * @type {ReactAggregateResponse}
   * @memberof ReactAggregateActionOutput
   */
  output?: ReactAggregateResponse | null;
}

/**
 * Check if a given object implements the ReactAggregateActionOutput interface.
 */
export function instanceOfReactAggregateActionOutput(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "status" in value;
  isInstance = isInstance && "operation_type" in value;

  return isInstance;
}

export function ReactAggregateActionOutputFromJSON(json: any): ReactAggregateActionOutput {
  return ReactAggregateActionOutputFromJSONTyped(json, false);
}

export function ReactAggregateActionOutputFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ReactAggregateActionOutput {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    action_id: !exists(json, "action_id") ? undefined : json["action_id"],
    status: json["status"],
    operation_type: json["operation_type"],
    output: !exists(json, "output") ? undefined : ReactAggregateResponseFromJSON(json["output"]),
  };
}

export function ReactAggregateActionOutputToJSON(value?: ReactAggregateActionOutput | null): any {
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
    output: ReactAggregateResponseToJSON(value.output),
  };
}
