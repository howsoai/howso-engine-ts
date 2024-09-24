import type { FeatureAttributes, FeatureAttributesIndex, FeatureOriginalType } from "../types";

export type FeatureSourceFormat = "unknown" | "array" | "parsed_array";

export interface InferFeatureBoundsOptions {
  tightBounds?: boolean | string[];
  modeBounds?: boolean | string[];
}

export interface InferFeatureTimeSeriesOptions {
  timeFeature: string;
  idFeatureName?: string;
}

export interface InferFeatureAttributesOptions {
  defaults?: FeatureAttributesIndex;
  inferBounds?: boolean | InferFeatureBoundsOptions;
  timeSeries?: InferFeatureTimeSeriesOptions;
  ordinalFeatureValues?: Record<string, string[]>;
  dependentFeatures?: Record<string, string[]>;
  includeSample?: boolean;
}

export interface ArrayData<T = any, C extends string = string> {
  readonly columns: C[];
  readonly data: Array<Array<T>>;
}

export interface ParsedArrayData<T extends Record<string, any> = object> extends Array<T> {
  readonly columns: Array<keyof T>;
}

export type AbstractDataType = ArrayData | ParsedArrayData;

export function isArrayData(data: any): data is ArrayData {
  return Array.isArray(data?.columns) && Array.isArray(data?.data);
}

export function isParsedArrayData(data: any): data is ParsedArrayData {
  return Array.isArray(data?.columns) && Array.isArray(data) && !Array.isArray(data[0]);
}
