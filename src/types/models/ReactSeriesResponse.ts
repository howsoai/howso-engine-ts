/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { ReactSeriesResponseContent } from "./ReactSeriesResponseContent";
import { ReactSeriesResponseContentFromJSON, ReactSeriesResponseContentToJSON } from "./ReactSeriesResponseContent";
import type { Warning } from "./Warning";
import { WarningFromJSON, WarningToJSON } from "./Warning";

/**
 *
 * @export
 * @interface ReactSeriesResponse
 */
export interface ReactSeriesResponse {
  /**
   *
   * @type {Array<Warning>}
   * @memberof ReactSeriesResponse
   */
  warnings?: Array<Warning>;
  /**
   *
   * @type {ReactSeriesResponseContent}
   * @memberof ReactSeriesResponse
   */
  content?: ReactSeriesResponseContent;
}

/**
 * Check if a given object implements the ReactSeriesResponse interface.
 */
export function instanceOfReactSeriesResponse(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ReactSeriesResponseFromJSON(json: any): ReactSeriesResponse {
  return ReactSeriesResponseFromJSONTyped(json, false);
}

export function ReactSeriesResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReactSeriesResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    warnings: !exists(json, "warnings") ? undefined : (json["warnings"] as Array<any>).map(WarningFromJSON),
    content: !exists(json, "content") ? undefined : ReactSeriesResponseContentFromJSON(json["content"]),
  };
}

export function ReactSeriesResponseToJSON(value?: ReactSeriesResponse | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    warnings: value.warnings === undefined ? undefined : (value.warnings as Array<any>).map(WarningToJSON),
    content: ReactSeriesResponseContentToJSON(value.content),
  };
}
