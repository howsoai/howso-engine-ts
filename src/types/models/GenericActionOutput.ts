/**
 * Howso API
 * OpenAPI implementation for interacting with the Howso API.
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface GenericActionOutput
 */
export interface GenericActionOutput {
  /**
   * The async action's unique identifier.
   * @type {string}
   * @memberof GenericActionOutput
   */
  action_id?: string;
  /**
   * The status of the action.
   * @type {string}
   * @memberof GenericActionOutput
   */
  status: string;
  /**
   * The type of operation that is running.
   * @type {string}
   * @memberof GenericActionOutput
   */
  operation_type: string;
  /**
   *
   * @type {any}
   * @memberof GenericActionOutput
   */
  output?: any | null;
}

/**
 * Check if a given object implements the GenericActionOutput interface.
 */
export function instanceOfGenericActionOutput(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "status" in value;
  isInstance = isInstance && "operation_type" in value;

  return isInstance;
}

export function GenericActionOutputFromJSON(json: any): GenericActionOutput {
  return GenericActionOutputFromJSONTyped(json, false);
}

export function GenericActionOutputFromJSONTyped(json: any, ignoreDiscriminator: boolean): GenericActionOutput {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    action_id: !exists(json, "action_id") ? undefined : json["action_id"],
    status: json["status"],
    operation_type: json["operation_type"],
    output: !exists(json, "output") ? undefined : json["output"],
  };
}

export function GenericActionOutputToJSON(value?: GenericActionOutput | null): any {
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
    output: value.output,
  };
}
