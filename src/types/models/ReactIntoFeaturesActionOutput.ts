/**
 * Howso API
 * OpenAPI implementation for interacting with the Howso API.
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists } from "../runtime";
import type { ReactIntoFeaturesResponse } from "./ReactIntoFeaturesResponse";
import { ReactIntoFeaturesResponseFromJSON, ReactIntoFeaturesResponseToJSON } from "./ReactIntoFeaturesResponse";

/**
 *
 * @export
 * @interface ReactIntoFeaturesActionOutput
 */
export interface ReactIntoFeaturesActionOutput {
  /**
   * The async action's unique identifier.
   * @type {string}
   * @memberof ReactIntoFeaturesActionOutput
   */
  action_id?: string;
  /**
   * The status of the action.
   * @type {string}
   * @memberof ReactIntoFeaturesActionOutput
   */
  status: string;
  /**
   * The type of operation that is running.
   * @type {string}
   * @memberof ReactIntoFeaturesActionOutput
   */
  operation_type: string;
  /**
   *
   * @type {ReactIntoFeaturesResponse}
   * @memberof ReactIntoFeaturesActionOutput
   */
  output?: ReactIntoFeaturesResponse | null;
}

/**
 * Check if a given object implements the ReactIntoFeaturesActionOutput interface.
 */
export function instanceOfReactIntoFeaturesActionOutput(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "status" in value;
  isInstance = isInstance && "operation_type" in value;

  return isInstance;
}

export function ReactIntoFeaturesActionOutputFromJSON(json: any): ReactIntoFeaturesActionOutput {
  return ReactIntoFeaturesActionOutputFromJSONTyped(json, false);
}

export function ReactIntoFeaturesActionOutputFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ReactIntoFeaturesActionOutput {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    action_id: !exists(json, "action_id") ? undefined : json["action_id"],
    status: json["status"],
    operation_type: json["operation_type"],
    output: !exists(json, "output") ? undefined : ReactIntoFeaturesResponseFromJSON(json["output"]),
  };
}

export function ReactIntoFeaturesActionOutputToJSON(value?: ReactIntoFeaturesActionOutput | null): any {
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
    output: ReactIntoFeaturesResponseToJSON(value.output),
  };
}