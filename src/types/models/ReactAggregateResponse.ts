/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists, mapValues } from "../runtime";
import type { ReactAggregateResponseContent } from "./ReactAggregateResponseContent";
import {
  ReactAggregateResponseContentFromJSON,
  ReactAggregateResponseContentToJSON,
} from "./ReactAggregateResponseContent";
import type { Warning } from "./Warning";
import { WarningFromJSON, WarningToJSON } from "./Warning";

/**
 * The response body of react_aggregate
 * @export
 * @interface ReactAggregateResponse
 */
export interface ReactAggregateResponse {
  /**
   *
   * @type {Array<Warning>}
   * @memberof ReactAggregateResponse
   */
  warnings?: Array<Warning>;
  /**
   *
   * @type {{ [key: string]: ReactAggregateResponseContent; }}
   * @memberof ReactAggregateResponse
   */
  content?: { [key: string]: ReactAggregateResponseContent };
}

/**
 * Check if a given object implements the ReactAggregateResponse interface.
 */
export function instanceOfReactAggregateResponse(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ReactAggregateResponseFromJSON(json: any): ReactAggregateResponse {
  return ReactAggregateResponseFromJSONTyped(json, false);
}

export function ReactAggregateResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): ReactAggregateResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    warnings: !exists(json, "warnings") ? undefined : (json["warnings"] as Array<any>).map(WarningFromJSON),
    content: !exists(json, "content") ? undefined : mapValues(json["content"], ReactAggregateResponseContentFromJSON),
  };
}

export function ReactAggregateResponseToJSON(value?: ReactAggregateResponse | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    warnings: value.warnings === undefined ? undefined : (value.warnings as Array<any>).map(WarningToJSON),
    content: value.content === undefined ? undefined : mapValues(value.content, ReactAggregateResponseContentToJSON),
  };
}
