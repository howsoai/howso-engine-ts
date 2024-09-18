/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { ReactGroupResponseContent } from "./ReactGroupResponseContent";
import { ReactGroupResponseContentFromJSON, ReactGroupResponseContentToJSON } from "./ReactGroupResponseContent";
import type { Warning } from "./Warning";
import { WarningFromJSON, WarningToJSON } from "./Warning";

/**
 *
 * @export
 * @interface ReactGroupResponse
 */
export interface ReactGroupResponse {
  /**
   *
   * @type {Array<Warning>}
   * @memberof ReactGroupResponse
   */
  warnings?: Array<Warning>;
  /**
   *
   * @type {ReactGroupResponseContent}
   * @memberof ReactGroupResponse
   */
  content?: ReactGroupResponseContent;
}

/**
 * Check if a given object implements the ReactGroupResponse interface.
 */
export function instanceOfReactGroupResponse(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ReactGroupResponseFromJSON(json: any): ReactGroupResponse {
  return ReactGroupResponseFromJSONTyped(json, false);
}

export function ReactGroupResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReactGroupResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    warnings: !exists(json, "warnings") ? undefined : (json["warnings"] as Array<any>).map(WarningFromJSON),
    content: !exists(json, "content") ? undefined : ReactGroupResponseContentFromJSON(json["content"]),
  };
}

export function ReactGroupResponseToJSON(value?: ReactGroupResponse | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    warnings: value.warnings === undefined ? undefined : (value.warnings as Array<any>).map(WarningToJSON),
    content: ReactGroupResponseContentToJSON(value.content),
  };
}
