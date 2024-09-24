import type { FeatureAttributes, FeatureAttributesIndex, FeatureOriginalType } from "../types";

export type FeatureSourceFormat = "unknown" | "array" | "parsed_array";

export interface InferFeatureBoundsOptions {
  tightBounds?: boolean | string[];
  modeBounds?: boolean | string[];
}

export interface InferFeatureTimeSeriesOptions {
  timeFeature: string;
  idFeatureName?: string;
}

export interface InferFeatureAttributesOptions {
  defaults?: FeatureAttributesIndex;
  inferBounds?: boolean | InferFeatureBoundsOptions;
  timeSeries?: InferFeatureTimeSeriesOptions;
  ordinalFeatureValues?: Record<string, string[]>;
  dependentFeatures?: Record<string, string[]>;
  includeSample?: boolean;
}

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

export abstract class InferFeatureAttributesBase {
  public static sourceFormat: FeatureSourceFormat;

  public static isAcceptedSourceFormat(data: AbstractDataType): boolean {
    throw new Error("InferFeatureAttributesBase must be implemented in non-abstract classes");
  }

  public static isNominal(uniqueValues: number, totalValues: number): boolean {
    return uniqueValues <= 2 && totalValues > 10;
  }
  protected abstract inferType(featureName: string): FeatureAttributes["type"];

  /* Entrypoint */
  public async infer(options: InferFeatureAttributesOptions = {}): Promise<FeatureAttributesIndex> {
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

      const originalFeatureType = await this.getOriginalFeatureType(feature);

      // Explicitly declared ordinals
      if (feature in ordinalFeatureValues) {
        attributes[feature] = {
          type: "ordinal",
          bounds: { allowed: ordinalFeatureValues[feature] },
        };
      } else if (originalFeatureType != null) {
        switch (originalFeatureType.data_type) {
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
            attributes[feature] = await this.inferDateTime(feature);
            break;
          case "date":
            attributes[feature] = await this.inferDate(feature);
            break;
          case "time":
            attributes[feature] = await this.inferTime(feature);
            break;
          case "timedelta":
            attributes[feature] = await this.inferTimeDelta(feature);
            break;
          default:
            attributes[feature] = await this.inferString(feature);
            break;
        }
      } else {
        attributes[feature] = await this.inferUnknown(feature);
      }

      // Add original type
      if (originalFeatureType != null) {
        attributes[feature].original_type = originalFeatureType;
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
          typeof inferBounds === "boolean" ? {} : inferBounds,
        );
        if (bounds != null) {
          attributes[feature].bounds = bounds;
        }
      }

      // Infer time series attributes
      if (options.timeSeries && attributes[feature].time_series == null) {
        // TODO - infer time series
      }

      if (options.includeSample) {
        attributes[feature].sample = this.getSample(feature);
      }
    }

    return attributes;
  }

  /* Feature types */
  protected async getOriginalFeatureType(featureName: string): Promise<FeatureOriginalType | undefined> {
    const value = this.getSample(featureName);
    const dataType = typeof value;
    switch (dataType) {
      case "bigint":
        throw TypeError("BigInt is not supported.");
      case "number":
        return { data_type: "numeric", size: 8 };
      case "boolean":
        return { data_type: "boolean" };
      case "string":
        const dateParsed = value.match(/^[\d]{4}-[\d]{2}-[\d]{2}/) ? Date.parse(value) : 0;
        if (dateParsed > 0) {
          return { data_type: "datetime" };
        }

        return { data_type: "string" };
      case "object":
        if (value instanceof Date) {
          return { data_type: "datetime" };
        }
        return { data_type: "object" };
      default:
        return undefined;
    }
  }

  protected async inferBoolean(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    featureName: string,
  ): Promise<FeatureAttributes> {
    return {
      type: "nominal",
      data_type: "boolean",
    };
  }

  protected async inferTimeDelta(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    featureName: string,
  ): Promise<FeatureAttributes> {
    return {
      data_type: "number",
      type: "continuous",
    };
  }

  protected async inferDateTime(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    featureName: string,
  ): Promise<FeatureAttributes> {
    return {
      type: this.inferType(featureName),
      data_type: "formatted_date_time",
      date_time_format: "%Y-%m-%dT%H:%M:%SZ",
    };
  }

  protected async inferDate(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    featureName: string,
  ): Promise<FeatureAttributes> {
    return {
      type: this.inferType(featureName),
      data_type: "formatted_date_time",
      date_time_format: "%Y-%m-%d",
    };
  }

  protected async inferTime(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    featureName: string,
  ): Promise<FeatureAttributes> {
    return {
      type: this.inferType(featureName),
      data_type: "string",
    };
  }

  protected async inferString(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    featureName: string,
  ): Promise<FeatureAttributes> {
    return {
      type: this.inferType(featureName),
      data_type: "string",
    };
  }

  protected abstract inferInteger(featureName: string): Promise<FeatureAttributes>;
  protected abstract inferFloat(featureName: string): Promise<FeatureAttributes>;
  protected async inferUnknown(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    featureName: string,
  ): Promise<FeatureAttributes> {
    return { type: "nominal", data_type: "string" };
  }

  /* Feature properties */
  protected abstract inferUnique(featureName: string): Promise<boolean>;
  public abstract inferBounds(
    attributes: Readonly<FeatureAttributes>,
    featureName: string,
    options: InferFeatureBoundsOptions,
  ): Promise<FeatureAttributes["bounds"]>;
  public abstract inferTimeSeries(
    attributes: Readonly<FeatureAttributes>,
    featureName: string,
    options: InferFeatureTimeSeriesOptions,
  ): Promise<Partial<FeatureAttributes>>;

  protected abstract getSample(featureName: string): any | undefined;

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
    features?: Record<string, FeatureAttributes>,
  ): Promise<AbstractDataType>;

  protected deserializeCell(value: any, attributes?: FeatureAttributes): any {
    switch (attributes?.original_type?.data_type) {
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
