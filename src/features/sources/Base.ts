import { FeatureAttributes, FeatureAttributesIndex, FeatureOriginalType } from "../../types";
import {
  AbstractDataType,
  FeatureSourceFormat,
  InferFeatureAttributesOptions,
  InferFeatureBoundsOptions,
  InferFeatureTimeSeriesOptions,
} from "../base";
import { coerceDate } from "../utils";

export type InferFeatureAttributeFeatureStatistics = {
  uniqueValues: number;
  totalValues: number;
  minimum: string | number | Date;
  maximum: string | number | Date;
  hasNulls: boolean;
  unique: boolean;
  samples: (string | number | Date)[];
};

export abstract class InferFeatureAttributesBase {
  public static sourceFormat: FeatureSourceFormat;

  public static isAcceptedSourceFormat(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    data: AbstractDataType,
  ): boolean {
    throw new Error("InferFeatureAttributesBase must be implemented in non-abstract classes");
  }

  protected statistics: Record<string, InferFeatureAttributeFeatureStatistics> = {};
  /** Returns cached basic statistics for the feature */
  protected abstract getStatistics(featureName: string): Promise<InferFeatureAttributeFeatureStatistics>;

  /* Entrypoint */
  public async infer(options: InferFeatureAttributesOptions = {}): Promise<FeatureAttributesIndex> {
    const attributes: Record<string, FeatureAttributes> = options.defaults || {};
    const { ordinalFeatureValues = {}, dependentFeatures = {} } = options;
    const columns = await this.getFeatureNames();

    const getFeatureAttributes = async (featureName: string): Promise<FeatureAttributes | undefined> => {
      const originalFeatureType = await this.getOriginalFeatureType(featureName);
      const featureAttributes: Omit<FeatureAttributes, "type"> = {
        original_type: originalFeatureType,
      };

      switch (true) {
        case !!attributes[featureName]?.type:
          return { ...featureAttributes, type: attributes[featureName]?.type };
        case featureName in ordinalFeatureValues:
          return { ...featureAttributes, type: "ordinal", bounds: { allowed: ordinalFeatureValues[featureName] } };
        case originalFeatureType?.data_type === "numeric":
          return { ...featureAttributes, ...(await this.inferFloat(featureName)) };
        case originalFeatureType?.data_type === "integer":
          return { ...featureAttributes, ...(await this.inferInteger(featureName)) };
        case originalFeatureType?.data_type === "string":
          return { ...featureAttributes, ...(await this.inferString(featureName)) };
        case originalFeatureType?.data_type === "boolean":
          return { ...featureAttributes, ...(await this.inferBoolean(featureName)) };
        case originalFeatureType?.data_type === "datetime":
          return { ...featureAttributes, ...(await this.inferDateTime(featureName)) };
        case originalFeatureType?.data_type === "date":
          return { ...featureAttributes, ...(await this.inferDate(featureName)) };
        case originalFeatureType?.data_type === "time":
          return { ...featureAttributes, ...(await this.inferTime(featureName)) };
        case originalFeatureType?.data_type === "timedelta":
          return { ...featureAttributes, ...(await this.inferTimeDelta(featureName)) };
        default:
          return { ...featureAttributes, ...(await this.inferUnknown(featureName)) };
      }
    };

    await Promise.all(
      columns.map(async (featureName) => {
        // This will automatically cache the required values into `this.statistics`.
        await this.getStatistics(featureName);
        const featureAttributes = await getFeatureAttributes(featureName);

        attributes[featureName] = { ...featureAttributes, ...attributes[featureName] };
      }),
    );

    // Determine additional attributes. The infer methods require basic attributes and statistics to be completed.
    await Promise.all(
      columns.map(async (featureName) => {
        const additions: Partial<FeatureAttributes> = {};

        // Set unique flag
        if (typeof attributes[featureName].unique === "boolean" && (await this.inferUnique(featureName))) {
          additions.unique = true;
        }

        // Add dependent features
        if (!Array.isArray(attributes[featureName].dependent_features) && featureName in dependentFeatures) {
          additions.dependent_features = dependentFeatures[featureName];
        }

        // Infer bounds
        const { inferBounds = true } = options;
        if (inferBounds && !attributes[featureName].bounds) {
          const bounds = await this.inferBounds(
            attributes[featureName],
            featureName,
            typeof inferBounds === "boolean" ? {} : inferBounds,
          );
          if (bounds) {
            additions.bounds = bounds;
          }
        }

        // Infer time series attributes
        // if (options.timeSeries && !attributes[featureName].time_series) {
        // TODO - infer time series
        // }

        if (options.includeSample) {
          additions.sample = await this.getSample(featureName);
        }

        attributes[featureName] = { ...additions, ...attributes[featureName] };
      }),
    );

    return attributes;
  }

  /* Feature types */
  protected async getOriginalFeatureType(featureName: string): Promise<FeatureOriginalType | undefined> {
    const value = await this.getSample(featureName);
    const dataType = typeof value;
    switch (dataType) {
      case "bigint":
        throw TypeError("BigInt is not supported.");
      case "number":
        return { data_type: "numeric", size: 8 };
      case "boolean":
        return { data_type: "boolean" };
      case "string":
        return this.getOriginalFeatureTypeString(featureName, value);
      case "object":
        if (value instanceof Date) {
          return { data_type: "datetime" };
        }
        return { data_type: "object" };
      default:
        return undefined;
    }
  }

  protected async getOriginalFeatureTypeString(
    featureName: string,
    value?: string,
  ): Promise<FeatureOriginalType | undefined> {
    value ||= await this.getSample(featureName);
    if (!value) {
      return undefined;
    }

    const date = coerceDate(value);
    if (date) {
      return { data_type: "datetime" };
    }

    return { data_type: "string" };
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
      type: "continuous",
      data_type: "formatted_date_time",
      date_time_format: "%Y-%m-%dT%H:%M:%SZ",
    };
  }

  protected async inferDate(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    featureName: string,
  ): Promise<FeatureAttributes> {
    return {
      type: "continuous",
      data_type: "formatted_date_time",
      date_time_format: "%Y-%m-%d",
    };
  }

  /**
   * Support for time only attributes is a near term goal. Parts of the work are under way:
   * Product Backlog Item 21293: Full support for time(-only) types
   *
   * Before full implementation, they must be treated as unrelated strings.
   */
  protected async inferTime(featureName: string): Promise<FeatureAttributes> {
    return this.inferString(featureName);
  }

  protected async inferString(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    featureName: string,
  ): Promise<FeatureAttributes> {
    return {
      type: "nominal",
      data_type: "string",
    };
  }

  protected abstract inferInteger(featureName: string): Promise<FeatureAttributes>;
  protected abstract inferFloat(featureName: string): Promise<FeatureAttributes>;
  protected async inferUnknown(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    featureName: string,
  ): Promise<FeatureAttributes> {
    return { type: "nominal" };
  }

  /* Feature properties */

  protected async inferUnique(featureName: string): Promise<boolean> {
    const { unique } = await this.getStatistics(featureName);
    return unique;
  }
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

  protected async getSample(featureName: string): Promise<any | undefined> {
    if (!this.statistics[featureName]) {
      throw new Error(`this.statistics[${featureName}] is undefined`);
    }
    return this.statistics[featureName]?.samples.at(0);
  }

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
