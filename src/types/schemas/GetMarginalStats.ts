/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * GetMarginalStats
 *
 * Outputs all marginal stats (min, max, median, mean, mode, count, uniques, mean_absdev, variance, stddev, skew, kurtosis, entropy)
 * for all features in the format of feature -> assoc stat -> value. The marginal stats can be computed for a subset of the data using condition, precision, and num_cases
 */
import type { Condition } from "./Condition";
import type { Precision } from "./Precision";

export type GetMarginalStatsRequest = {
  /**
   * Assoc of feature->value(s)
   *     no value = must have feature
   *      - for continuous or numeric ordinal features:
   *       one value = must equal exactly the value or be close to it for fuzzy match
   *       two values = inclusive between
   *      - for nominal or string ordinal features:
   *       n values = must match any of these values exactly
   */
  condition?: Condition;

  /**
   * Limit on the number of cases to use in calculating conditional prediction stats; If set to zero there will be no limit.
   *   If null, will be set to k if precision is "similar" or no limit if precision is "exact". default is null
   */
  num_cases?: number;

  /**
   * Default is 'exact', used only with 'condition' parameter, will find exact matches if 'exact' and similar cases if 'similar'.
   * @default "exact"
   */
  precision?: Precision;

  /**
   * Name of case weight feature
   */
  weight_feature?: string;
};
