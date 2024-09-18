/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface IntegerType
 */
export interface IntegerType {
  /**
   * The name of the data type.
   * @type {string}
   * @memberof IntegerType
   */
  data_type: string;
  /**
   * The size of the integer (in bytes).
   * @type {number}
   * @memberof IntegerType
   */
  size?: number;
  /**
   * If the integer is unsigned.
   * @type {boolean}
   * @memberof IntegerType
   */
  unsigned?: boolean;
}

/**
 * Check if a given object implements the IntegerType interface.
 */
export function instanceOfIntegerType(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data_type" in value;

  return isInstance;
}

export function IntegerTypeFromJSON(json: any): IntegerType {
  return IntegerTypeFromJSONTyped(json, false);
}

export function IntegerTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): IntegerType {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data_type: json["data_type"],
    size: !exists(json, "size") ? undefined : json["size"],
    unsigned: !exists(json, "unsigned") ? undefined : json["unsigned"],
  };
}

export function IntegerTypeToJSON(value?: IntegerType | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data_type: value.data_type,
    size: value.size,
    unsigned: value.unsigned,
  };
}
