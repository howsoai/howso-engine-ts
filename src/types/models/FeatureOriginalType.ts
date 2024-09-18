/* eslint-disable @typescript-eslint/no-unused-vars */

import { BooleanType, BooleanTypeFromJSONTyped, BooleanTypeToJSON } from "./BooleanType";
import { DateType, DateTypeFromJSONTyped, DateTypeToJSON } from "./DateType";
import { DatetimeType, DatetimeTypeFromJSONTyped, DatetimeTypeToJSON } from "./DatetimeType";
import { IntegerType, IntegerTypeFromJSONTyped, IntegerTypeToJSON } from "./IntegerType";
import { NumericType, NumericTypeFromJSONTyped, NumericTypeToJSON } from "./NumericType";
import { ObjectType, ObjectTypeFromJSONTyped, ObjectTypeToJSON } from "./ObjectType";
import { StringType, StringTypeFromJSONTyped, StringTypeToJSON } from "./StringType";
import { TimeType, TimeTypeFromJSONTyped, TimeTypeToJSON } from "./TimeType";
import { TimedeltaType, TimedeltaTypeFromJSONTyped, TimedeltaTypeToJSON } from "./TimedeltaType";

/**
 * @type FeatureOriginalType
 * Original data type details. Used by clients to determine how to serialize and deserialize feature data.
 * @export
 */
export type FeatureOriginalType =
  | ({ data_type: "boolean" } & BooleanType)
  | ({ data_type: "date" } & DateType)
  | ({ data_type: "datetime" } & DatetimeType)
  | ({ data_type: "integer" } & IntegerType)
  | ({ data_type: "numeric" } & NumericType)
  | ({ data_type: "object" } & ObjectType)
  | ({ data_type: "string" } & StringType)
  | ({ data_type: "time" } & TimeType)
  | ({ data_type: "timedelta" } & TimedeltaType);

export function FeatureOriginalTypeFromJSON(json: any): FeatureOriginalType {
  return FeatureOriginalTypeFromJSONTyped(json, false);
}

export function FeatureOriginalTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureOriginalType {
  if (json === undefined || json === null) {
    return json;
  }
  switch (json["data_type"]) {
    case "boolean":
      return { ...BooleanTypeFromJSONTyped(json, true), data_type: "boolean" };
    case "date":
      return { ...DateTypeFromJSONTyped(json, true), data_type: "date" };
    case "datetime":
      return { ...DatetimeTypeFromJSONTyped(json, true), data_type: "datetime" };
    case "integer":
      return { ...IntegerTypeFromJSONTyped(json, true), data_type: "integer" };
    case "numeric":
      return { ...NumericTypeFromJSONTyped(json, true), data_type: "numeric" };
    case "object":
      return { ...ObjectTypeFromJSONTyped(json, true), data_type: "object" };
    case "string":
      return { ...StringTypeFromJSONTyped(json, true), data_type: "string" };
    case "time":
      return { ...TimeTypeFromJSONTyped(json, true), data_type: "time" };
    case "timedelta":
      return { ...TimedeltaTypeFromJSONTyped(json, true), data_type: "timedelta" };
    default:
      throw new Error(`No variant of FeatureOriginalType exists with 'data_type=${json["data_type"]}'`);
  }
}

export function FeatureOriginalTypeToJSON(value?: FeatureOriginalType | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  switch (value["data_type"]) {
    case "boolean":
      return BooleanTypeToJSON(value);
    case "date":
      return DateTypeToJSON(value);
    case "datetime":
      return DatetimeTypeToJSON(value);
    case "integer":
      return IntegerTypeToJSON(value);
    case "numeric":
      return NumericTypeToJSON(value);
    case "object":
      return ObjectTypeToJSON(value);
    case "string":
      return StringTypeToJSON(value);
    case "time":
      return TimeTypeToJSON(value);
    case "timedelta":
      return TimedeltaTypeToJSON(value);
    default:
      throw new Error(`No variant of FeatureOriginalType exists with 'data_type=${value["data_type"]}'`);
  }
}
