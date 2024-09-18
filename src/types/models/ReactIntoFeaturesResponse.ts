/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { Warning } from "./Warning";
import { WarningFromJSON, WarningToJSON } from "./Warning";

/**
 *
 * @export
 * @interface ReactIntoFeaturesResponse
 */
export interface ReactIntoFeaturesResponse {
  /**
   *
   * @type {Array<Warning>}
   * @memberof ReactIntoFeaturesResponse
   */
  warnings?: Array<Warning>;
}

/**
 * Check if a given object implements the ReactIntoFeaturesResponse interface.
 */
export function instanceOfReactIntoFeaturesResponse(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ReactIntoFeaturesResponseFromJSON(json: any): ReactIntoFeaturesResponse {
  return ReactIntoFeaturesResponseFromJSONTyped(json, false);
}

export function ReactIntoFeaturesResponseFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ReactIntoFeaturesResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    warnings: !exists(json, "warnings") ? undefined : (json["warnings"] as Array<any>).map(WarningFromJSON),
  };
}

export function ReactIntoFeaturesResponseToJSON(value?: ReactIntoFeaturesResponse | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    warnings: value.warnings === undefined ? undefined : (value.warnings as Array<any>).map(WarningToJSON),
  };
}
