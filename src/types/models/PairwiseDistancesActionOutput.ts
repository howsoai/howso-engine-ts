/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface PairwiseDistancesActionOutput
 */
export interface PairwiseDistancesActionOutput {
  /**
   * The async action's unique identifier.
   * @type {string}
   * @memberof PairwiseDistancesActionOutput
   */
  action_id?: string;
  /**
   * The status of the action.
   * @type {string}
   * @memberof PairwiseDistancesActionOutput
   */
  status: string;
  /**
   * The type of operation that is running.
   * @type {string}
   * @memberof PairwiseDistancesActionOutput
   */
  operation_type: string;
  /**
   * The pairwise distance values.
   * @type {Array<number>}
   * @memberof PairwiseDistancesActionOutput
   */
  output?: Array<number> | null;
}

/**
 * Check if a given object implements the PairwiseDistancesActionOutput interface.
 */
export function instanceOfPairwiseDistancesActionOutput(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "status" in value;
  isInstance = isInstance && "operation_type" in value;

  return isInstance;
}

export function PairwiseDistancesActionOutputFromJSON(json: any): PairwiseDistancesActionOutput {
  return PairwiseDistancesActionOutputFromJSONTyped(json, false);
}

export function PairwiseDistancesActionOutputFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): PairwiseDistancesActionOutput {
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

export function PairwiseDistancesActionOutputToJSON(value?: PairwiseDistancesActionOutput | null): any {
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
