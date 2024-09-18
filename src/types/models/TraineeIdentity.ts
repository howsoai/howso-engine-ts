/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { AccountIdentity } from "./AccountIdentity";
import { AccountIdentityFromJSON, AccountIdentityToJSON } from "./AccountIdentity";

/**
 *
 * @export
 * @interface TraineeIdentity
 */
export interface TraineeIdentity {
  /**
   * The trainee UUID.
   * @type {string}
   * @memberof TraineeIdentity
   */
  id?: string;
  /**
   * The trainee name.
   * @type {string}
   * @memberof TraineeIdentity
   */
  name?: string;
  /**
   *
   * @type {AccountIdentity}
   * @memberof TraineeIdentity
   */
  created_by?: AccountIdentity;
}

/**
 * Check if a given object implements the TraineeIdentity interface.
 */
export function instanceOfTraineeIdentity(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function TraineeIdentityFromJSON(json: any): TraineeIdentity {
  return TraineeIdentityFromJSONTyped(json, false);
}

export function TraineeIdentityFromJSONTyped(json: any, ignoreDiscriminator: boolean): TraineeIdentity {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    name: !exists(json, "name") ? undefined : json["name"],
    created_by: !exists(json, "created_by") ? undefined : AccountIdentityFromJSON(json["created_by"]),
  };
}

export function TraineeIdentityToJSON(value?: TraineeIdentity | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    created_by: AccountIdentityToJSON(value.created_by),
  };
}
