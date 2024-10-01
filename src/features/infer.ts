import { ProblemError } from "../client/errors";
import type { FeatureAttributesIndex } from "../types";
import {
  AbstractDataType,
  CSVData,
  FeatureSourceFormat,
  type ArrayData,
  type InferFeatureAttributesOptions,
  type ParsedArrayData,
} from "./base";
import {
  InferFeatureAttributesBase,
  InferFeatureAttributesFromArray,
  InferFeatureAttributesFromParsedArray,
} from "./sources";
import { InferFeatureAttributesFromCSV } from "./sources/CSV";

export * from "./utils";

export const getFeatureAttributesInferrer = (
  data: AbstractDataType,
  sourceFormat: FeatureSourceFormat,
): InferFeatureAttributesBase => {
  switch (sourceFormat) {
    case "array":
      return new InferFeatureAttributesFromArray(data as ArrayData);
    case "parsed_array":
      return new InferFeatureAttributesFromParsedArray(data as ParsedArrayData);
    case "csv":
      return new InferFeatureAttributesFromCSV(data as CSVData);
    default:
      throw new ProblemError("Unexpected data format.");
  }
};

export type InferFeatureAttributes = {
  (data: ArrayData, sourceFormat: "array", options: InferFeatureAttributesOptions): Promise<FeatureAttributesIndex>;
  (
    data: ParsedArrayData,
    sourceFormat: "parsed_array",
    options: InferFeatureAttributesOptions,
  ): Promise<FeatureAttributesIndex>;
};

export const inferFeatureAttributes: InferFeatureAttributes = async (data, sourceFormat, options?) => {
  const svc = getFeatureAttributesInferrer(data, sourceFormat);
  return await svc.infer(options);
};
