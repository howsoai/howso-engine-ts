/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface DatetimeType
 */
export interface DatetimeType {
  /**
   * The name of the data type.
   * @type {string}
   * @memberof DatetimeType
   */
  data_type: string;
  /**
   * The standardized timezone name.
   * @type {string}
   * @memberof DatetimeType
   */
  timezone?: string | null;
}

/**
 * Check if a given object implements the DatetimeType interface.
 */
export function instanceOfDatetimeType(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data_type" in value;

  return isInstance;
}

export function DatetimeTypeFromJSON(json: any): DatetimeType {
  return DatetimeTypeFromJSONTyped(json, false);
}

export function DatetimeTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): DatetimeType {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data_type: json["data_type"],
    timezone: !exists(json, "timezone") ? undefined : json["timezone"],
  };
}

export function DatetimeTypeToJSON(value?: DatetimeType | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data_type: value.data_type,
    timezone: value.timezone,
  };
}
