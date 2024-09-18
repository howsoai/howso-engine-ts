/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { ReactResponseContent } from "./ReactResponseContent";
import { ReactResponseContentFromJSON, ReactResponseContentToJSON } from "./ReactResponseContent";
import type { Warning } from "./Warning";
import { WarningFromJSON, WarningToJSON } from "./Warning";

/**
 *
 * @export
 * @interface ReactResponse
 */
export interface ReactResponse {
  /**
   *
   * @type {Array<Warning>}
   * @memberof ReactResponse
   */
  warnings?: Array<Warning>;
  /**
   *
   * @type {ReactResponseContent}
   * @memberof ReactResponse
   */
  content?: ReactResponseContent;
}

/**
 * Check if a given object implements the ReactResponse interface.
 */
export function instanceOfReactResponse(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ReactResponseFromJSON(json: any): ReactResponse {
  return ReactResponseFromJSONTyped(json, false);
}

export function ReactResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReactResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    warnings: !exists(json, "warnings") ? undefined : (json["warnings"] as Array<any>).map(WarningFromJSON),
    content: !exists(json, "content") ? undefined : ReactResponseContentFromJSON(json["content"]),
  };
}

export function ReactResponseToJSON(value?: ReactResponse | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    warnings: value.warnings === undefined ? undefined : (value.warnings as Array<any>).map(WarningToJSON),
    content: ReactResponseContentToJSON(value.content),
  };
}
