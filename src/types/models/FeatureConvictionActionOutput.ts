/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { FeatureConviction } from "./FeatureConviction";
import { FeatureConvictionFromJSON, FeatureConvictionToJSON } from "./FeatureConviction";

/**
 *
 * @export
 * @interface FeatureConvictionActionOutput
 */
export interface FeatureConvictionActionOutput {
  /**
   * The async action's unique identifier.
   * @type {string}
   * @memberof FeatureConvictionActionOutput
   */
  action_id?: string;
  /**
   * The status of the action.
   * @type {string}
   * @memberof FeatureConvictionActionOutput
   */
  status: string;
  /**
   * The type of operation that is running.
   * @type {string}
   * @memberof FeatureConvictionActionOutput
   */
  operation_type: string;
  /**
   *
   * @type {FeatureConviction}
   * @memberof FeatureConvictionActionOutput
   */
  output?: FeatureConviction | null;
}

/**
 * Check if a given object implements the FeatureConvictionActionOutput interface.
 */
export function instanceOfFeatureConvictionActionOutput(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "status" in value;
  isInstance = isInstance && "operation_type" in value;

  return isInstance;
}

export function FeatureConvictionActionOutputFromJSON(json: any): FeatureConvictionActionOutput {
  return FeatureConvictionActionOutputFromJSONTyped(json, false);
}

export function FeatureConvictionActionOutputFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): FeatureConvictionActionOutput {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    action_id: !exists(json, "action_id") ? undefined : json["action_id"],
    status: json["status"],
    operation_type: json["operation_type"],
    output: !exists(json, "output") ? undefined : FeatureConvictionFromJSON(json["output"]),
  };
}

export function FeatureConvictionActionOutputToJSON(value?: FeatureConvictionActionOutput | null): any {
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
    output: FeatureConvictionToJSON(value.output),
  };
}
