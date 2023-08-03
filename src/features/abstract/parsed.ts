/* eslint-disable @typescript-eslint/no-explicit-any */
import { FeatureAttributes } from "howso-openapi-client/models";
import { ArrayData, ParsedArrayData, FeatureSerializerBase } from "../base.js";
import { InferFeatureAttributesFromArray } from "./arrays.js";

/**
 * Reformat array of objects to 2d array of values.
 * @param dataset The source dataset.
 * @returns The new dataset format.
 */
function parsedDataToArrayData(dataset: ParsedArrayData): ArrayData {
  const data = [];
  for (const row of dataset) {
    const item: any[] = [];
    for (const col of dataset.columns) {
      item.push(row[col] ?? null);
    }
    data.push(item);
  }
  return { columns: dataset.columns, data };
}

export class InferFeatureAttributesFromParsedArray extends InferFeatureAttributesFromArray {
  constructor(dataset: ParsedArrayData) {
    super(parsedDataToArrayData(dataset));
  }
}

export class FeatureSerializerParsedArrayData extends FeatureSerializerBase {
  public async serialize(data: ParsedArrayData, _features: Record<string, FeatureAttributes>): Promise<any[][]> {
    return parsedDataToArrayData(data).data;
  }

  public async deserialize<T extends Record<string, any> = object>(
    data: any[][],
    columns: Array<keyof T>,
    features: Record<string, FeatureAttributes>
  ): Promise<ParsedArrayData<T>> {
    const deserialized: ParsedArrayData<T> = Object.assign([], { columns });

    for (const row of data) {
      const deserializedRow = {} as T;
      if (Array.isArray(row)) {
        let index = 0;
        for (const cell of row) {
          const col = columns[index];
          deserializedRow[col] = this.deserializeCell(cell, features[col as string]);
          index++;
        }
        deserialized.push(deserializedRow);
      } else {
        deserialized.push({} as T);
      }
    }

    return deserialized;
  }
}
