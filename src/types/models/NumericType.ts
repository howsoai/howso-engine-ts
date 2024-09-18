/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface NumericType
 */
export interface NumericType {
  /**
   * The name of the data type.
   * @type {string}
   * @memberof NumericType
   */
  data_type: string;
  /**
   * The format of the number.
   * @type {string}
   * @memberof NumericType
   */
  format?: NumericTypeFormatEnum;
  /**
   * The size of the number (in bytes).
   * @type {number}
   * @memberof NumericType
   */
  size?: number;
}

/**
 * @export
 * @enum {string}
 */
export type NumericTypeFormatEnum = "decimal";

/**
 * Check if a given object implements the NumericType interface.
 */
export function instanceOfNumericType(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data_type" in value;

  return isInstance;
}

export function NumericTypeFromJSON(json: any): NumericType {
  return NumericTypeFromJSONTyped(json, false);
}

export function NumericTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): NumericType {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data_type: json["data_type"],
    format: !exists(json, "format") ? undefined : json["format"],
    size: !exists(json, "size") ? undefined : json["size"],
  };
}

export function NumericTypeToJSON(value?: NumericType | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data_type: value.data_type,
    format: value.format,
    size: value.size,
  };
}
