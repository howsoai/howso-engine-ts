import type * as base from "./base.js";
import { FeatureAttributes } from "howso-openapi-client/models";
export type FeatureSerializerFormat = "unknown" | "array" | "parsed";
export type FeatureSerializerDataType<T extends FeatureSerializerFormat> = T extends "array" ? base.ArrayData : T extends "parsed" ? base.ParsedArrayData : T extends "excel" ? number : never;
export declare function getFeatureSerializer(format: FeatureSerializerFormat): base.FeatureSerializerBase;
/**
 * Serialize cases based on feature attribute metadata.
 * @param data The data to serialize.
 * @param features The feature attributes of the data.
 * @returns The serialized cases.
 */
export declare function serializeCases(data: base.AbstractDataType, features: Record<string, FeatureAttributes>): Promise<any[][]>;
/**
 * Deserialize cases based on feature attribute metadata.
 * @param data The data to deserialize.
 * @param features The feature attributes of the data.
 * @returns The deserialized data.
 */
export declare function deserializeCases<T extends FeatureSerializerFormat>(format: T, data: any[][], columns: string[], features: Record<string, FeatureAttributes>): Promise<FeatureSerializerDataType<typeof format>>;
