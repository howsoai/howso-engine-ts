import type { FeatureAttributes } from "../../types";
import {
  AbstractDataType,
  ArrayData,
  FeatureSourceFormat,
  InferFeatureBoundsOptions,
  InferFeatureTimeSeriesOptions,
  isArrayData,
} from "../base";
import * as utils from "../utils";
import { FeatureSerializerBase, InferFeatureAttributeFeatureStatistics, InferFeatureAttributesBase } from "./Base";

export class InferFeatureAttributesFromArray extends InferFeatureAttributesBase {
  public static sourceFormat: FeatureSourceFormat = "array";

  public static isAcceptedSourceFormat(data: AbstractDataType): boolean {
    return isArrayData(data);
  }

  constructor(protected readonly dataset: ArrayData) {
    super();
    if (dataset.data?.length) {
      for (const row of dataset.data) {
        if (row?.length !== dataset.columns.length) {
          throw new RangeError(
            "The shape of the dataset's rows and columns do not match. Ensure the length of each row matches the number of columns.",
          );
        }
      }
    }
  }

  protected async getStatistics(featureName: string): Promise<InferFeatureAttributeFeatureStatistics> {
    if (this.statistics[featureName]) {
      return this.statistics[featureName];
    }

    const index = this.dataset.columns.indexOf(featureName);
    const { values, ...statistics } = this.dataset.data.reduce(
      (statistics, data) => {
        const value = data[index];
        const isNull = utils.isNull(value);

        // Unique value counts
        const uniqueValue = value || Infinity;
        statistics.values[uniqueValue] ||= 0;
        statistics.values[uniqueValue]++;

        // Bounds
        statistics.hasNulls = statistics.hasNulls || isNull;
        statistics.minimum =
          statistics.minimum === undefined ? value : statistics.minimum > value ? value : statistics.minimum;
        statistics.maximum =
          statistics.maximum === undefined ? value : statistics.maximum < value ? value : statistics.maximum;

        // Sample
        statistics.samples ||= [];
        if (statistics.samples.length <= 5 && !isNull) {
          statistics.samples.push(value);
        }

        return statistics;
      },
      {
        values: {},
      } as Omit<InferFeatureAttributeFeatureStatistics, "uniqueValues" | "totalValues"> & {
        values: Record<string | number, number>;
      },
    );
    const totalValues = Object.values(values).reduce((sum, count) => sum + count, 0);
    const uniqueValues = Object.keys(values).length;

    this.statistics[featureName] = {
      ...statistics,
      totalValues,
      unique: uniqueValues === totalValues,
      uniqueValues,
    };
    return this.statistics[featureName];
  }

  protected async inferInteger(featureName: string): Promise<FeatureAttributes> {
    return await this.inferFloat(featureName);
  }

  protected async inferFloat(featureName: string): Promise<FeatureAttributes> {
    const { samples, totalValues, uniqueValues } = await this.getStatistics(featureName);
    let decimal_places = 0;
    let asNominal = false;

    const index = this.dataset.columns.indexOf(featureName);
    const column = this.dataset.data.map((x) => {
      decimal_places = Math.max(decimal_places, utils.precision(x[index]));
      return x[index];
    });

    const intLike = decimal_places === 0;
    if (decimal_places >= 15) {
      // Don't specify decimal places if using max precision of float64
      decimal_places = 0;
    }

    // Detect if column should be treated as nominal
    if (samples.at(0) !== undefined) {
      if (intLike) {
        asNominal = uniqueValues < Math.pow(column.length, 0.5);
      } else {
        asNominal = uniqueValues <= 2 && totalValues > 10;
      }
    }

    if (asNominal) {
      return {
        type: "nominal",
        data_type: "number",
        decimal_places,
      };
    }
    return {
      type: "continuous",
      data_type: "number",
      decimal_places,
    };
  }

  public async inferBounds(
    attributes: Readonly<FeatureAttributes>,
    featureName: string,
    options: InferFeatureBoundsOptions,
  ): Promise<FeatureAttributes["bounds"]> {
    const { minimum, maximum, hasNulls, samples, uniqueValues, totalValues } = await this.getStatistics(featureName);

    const sample = samples.at(0);
    const isDate = sample instanceof Date;
    const coercedDate = typeof sample !== "number" ? utils.coerceDate(sample) : undefined;
    const output: FeatureAttributes["bounds"] = {};
    const index = this.dataset.columns.indexOf(featureName);
    const column = this.dataset.data.reduce((result, el) => {
      const value = el[index];
      if (!!coercedDate) {
        const date = utils.coerceDate(value);
        result.push(date?.getTime() ?? value);
      } else {
        result.push(value);
      }
      return result;
    }, []);

    if (attributes.type === "continuous") {
      const getNumericValue = (value: string | number | Date | undefined | null): number | undefined => {
        if (typeof value === "number") {
          return value;
        }
        if (!value) {
          return undefined;
        }
        if (typeof value === "string" || value instanceof Date) {
          const date = utils.coerceDate(value);
          return date?.getTime();
        }
        return undefined;
      };

      let minValue = getNumericValue(minimum);
      let maxValue = getNumericValue(maximum);

      // Save original value
      const actualMin = minValue;
      const actualMax = maxValue;

      if (minValue !== undefined && maxValue !== undefined) {
        if (
          !options.tightBounds ||
          (Array.isArray(options.tightBounds) && options.tightBounds.indexOf(featureName) === -1)
        ) {
          // Use loose bounds
          [minValue, maxValue] = utils.guessLooseBounds(minValue, maxValue);

          const { modeBounds = true } = options;
          if (modeBounds || (Array.isArray(modeBounds) && modeBounds.indexOf(featureName) >= 0)) {
            // Check for mode bounds
            if (uniqueValues !== totalValues) {
              const [modes, modeCount] = utils.allModes(column);

              // If the mode for the feature is same as an original bound, set that appropriate bound to the mode value
              // since in this case, it probably represents an application-specific min/max. Only applies if there
              // are more than 3 instances of the value.
              if (modeCount > 3) {
                for (const modeValue of modes) {
                  if (actualMin === modeValue) {
                    minValue = actualMin;
                  } else if (actualMax === modeValue) {
                    maxValue = actualMax;
                  }
                }
              }
            }
          }
        }

        const getBoundValue = (value: number | undefined): number | string | Date | undefined => {
          if (value === undefined) {
            return undefined;
          }

          if (isDate) {
            return new Date(value);
          }

          if (!!coercedDate) {
            // TODO There's a small concern here that we may need to go back into the format we found
            // For now we can't currently find anything that isn't ISO in the JS implementation
            return new Date(value).toISOString();
          }

          return value;
        };

        // Set bounds
        output["min"] = getBoundValue(minValue);
        output["max"] = getBoundValue(maxValue);
      }
    }

    output["allow_null"] = hasNulls;

    if (Object.keys(output).length > 0) {
      return output;
    }
    return undefined;
  }

  public async inferTimeSeries(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    attributes: Readonly<FeatureAttributes>,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    featureName: string,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    options: InferFeatureTimeSeriesOptions,
  ): Promise<Partial<FeatureAttributes>> {
    // TODO - infer time series
    throw new Error("Method not implemented.");
  }

  public async getFeatureNames(): Promise<string[]> {
    return this.dataset.columns || [];
  }

  public async getNumCases(): Promise<number> {
    return this.dataset.data?.length || 0;
  }

  public async getNumFeatures(): Promise<number> {
    return this.dataset.columns?.length || 0;
  }
}

export class FeatureSerializerArrayData extends FeatureSerializerBase {
  public async serialize(
    data: ArrayData,
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    features: Record<string, FeatureAttributes>,
  ): Promise<any[][]> {
    return data.data;
  }

  public async deserialize(
    data: any[][],
    columns: string[],
    features?: Record<string, FeatureAttributes>,
  ): Promise<ArrayData> {
    const deserialized: any[][] = [];
    for (const row of data) {
      const deserializedRow: any[] = [];
      if (Array.isArray(row) && row.length === columns.length) {
        let index = 0;
        for (const cell of row) {
          deserializedRow.push(this.deserializeCell(cell, features?.[columns[index]]));
          index++;
        }
        deserialized.push(deserializedRow);
      } else {
        deserialized.push([...row]);
      }
    }

    const result: ArrayData = {
      columns,
      data: deserialized,
    };
    return result;
  }
}
