import type { FeatureAttributes } from "../../types";
import {
  AbstractDataType,
  ArrayData,
  FeatureSerializerBase,
  FeatureSourceFormat,
  InferFeatureAttributesBase,
  InferFeatureBoundsOptions,
  InferFeatureTimeSeriesOptions,
  isArrayData,
} from "../base";
import * as utils from "../utils";

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

  protected inferType(featureName: string): FeatureAttributes["type"] {
    const index = this.dataset.columns.indexOf(featureName);
    const values = this.dataset.data.reduce(
      (values, data) => {
        const value = data[index] || Infinity;
        values[value] ||= 0;
        values[value]++;
        return values;
      },
      {} as Record<string | number, number>,
    );
    const totalValues = Object.values(values).reduce((sum, count) => sum + count, 0);
    const uniqueValues = Object.keys(values).length;

    return InferFeatureAttributesBase.isNominal(uniqueValues, totalValues) ? "nominal" : "continuous";
  }

  protected async inferInteger(featureName: string): Promise<FeatureAttributes> {
    return await this.inferFloat(featureName);
  }

  protected async inferFloat(featureName: string): Promise<FeatureAttributes> {
    let decimal_places = 0;
    let asNominal = false;

    const index = this.dataset.columns.indexOf(featureName);
    const column = this.dataset.data.map((x) => {
      decimal_places = Math.max(decimal_places, utils.precision(x[index]));
      return x[index];
    });
    const numUnique = new Set(column).size;

    const intLike = decimal_places === 0;
    if (decimal_places >= 15) {
      // Don't specify decimal places if using max precision of float64
      decimal_places = 0;
    }

    // Detect if column should be treated as nominal
    if (this.getSample(featureName) !== undefined) {
      if (intLike) {
        asNominal = numUnique < Math.pow(column.length, 0.5);
      } else {
        asNominal = InferFeatureAttributesFromArray.isNominal(numUnique, column.length);
      }
    }

    if (asNominal) {
      return {
        type: "nominal",
        data_type: "number",
        decimal_places,
      };
    } else {
      return {
        type: "continuous",
        data_type: "number",
        decimal_places,
      };
    }
  }

  public async inferBounds(
    attributes: Readonly<FeatureAttributes>,
    featureName: string,
    options: InferFeatureBoundsOptions,
  ): Promise<FeatureAttributes["bounds"]> {
    let hasNull = false;
    let isDate = false;
    const output: FeatureAttributes["bounds"] = {};
    const index = this.dataset.columns.indexOf(featureName);
    const column = this.dataset.data.reduce((result, el) => {
      if (utils.isNull(el[index])) {
        // Exclude nulls
        hasNull = true;
      } else if (el[index] instanceof Date) {
        result.push(el[index].getTime());
        isDate = true;
      } else {
        result.push(el[index]);
      }
      return result;
    }, []);

    if (attributes.type === "continuous") {
      column.sort((a, b) => a - b || Number(isNaN(a)) - Number(isNaN(b)));
      let minValue = column[0];
      let maxValue = column[column.length - 1];
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
            const numUnique = new Set(column).size;
            if (numUnique !== column.length) {
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
        // Convert back to date object
        if (isDate) {
          minValue = new Date(minValue);
          maxValue = new Date(maxValue);
        }
        // Set bounds
        output["min"] = minValue;
        output["max"] = maxValue;
      }
    }

    output["allow_null"] = hasNull;

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

  protected async inferUnique(
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars*/
    featureName: string,
  ): Promise<boolean> {
    // Arrays don't support unique constraints
    return false;
  }

  protected getSample(featureName: string): any | undefined {
    const index = this.dataset.columns.indexOf(featureName);
    for (const row of this.dataset.data) {
      if (utils.isNull(row[index])) {
        continue;
      }
      return row[index];
    }
    return undefined;
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
