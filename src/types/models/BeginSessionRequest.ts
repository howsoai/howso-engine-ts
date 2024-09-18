/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface BeginSessionRequest
 */
export interface BeginSessionRequest {
  /**
   * The name given to the session.
   * @type {string}
   * @memberof BeginSessionRequest
   */
  name: string;
  /**
   * Any key-value pair to store custom metadata for the session.
   * @type {{ [key: string]: any; }}
   * @memberof BeginSessionRequest
   */
  metadata?: { [key: string]: any };
}

/**
 * Check if a given object implements the BeginSessionRequest interface.
 */
export function instanceOfBeginSessionRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "name" in value;

  return isInstance;
}

export function BeginSessionRequestFromJSON(json: any): BeginSessionRequest {
  return BeginSessionRequestFromJSONTyped(json, false);
}

export function BeginSessionRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): BeginSessionRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: json["name"],
    metadata: !exists(json, "metadata") ? undefined : json["metadata"],
  };
}

export function BeginSessionRequestToJSON(value?: BeginSessionRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    metadata: value.metadata,
  };
}
