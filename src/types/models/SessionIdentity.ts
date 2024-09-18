/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * A model session identity.
 * @export
 * @interface SessionIdentity
 */
export interface SessionIdentity {
  /**
   * The session's unique identifier.
   * @type {string}
   * @memberof SessionIdentity
   */
  id?: string;
  /**
   * The name given to the session.
   * @type {string}
   * @memberof SessionIdentity
   */
  name?: string;
}

/**
 * Check if a given object implements the SessionIdentity interface.
 */
export function instanceOfSessionIdentity(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function SessionIdentityFromJSON(json: any): SessionIdentity {
  return SessionIdentityFromJSONTyped(json, false);
}

export function SessionIdentityFromJSONTyped(json: any, ignoreDiscriminator: boolean): SessionIdentity {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    name: !exists(json, "name") ? undefined : json["name"],
  };
}

export function SessionIdentityToJSON(value?: SessionIdentity | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
  };
}
