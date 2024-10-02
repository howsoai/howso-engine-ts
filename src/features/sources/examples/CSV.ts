/*
 * This class is an example implementation of a CSV parser.
 * It provides inspiration, and an easy means for testing our own CSV files.
 * Your implementation will vary, especially in options.
 */

import { autoType, csvParse } from "d3-dsv";
import type { AbstractDataType, FeatureSourceFormat } from "../../base";
import { InferFeatureAttributesFromArray } from "../Array";

export type InferFeatureAttributesFromCSVOptions = {
  limit?: number;
  /** The number of samples to be returned. Default: 5 */
  samplesLimit?: number;
};
export class InferFeatureAttributesFromCSV extends InferFeatureAttributesFromArray {
  public static sourceFormat: FeatureSourceFormat = "parsed_array";
  public readonly samples: ReturnType<typeof samplesAutoType>[] | undefined;

  public static isAcceptedSourceFormat(data: AbstractDataType): boolean {
    return typeof data === "string";
  }

  constructor(dataset: string, options: InferFeatureAttributesFromCSVOptions = {}) {
    options.samplesLimit ||= 5;

    const raw = csvParse(dataset);
    const limited = raw.slice(0, options.limit).map((row) => ({ ...row }));
    // @ts-expect-error I'll assign column immediately below
    const data: typeof raw = limited.map(autoType);
    data.columns = raw.columns;

    super({
      columns: data.columns,
      data: data.map((object) => Object.values(object)),
    });

    if (options.samplesLimit) {
      this.samples = raw.slice(0, options.samplesLimit).map(samplesAutoType);
    }
  }
}

// Adapted from https://github.com/d3/d3-dsv/blob/main/src/autoType.js
function samplesAutoType(object: Record<string, string>) {
  for (const key in object) {
    let value: string | number | null = object[key].trim(),
      number;
    if (!value) value = null;
    // else if (value === "true") value = true;
    // else if (value === "false") value = false;
    else if (value === "NaN") value = NaN;
    else if (!isNaN((number = +value))) value = number;
    // We don't want dates to show
    // else if (m = value.match(/^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/)) {
    //   if (fixtz && !!m[4] && !m[7]) value = value.replace(/-/g, "/").replace(/T/, " ");
    //   value = new Date(value);
    // }
    else continue;
    // @ts-expect-error It's sure to be a string on the way in, but not so much on the way out
    object[key] = value;
  }
  return object as Record<string, string | number | null>;
}
