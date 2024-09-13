/**
 * Howso API
 * OpenAPI implementation for interacting with the Howso API.
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface StringType
 */
export interface StringType {
  /**
   * The name of the data type.
   * @type {string}
   * @memberof StringType
   */
  data_type: string;
  /**
   * The maximum allowed length of the string.
   * @type {number}
   * @memberof StringType
   */
  length?: number | null;
  /**
   * The string encoding type.
   * @type {string}
   * @memberof StringType
   */
  encoding?: string | null;
}

/**
 * Check if a given object implements the StringType interface.
 */
export function instanceOfStringType(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data_type" in value;

  return isInstance;
}

export function StringTypeFromJSON(json: any): StringType {
  return StringTypeFromJSONTyped(json, false);
}

export function StringTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): StringType {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data_type: json["data_type"],
    length: !exists(json, "length") ? undefined : json["length"],
    encoding: !exists(json, "encoding") ? undefined : json["encoding"],
  };
}

export function StringTypeToJSON(value?: StringType | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data_type: value.data_type,
    length: value.length,
    encoding: value.encoding,
  };
}
