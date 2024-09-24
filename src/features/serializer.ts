import { ProblemError } from "../client/errors";
import type { FeatureAttributes } from "../types";
import {
  AbstractDataType,
  ArrayData,
  FeatureSourceFormat,
  isArrayData,
  isParsedArrayData,
  ParsedArrayData,
} from "./base";
import { FeatureSerializerArrayData, FeatureSerializerBase, FeatureSerializerParsedArrayData } from "./sources";

export type FeatureSerializerDataType<T extends FeatureSourceFormat> = T extends "array"
  ? ArrayData
  : T extends "parsed"
    ? ParsedArrayData
    : T extends "excel"
      ? number
      : never;

export function detectSourceFormat(data: AbstractDataType): FeatureSourceFormat {
  if (isArrayData(data)) {
    return "array";
  }
  if (isParsedArrayData(data)) {
    return "parsed_array";
  }
  return "unknown";
}

export function getFeatureSerializer(format: FeatureSourceFormat): FeatureSerializerBase {
  let svc: FeatureSerializerBase;
  switch (format) {
    case "array":
      svc = new FeatureSerializerArrayData();
      break;
    case "parsed_array":
      svc = new FeatureSerializerParsedArrayData();
      break;
    default:
      throw new ProblemError("Unexpected data format.");
  }
  return svc;
}

/**
 * Serialize cases based on feature attribute metadata.
 * @param data The data to serialize.
 * @param features The feature attributes of the data.
 * @returns The serialized cases.
 */
export async function serializeCases(
  data: AbstractDataType,
  features: Record<string, FeatureAttributes>,
): Promise<any[][]> {
  const svc = getFeatureSerializer(detectSourceFormat(data));
  return await svc.serialize(data, features);
}

/**
 * Deserialize cases based on feature attribute metadata.
 * @param data The data to deserialize.
 * @param features The feature attributes of the data.
 * @returns The deserialized data.
 */
export async function deserializeCases<T extends FeatureSourceFormat>(
  format: T,
  data: any[][],
  columns: string[],
  features: Record<string, FeatureAttributes>,
): Promise<FeatureSerializerDataType<typeof format>> {
  const svc = getFeatureSerializer(format);
  const result = await svc.deserialize(data, columns, features);
  return result as FeatureSerializerDataType<typeof format>;
}
