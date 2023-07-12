import { FeatureAttributes, FeatureOriginalType } from "diveplane-openapi-client/models";
export interface InferFeatureBoundsOptions {
    tightBounds?: boolean | string[];
    modeBounds?: boolean | string[];
}
export interface InferFeatureTimeSeriesOptions {
    timeFeature: string;
    idFeatureName?: string;
}
export interface InferFeatureAttributesOptions {
    defaults?: Record<string, FeatureAttributes>;
    dropna?: boolean | string[];
    inferBounds?: boolean | InferFeatureBoundsOptions;
    timeSeries?: InferFeatureTimeSeriesOptions;
    ordinalFeatureValues?: Record<string, string[]>;
    dependentFeatures?: Record<string, string[]>;
}
export interface ArrayData {
    readonly columns: string[];
    readonly data: any[][];
}
export type AbstractDataType = ArrayData;
export declare function isArrayData(data: any): data is ArrayData;
export declare abstract class InferFeatureAttributesBase {
    infer(options?: InferFeatureAttributesOptions): Promise<Record<string, FeatureAttributes>>;
    protected abstract getFeatureType(featureName: string): Promise<FeatureOriginalType | undefined>;
    protected abstract inferBoolean(featureName: string): Promise<FeatureAttributes>;
    protected abstract inferTimedelta(featureName: string): Promise<FeatureAttributes>;
    protected abstract inferDatetime(featureName: string): Promise<FeatureAttributes>;
    protected abstract inferDate(featureName: string): Promise<FeatureAttributes>;
    protected abstract inferTime(featureName: string): Promise<FeatureAttributes>;
    protected abstract inferString(featureName: string): Promise<FeatureAttributes>;
    protected abstract inferInteger(featureName: string): Promise<FeatureAttributes>;
    protected abstract inferFloat(featureName: string): Promise<FeatureAttributes>;
    protected inferUnknown(_featureName: string): Promise<FeatureAttributes>;
    protected abstract inferUnique(featureName: string): Promise<boolean>;
    abstract inferBounds(attributes: Readonly<FeatureAttributes>, featureName: string, options: InferFeatureBoundsOptions): Promise<FeatureAttributes["bounds"] | undefined>;
    abstract inferTimeSeries(attributes: Readonly<FeatureAttributes>, featureName: string, options: InferFeatureTimeSeriesOptions): Promise<Partial<FeatureAttributes>>;
    abstract getFeatureNames(): Promise<string[]>;
    abstract getNumCases(): Promise<number>;
    abstract getNumFeatures(): Promise<number>;
}
export declare abstract class FeatureSerializerBase {
    abstract serialize(data: AbstractDataType, features: Record<string, FeatureAttributes>): Promise<any[][]>;
    abstract deserialize(data: any[][], columns: string[], features: Record<string, FeatureAttributes>): Promise<AbstractDataType>;
}
