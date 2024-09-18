/**
 * Howso API
 * OpenAPI implementation for interacting with the Howso API.
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 *
 * @export
 * @interface ObjectType
 */
export interface ObjectType {
  /**
   * The name of the data type.
   * @type {string}
   * @memberof ObjectType
   */
  data_type: string;
}

/**
 * Check if a given object implements the ObjectType interface.
 */
export function instanceOfObjectType(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "data_type" in value;

  return isInstance;
}

export function ObjectTypeFromJSON(json: any): ObjectType {
  return ObjectTypeFromJSONTyped(json, false);
}

export function ObjectTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ObjectType {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    data_type: json["data_type"],
  };
}

export function ObjectTypeToJSON(value?: ObjectType | null): any {
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