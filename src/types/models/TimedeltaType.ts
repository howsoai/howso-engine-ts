/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface TimedeltaType
 */
export interface TimedeltaType {
  /**
   * The name of the data type.
   * @type {string}
   * @memberof TimedeltaType
   */
  data_type: string;
  /**
   * The unit of the time delta.
   * @type {string}
   * @memberof TimedeltaType
   */
  unit?: TimedeltaTypeUnitEnum;
}

/**
 * @export
 * @enum {string}
 */
export type TimedeltaTypeUnitEnum = "days" | "seconds" | "nanoseconds";

/**
 * Check if a given object implements the TimedeltaType interface.
 */
export function instanceOfTimedeltaType(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data_type" in value;

  return isInstance;
}

export function TimedeltaTypeFromJSON(json: any): TimedeltaType {
  return TimedeltaTypeFromJSONTyped(json, false);
}

export function TimedeltaTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): TimedeltaType {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data_type: json["data_type"],
    unit: !exists(json, "unit") ? undefined : json["unit"],
  };
}

export function TimedeltaTypeToJSON(value?: TimedeltaType | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data_type: value.data_type,
    unit: value.unit,
  };
}
