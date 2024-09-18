/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface UpdateSessionRequest
 */
export interface UpdateSessionRequest {
  /**
   * Any key-value pair to store custom metadata for the session.
   * @type {{ [key: string]: any; }}
   * @memberof UpdateSessionRequest
   */
  metadata?: { [key: string]: any };
}

/**
 * Check if a given object implements the UpdateSessionRequest interface.
 */
export function instanceOfUpdateSessionRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function UpdateSessionRequestFromJSON(json: any): UpdateSessionRequest {
  return UpdateSessionRequestFromJSONTyped(json, false);
}

export function UpdateSessionRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UpdateSessionRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    metadata: !exists(json, "metadata") ? undefined : json["metadata"],
  };
}

export function UpdateSessionRequestToJSON(value?: UpdateSessionRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    metadata: value.metadata,
  };
}
