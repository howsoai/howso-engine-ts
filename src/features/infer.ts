import type * as base from "./base";

import { ProblemError } from "../client/errors";
import type { FeatureAttributes } from "../types";
import { isArrayData, isParsedArrayData } from "./base";
import { InferFeatureAttributesFromArray } from "./sources/arrays";
import { InferFeatureAttributesFromParsedArray } from "./sources/parsed";

export * from "./utils";

export function getFeatureAttributesInferrer(data: base.AbstractDataType): base.InferFeatureAttributesBase {
  let svc: base.InferFeatureAttributesBase;
  if (isArrayData(data)) {
    svc = new InferFeatureAttributesFromArray(data);
  } else if (isParsedArrayData(data)) {
    svc = new InferFeatureAttributesFromParsedArray(data);
  } else {
    throw new ProblemError("Unexpected data format.");
  }
  return svc;
}

export async function inferFeatureAttributes(
  data: base.AbstractDataType,
  options?: base.InferFeatureAttributesOptions,
): Promise<{ [key: string]: FeatureAttributes }> {
  const svc = getFeatureAttributesInferrer(data);
  return await svc.infer(options);
}
