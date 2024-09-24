import type * as base from "./base";

import { HowsoError } from "@/client/errors";
import type { FeatureAttributes } from "@/types";
import { InferFeatureAttributesFromArray } from "./abstract/arrays";
import { InferFeatureAttributesFromParsedArray } from "./abstract/parsed";
import { isArrayData, isParsedArrayData } from "./base";

export * from "./utils";

export function getFeatureAttributesInferrer(data: base.AbstractDataType): base.InferFeatureAttributesBase {
  let svc: base.InferFeatureAttributesBase;
  if (isArrayData(data)) {
    svc = new InferFeatureAttributesFromArray(data);
  } else if (isParsedArrayData(data)) {
    svc = new InferFeatureAttributesFromParsedArray(data);
  } else {
    throw new HowsoError("Unexpected data format.");
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
