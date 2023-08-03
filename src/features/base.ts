/* eslint-disable @typescript-eslint/no-explicit-any */
import { FeatureAttributes, FeatureOriginalType } from "howso-openapi-client/models";

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
  inferBounds?: boolean | InferFeatureBoundsOptions;
  timeSeries?: InferFeatureTimeSeriesOptions;
  ordinalFeatureValues?: Record<string, string[]>;
  dependentFeatures?: Record<string, string[]>;
}

export interface ArrayData {
  readonly columns: string[];
  readonly data: any[][];
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

export abstract class InferFeatureAttributesBase {
  /* Entrypoint */
  public async infer(options: InferFeatureAttributesOptions = {}): Promise<Record<string, FeatureAttributes>> {
    const attributes: Record<string, FeatureAttributes> = options.defaults || {};
    const { ordinalFeatureValues = {}, dependentFeatures = {} } = options;
    const columns = await this.getFeatureNames();

    // Determine base feature attributes
    for (let i = 0; i < columns.length; i++) {
      const feature = columns[i];
      if (feature in attributes && attributes[feature]?.type) {
        // Attributes exist for feature, skip
        continue;
      }

      const featureType = await this.getFeatureType(feature);

      // Explicitly declared ordinals
      if (feature in ordinalFeatureValues) {
        attributes[feature] = {
          type: "ordinal",
          bounds: { allowed: ordinalFeatureValues[feature] },
        };
      } else if (featureType != null) {
        switch (featureType.data_type) {
          case "numeric":
            attributes[feature] = await this.inferFloat(feature);
            break;
          case "integer":
            attributes[feature] = await this.inferInteger(feature);
            break;
          case "string":
            attributes[feature] = await this.inferString(feature);
            break;
          case "boolean":
            attributes[feature] = await this.inferBoolean(feature);
            break;
          case "datetime":
            attributes[feature] = await this.inferDatetime(feature);
            break;
          case "date":
            attributes[feature] = await this.inferDate(feature);
            break;
          case "time":
            attributes[feature] = await this.inferTime(feature);
            break;
          case "timedelta":
            attributes[feature] = await this.inferTimedelta(feature);
            break;
          default:
            attributes[feature] = await this.inferString(feature);
            break;
        }
      } else {
        attributes[feature] = await this.inferUnknown(feature);
      }

      // Add original type
      if (featureType != null) {
        attributes[feature].original_type = featureType;
      }
    }

    // Determine feature properties
    for (let i = 0; i < columns.length; i++) {
      const feature = columns[i];

      // Set unique flag
      if (attributes[feature].unique == null && (await this.inferUnique(feature))) {
        attributes[feature].unique = true;
      }

      // Add dependent features
      if (attributes[feature].dependent_features == null && feature in dependentFeatures) {
        attributes[feature].dependent_features = dependentFeatures[feature];
      }

      // Infer bounds
      const { inferBounds = true } = options;
      if (inferBounds && attributes[feature].bounds == null) {
        const bounds = await this.inferBounds(
          attributes[feature],
          feature,
          typeof inferBounds === "boolean" ? {} : inferBounds
        );
        if (bounds != null) {
          attributes[feature].bounds = bounds;
        }
      }

      // Infer time series attributes
      if (options.timeSeries && attributes[feature].time_series == null) {
        // TODO - infer time series
      }
    }

    return attributes;
  }

  /* Feature types */
  protected abstract getFeatureType(featureName: string): Promise<FeatureOriginalType | undefined>;
  protected abstract inferBoolean(featureName: string): Promise<FeatureAttributes>;
  protected abstract inferTimedelta(featureName: string): Promise<FeatureAttributes>;
  protected abstract inferDatetime(featureName: string): Promise<FeatureAttributes>;
  protected abstract inferDate(featureName: string): Promise<FeatureAttributes>;
  protected abstract inferTime(featureName: string): Promise<FeatureAttributes>;
  protected abstract inferString(featureName: string): Promise<FeatureAttributes>;
  protected abstract inferInteger(featureName: string): Promise<FeatureAttributes>;
  protected abstract inferFloat(featureName: string): Promise<FeatureAttributes>;
  protected async inferUnknown(_featureName: string): Promise<FeatureAttributes> {
    return { type: "nominal" };
  }

  /* Feature properties */
  protected abstract inferUnique(featureName: string): Promise<boolean>;
  public abstract inferBounds(
    attributes: Readonly<FeatureAttributes>,
    featureName: string,
    options: InferFeatureBoundsOptions
  ): Promise<FeatureAttributes["bounds"] | undefined>;
  public abstract inferTimeSeries(
    attributes: Readonly<FeatureAttributes>,
    featureName: string,
    options: InferFeatureTimeSeriesOptions
  ): Promise<Partial<FeatureAttributes>>;

  /* Descriptive operations */
  public abstract getFeatureNames(): Promise<string[]>;
  public abstract getNumCases(): Promise<number>;
  public abstract getNumFeatures(): Promise<number>;
}

export abstract class FeatureSerializerBase {
  public abstract serialize(data: AbstractDataType, features: Record<string, FeatureAttributes>): Promise<any[][]>;
  public abstract deserialize(
    data: any[][],
    columns: string[],
    features: Record<string, FeatureAttributes>
  ): Promise<AbstractDataType>;

  protected deserializeCell(value: any, attributes: FeatureAttributes): any {
    switch (attributes.original_type?.data_type) {
      case "date":
      case "datetime":
        if (typeof value === "string") {
          return new Date(value);
        }
        break;
    }
    return value;
  }
}
