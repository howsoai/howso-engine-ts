import { FeatureAttributes, FeatureOriginalType } from "@howso/openapi-client/models";
import { ArrayData, FeatureSerializerBase, InferFeatureAttributesBase, InferFeatureBoundsOptions, InferFeatureTimeSeriesOptions } from "../base.js";
export declare class InferFeatureAttributesFromArray extends InferFeatureAttributesBase {
    protected readonly dataset: ArrayData;
    constructor(dataset: ArrayData);
    protected inferBoolean(_featureName: string): Promise<FeatureAttributes>;
    protected inferTimedelta(_featureName: string): Promise<FeatureAttributes>;
    protected inferTime(_featureName: string): Promise<FeatureAttributes>;
    protected inferDate(_featureName: string): Promise<FeatureAttributes>;
    protected inferDatetime(_featureName: string): Promise<FeatureAttributes>;
    protected inferInteger(featureName: string): Promise<FeatureAttributes>;
    protected inferFloat(featureName: string): Promise<FeatureAttributes>;
    protected inferString(_featureName: string): Promise<FeatureAttributes>;
    inferBounds(attributes: Readonly<FeatureAttributes>, featureName: string, options: InferFeatureBoundsOptions): Promise<FeatureAttributes["bounds"] | undefined>;
    inferTimeSeries(_attributes: Readonly<FeatureAttributes>, _featureName: string, _options: InferFeatureTimeSeriesOptions): Promise<Partial<FeatureAttributes>>;
    protected inferUnique(_featureName: string): Promise<boolean>;
    protected getFeatureType(featureName: string): Promise<FeatureOriginalType | undefined>;
    private findFirstValue;
    getFeatureNames(): Promise<string[]>;
    getNumCases(): Promise<number>;
    getNumFeatures(): Promise<number>;
}
export declare class FeatureSerializerArrayData extends FeatureSerializerBase {
    serialize(data: ArrayData, _features: Record<string, FeatureAttributes>): Promise<any[][]>;
    deserialize(data: any[][], columns: string[], features?: Record<string, FeatureAttributes>): Promise<ArrayData>;
}
