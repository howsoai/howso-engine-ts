/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { ReactSeriesResponse } from "./ReactSeriesResponse";
import { ReactSeriesResponseFromJSON, ReactSeriesResponseToJSON } from "./ReactSeriesResponse";

/**
 *
 * @export
 * @interface ReactSeriesActionOutput
 */
export interface ReactSeriesActionOutput {
  /**
   * The async action's unique identifier.
   * @type {string}
   * @memberof ReactSeriesActionOutput
   */
  action_id?: string;
  /**
   * The status of the action.
   * @type {string}
   * @memberof ReactSeriesActionOutput
   */
  status: string;
  /**
   * The type of operation that is running.
   * @type {string}
   * @memberof ReactSeriesActionOutput
   */
  operation_type: string;
  /**
   *
   * @type {ReactSeriesResponse}
   * @memberof ReactSeriesActionOutput
   */
  output?: ReactSeriesResponse | null;
}

/**
 * Check if a given object implements the ReactSeriesActionOutput interface.
 */
export function instanceOfReactSeriesActionOutput(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "status" in value;
  isInstance = isInstance && "operation_type" in value;

  return isInstance;
}

export function ReactSeriesActionOutputFromJSON(json: any): ReactSeriesActionOutput {
  return ReactSeriesActionOutputFromJSONTyped(json, false);
}

export function ReactSeriesActionOutputFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReactSeriesActionOutput {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    action_id: !exists(json, "action_id") ? undefined : json["action_id"],
    status: json["status"],
    operation_type: json["operation_type"],
    output: !exists(json, "output") ? undefined : ReactSeriesResponseFromJSON(json["output"]),
  };
}

export function ReactSeriesActionOutputToJSON(value?: ReactSeriesActionOutput | null): any {
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
    output: ReactSeriesResponseToJSON(value.output),
  };
}
