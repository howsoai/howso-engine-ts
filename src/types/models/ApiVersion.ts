/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * API version information.
 * @export
 * @interface ApiVersion
 */
export interface ApiVersion {
  /**
   * The API version.
   * @type {string}
   * @memberof ApiVersion
   */
  api?: string;
  /**
   * The version of the locally installed client.
   * @type {string}
   * @memberof ApiVersion
   */
  client?: string;
}

/**
 * Check if a given object implements the ApiVersion interface.
 */
export function instanceOfApiVersion(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ApiVersionFromJSON(json: any): ApiVersion {
  return ApiVersionFromJSONTyped(json, false);
}

export function ApiVersionFromJSONTyped(json: any, ignoreDiscriminator: boolean): ApiVersion {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    api: !exists(json, "api") ? undefined : json["api"],
    client: !exists(json, "client") ? undefined : json["client"],
  };
}

export function ApiVersionToJSON(value?: ApiVersion | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    api: value.api,
    client: value.client,
  };
}
