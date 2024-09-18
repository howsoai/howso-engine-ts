/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 *
 * @export
 * @interface BooleanType
 */
export interface BooleanType {
  /**
   * The name of the data type.
   * @type {string}
   * @memberof BooleanType
   */
  data_type: string;
}

/**
 * Check if a given object implements the BooleanType interface.
 */
export function instanceOfBooleanType(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data_type" in value;

  return isInstance;
}

export function BooleanTypeFromJSON(json: any): BooleanType {
  return BooleanTypeFromJSONTyped(json, false);
}

export function BooleanTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): BooleanType {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data_type: json["data_type"],
  };
}

export function BooleanTypeToJSON(value?: BooleanType | null): any {
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
