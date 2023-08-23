import { FeatureAttributes } from "@howso/openapi-client/models";
import { ParsedArrayData, FeatureSerializerBase } from "../base.js";
import { InferFeatureAttributesFromArray } from "./arrays.js";
export declare class InferFeatureAttributesFromParsedArray extends InferFeatureAttributesFromArray {
    constructor(dataset: ParsedArrayData);
}
export declare class FeatureSerializerParsedArrayData extends FeatureSerializerBase {
    serialize(data: ParsedArrayData, _features: Record<string, FeatureAttributes>): Promise<any[][]>;
    deserialize<T extends Record<string, any> = object>(data: any[][], columns: Array<keyof T>, features?: Record<string, FeatureAttributes>): Promise<ParsedArrayData<T>>;
}
