/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * Response from persist_trace
 * @export
 * @interface TraceResponse
 */
export interface TraceResponse {
  /**
   *
   * @type {string}
   * @memberof TraceResponse
   */
  presigned_url?: string;
  /**
   *
   * @type {string}
   * @memberof TraceResponse
   */
  expires_at?: string;
}

/**
 * Check if a given object implements the TraceResponse interface.
 */
export function instanceOfTraceResponse(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function TraceResponseFromJSON(json: any): TraceResponse {
  return TraceResponseFromJSONTyped(json, false);
}

export function TraceResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): TraceResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    presigned_url: !exists(json, "presigned_url") ? undefined : json["presigned_url"],
    expires_at: !exists(json, "expires_at") ? undefined : json["expires_at"],
  };
}

export function TraceResponseToJSON(value?: TraceResponse | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    presigned_url: value.presigned_url,
    expires_at: value.expires_at,
  };
}
