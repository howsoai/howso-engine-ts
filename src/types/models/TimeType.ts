/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface TimeType
 */
export interface TimeType {
  /**
   * The name of the data type.
   * @type {string}
   * @memberof TimeType
   */
  data_type: string;
  /**
   * The standardized timezone name.
   * @type {string}
   * @memberof TimeType
   */
  timezone?: string | null;
}

/**
 * Check if a given object implements the TimeType interface.
 */
export function instanceOfTimeType(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data_type" in value;

  return isInstance;
}

export function TimeTypeFromJSON(json: any): TimeType {
  return TimeTypeFromJSONTyped(json, false);
}

export function TimeTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): TimeType {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data_type: json["data_type"],
    timezone: !exists(json, "timezone") ? undefined : json["timezone"],
  };
}

export function TimeTypeToJSON(value?: TimeType | null): any {
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
