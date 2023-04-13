import type * as base from "./base.js";
import { FeatureAttributes } from "diveplane-openapi-client/models";
export declare function getFeatureAttributesInferrer(data: base.AbstractDataType): base.InferFeatureAttributesBase;
export declare function inferFeatureAttributes(data: base.AbstractDataType, options?: base.InferFeatureAttributesOptions): Promise<{
    [key: string]: FeatureAttributes;
}>;
