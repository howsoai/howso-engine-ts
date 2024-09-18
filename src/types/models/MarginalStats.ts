/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * Marginal feature statistics.
 * @export
 * @interface MarginalStats
 */
export interface MarginalStats {
  /**
   *
   * @type {number}
   * @memberof MarginalStats
   */
  count?: number | null;
  /**
   *
   * @type {number}
   * @memberof MarginalStats
   */
  kurtosis?: number | null;
  /**
   *
   * @type {number}
   * @memberof MarginalStats
   */
  mean?: number | null;
  /**
   *
   * @type {number}
   * @memberof MarginalStats
   */
  mean_absdev?: number | null;
  /**
   *
   * @type {number}
   * @memberof MarginalStats
   */
  median?: number | null;
  /**
   *
   * @type {any}
   * @memberof MarginalStats
   */
  mode?: any | null;
  /**
   *
   * @type {number}
   * @memberof MarginalStats
   */
  min?: number | null;
  /**
   *
   * @type {number}
   * @memberof MarginalStats
   */
  max?: number | null;
  /**
   *
   * @type {number}
   * @memberof MarginalStats
   */
  percentile_25?: number | null;
  /**
   *
   * @type {number}
   * @memberof MarginalStats
   */
  percentile_75?: number | null;
  /**
   *
   * @type {number}
   * @memberof MarginalStats
   */
  skew?: number | null;
  /**
   *
   * @type {number}
   * @memberof MarginalStats
   */
  stddev?: number | null;
  /**
   *
   * @type {number}
   * @memberof MarginalStats
   */
  uniques?: number | null;
  /**
   *
   * @type {number}
   * @memberof MarginalStats
   */
  variance?: number | null;
  /**
   *
   * @type {number}
   * @memberof MarginalStats
   */
  entropy?: number | null;
}

/**
 * Check if a given object implements the MarginalStats interface.
 */
export function instanceOfMarginalStats(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function MarginalStatsFromJSON(json: any): MarginalStats {
  return MarginalStatsFromJSONTyped(json, false);
}

export function MarginalStatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): MarginalStats {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    count: !exists(json, "count") ? undefined : json["count"],
    kurtosis: !exists(json, "kurtosis") ? undefined : json["kurtosis"],
    mean: !exists(json, "mean") ? undefined : json["mean"],
    mean_absdev: !exists(json, "mean_absdev") ? undefined : json["mean_absdev"],
    median: !exists(json, "median") ? undefined : json["median"],
    mode: !exists(json, "mode") ? undefined : json["mode"],
    min: !exists(json, "min") ? undefined : json["min"],
    max: !exists(json, "max") ? undefined : json["max"],
    percentile_25: !exists(json, "percentile_25") ? undefined : json["percentile_25"],
    percentile_75: !exists(json, "percentile_75") ? undefined : json["percentile_75"],
    skew: !exists(json, "skew") ? undefined : json["skew"],
    stddev: !exists(json, "stddev") ? undefined : json["stddev"],
    uniques: !exists(json, "uniques") ? undefined : json["uniques"],
    variance: !exists(json, "variance") ? undefined : json["variance"],
    entropy: !exists(json, "entropy") ? undefined : json["entropy"],
  };
}

export function MarginalStatsToJSON(value?: MarginalStats | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    count: value.count,
    kurtosis: value.kurtosis,
    mean: value.mean,
    mean_absdev: value.mean_absdev,
    median: value.median,
    mode: value.mode,
    min: value.min,
    max: value.max,
    percentile_25: value.percentile_25,
    percentile_75: value.percentile_75,
    skew: value.skew,
    stddev: value.stddev,
    uniques: value.uniques,
    variance: value.variance,
    entropy: value.entropy,
  };
}
