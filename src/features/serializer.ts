/* eslint-disable @typescript-eslint/no-explicit-any */
import type * as base from "./base.js";

import { isArrayData, isParsedArrayData } from "./base.js";
import { FeatureAttributes } from "@howso/openapi-client/models";
import { ProblemError } from "../client/errors.js";
import { FeatureSerializerArrayData } from "./abstract/arrays.js";
import { FeatureSerializerParsedArrayData } from "./abstract/parsed.js";

export type FeatureSerializerFormat = "unknown" | "array" | "parsed";

export type FeatureSerializerDataType<T extends FeatureSerializerFormat> = T extends "array"
  ? base.ArrayData
  : T extends "parsed"
  ? base.ParsedArrayData
  : T extends "excel"
  ? number
  : never;

function detectFormat(data: base.AbstractDataType): FeatureSerializerFormat {
  if (isArrayData(data)) {
    return "array";
  }
  if (isParsedArrayData(data)) {
    return "parsed";
  }
  return "unknown";
}

export function getFeatureSerializer(format: FeatureSerializerFormat): base.FeatureSerializerBase {
  let svc: base.FeatureSerializerBase;
  switch (format) {
    case "array":
      svc = new FeatureSerializerArrayData();
      break;
    case "parsed":
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
  data: base.AbstractDataType,
  features: Record<string, FeatureAttributes>
): Promise<any[][]> {
  const svc = getFeatureSerializer(detectFormat(data));
  return await svc.serialize(data, features);
}

/**
 * Deserialize cases based on feature attribute metadata.
 * @param data The data to deserialize.
 * @param features The feature attributes of the data.
 * @returns The deserialized data.
 */
export async function deserializeCases<T extends FeatureSerializerFormat>(
  format: T,
  data: any[][],
  columns: string[],
  features: Record<string, FeatureAttributes>
): Promise<FeatureSerializerDataType<typeof format>> {
  const svc = getFeatureSerializer(format);
  const result = await svc.deserialize(data, columns, features);
  return result as FeatureSerializerDataType<typeof format>;
}
