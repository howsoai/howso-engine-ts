/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { AccountIdentity } from "./AccountIdentity";
import { AccountIdentityFromJSON, AccountIdentityToJSON } from "./AccountIdentity";

/**
 * A model session.
 * @export
 * @interface Session
 */
export interface Session {
  /**
   * The session's unique identifier.
   * @type {string}
   * @memberof Session
   */
  id?: string;
  /**
   * The name given to the session.
   * @type {string}
   * @memberof Session
   */
  name?: string;
  /**
   *
   * @type {AccountIdentity}
   * @memberof Session
   */
  user?: AccountIdentity;
  /**
   * Any key-value pair to store custom metadata for the session.
   * @type {{ [key: string]: any; }}
   * @memberof Session
   */
  metadata?: { [key: string]: any };
  /**
   * The timestamp of when the session was issued.
   * @type {Date}
   * @memberof Session
   */
  created_date?: Date;
  /**
   * The timestamp of when the session was modified.
   * @type {Date}
   * @memberof Session
   */
  modified_date?: Date;
}

/**
 * Check if a given object implements the Session interface.
 */
export function instanceOfSession(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function SessionFromJSON(json: any): Session {
  return SessionFromJSONTyped(json, false);
}

export function SessionFromJSONTyped(json: any, ignoreDiscriminator: boolean): Session {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    id: !exists(json, "id") ? undefined : json["id"],
    name: !exists(json, "name") ? undefined : json["name"],
    user: !exists(json, "user") ? undefined : AccountIdentityFromJSON(json["user"]),
    metadata: !exists(json, "metadata") ? undefined : json["metadata"],
    created_date: !exists(json, "created_date") ? undefined : new Date(json["created_date"]),
    modified_date: !exists(json, "modified_date") ? undefined : new Date(json["modified_date"]),
  };
}

export function SessionToJSON(value?: Session | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    id: value.id,
    name: value.name,
    user: AccountIdentityToJSON(value.user),
    metadata: value.metadata,
    created_date: value.created_date === undefined ? undefined : value.created_date.toISOString(),
    modified_date: value.modified_date === undefined ? undefined : value.modified_date.toISOString(),
  };
}
