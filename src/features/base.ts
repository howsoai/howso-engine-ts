import type { FeatureAttributesIndex } from "../types";

export type FeatureSourceFormat = "unknown" | "array" | "parsed_array";

/**
 * A subset of supported options.
 * Full options are available only when using the Python direct client or Platform installation.
 * @see https://docs.howso.com/en/release-latest/api_reference/_autosummary/howso.utilities.html#howso.utilities.infer_feature_attributes
 **/
export type InferFeatureAttributesOptions = {
  dependent_features?: Record<string, string[]>;
  features?: FeatureAttributesIndex;
  include_sample?: boolean;
  infer_bounds?: boolean;
  mode_bound_features?: string[];
  ordinal_feature_values?: Record<string, string[]>;
  tight_bounds?: boolean;
};

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
