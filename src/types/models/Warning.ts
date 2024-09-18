/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface Warning
 */
export interface Warning {
  /**
   *
   * @type {string}
   * @memberof Warning
   */
  detail?: string;
}

/**
 * Check if a given object implements the Warning interface.
 */
export function instanceOfWarning(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function WarningFromJSON(json: any): Warning {
  return WarningFromJSONTyped(json, false);
}

export function WarningFromJSONTyped(json: any, ignoreDiscriminator: boolean): Warning {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    detail: !exists(json, "detail") ? undefined : json["detail"],
  };
}

export function WarningToJSON(value?: Warning | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    detail: value.detail,
  };
}
