import type * as base from "./base.js";

import { isArrayData, isParsedArrayData } from "./base.js";
import { FeatureAttributes } from "diveplane-openapi-client/models";
import { DiveplaneError } from "../client/errors.js";
import { InferFeatureAttributesFromArray } from "./abstract/arrays.js";
import { InferFeatureAttributesFromParsedArray } from "./abstract/parsed.js";

export function getFeatureAttributesInferrer(data: base.AbstractDataType): base.InferFeatureAttributesBase {
  let svc: base.InferFeatureAttributesBase;
  if (isArrayData(data)) {
    svc = new InferFeatureAttributesFromArray(data);
  } else if (isParsedArrayData(data)) {
    svc = new InferFeatureAttributesFromParsedArray(data);
  } else {
    throw new DiveplaneError("Unexpected data format.");
  }
  return svc;
}

export async function inferFeatureAttributes(
  data: base.AbstractDataType,
  options?: base.InferFeatureAttributesOptions
): Promise<{ [key: string]: FeatureAttributes }> {
  const svc = getFeatureAttributesInferrer(data);
  return await svc.infer(options);
}
