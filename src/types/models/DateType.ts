/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 *
 * @export
 * @interface DateType
 */
export interface DateType {
  /**
   * The name of the data type.
   * @type {string}
   * @memberof DateType
   */
  data_type: string;
}

/**
 * Check if a given object implements the DateType interface.
 */
export function instanceOfDateType(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data_type" in value;

  return isInstance;
}

export function DateTypeFromJSON(json: any): DateType {
  return DateTypeFromJSONTyped(json, false);
}

export function DateTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): DateType {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data_type: json["data_type"],
  };
}

export function DateTypeToJSON(value?: DateType | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    data_type: value.data_type,
  };
}
