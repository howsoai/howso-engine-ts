/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface ModelError
 */
export interface ModelError {
  [key: string]: any | any;
  /**
   *
   * @type {number}
   * @memberof ModelError
   */
  status?: number;
  /**
   *
   * @type {string}
   * @memberof ModelError
   */
  title?: string;
  /**
   *
   * @type {string}
   * @memberof ModelError
   */
  detail?: string;
  /**
   *
   * @type {string}
   * @memberof ModelError
   */
  code?: string;
  /**
   *
   * @type {string}
   * @memberof ModelError
   */
  type?: string;
}

/**
 * Check if a given object implements the ModelError interface.
 */
export function instanceOfModelError(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ModelErrorFromJSON(json: any): ModelError {
  return ModelErrorFromJSONTyped(json, false);
}

export function ModelErrorFromJSONTyped(json: any, ignoreDiscriminator: boolean): ModelError {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    ...json,
    status: !exists(json, "status") ? undefined : json["status"],
    title: !exists(json, "title") ? undefined : json["title"],
    detail: !exists(json, "detail") ? undefined : json["detail"],
    code: !exists(json, "code") ? undefined : json["code"],
    type: !exists(json, "type") ? undefined : json["type"],
  };
}

export function ModelErrorToJSON(value?: ModelError | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    ...value,
    status: value.status,
    title: value.title,
    detail: value.detail,
    code: value.code,
    type: value.type,
  };
}
