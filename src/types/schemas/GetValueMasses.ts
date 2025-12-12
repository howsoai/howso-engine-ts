/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * GetValueMasses
 *
 * Outputs all unique values and the mass of each value given the trained data and possible conditions
 * if a weight feature is specified or auto-ablation is enabled, then the probability masses are returned rather
 * than frequency of cases with each value.
 */
import type { Condition } from "./Condition";
import type { Precision } from "./Precision";

/** Request parameters of the Trainee method: getValueMasses. */
export type GetValueMassesRequest = {
  /**
   * A map of conditions for each feature that is used to select cases for which the value counts
   * will be computed and output.
   */
  condition?: Condition;

  /**
   * The features to compute and return value counts for.
   */
  features: string[];

  /**
   * The minimum mass required for a value to be returned. Any values with mass lesser than the
   * specified minimum mass have their masses added together and returned under the "remaining" key for the feature.
   * @default 0
   */
  minimum_mass_threshold?: number;

  /**
   * Default is 'exact', used only with 'condition' parameter, will find exact matches if 'exact' and similar cases if 'similar'.
   * @default "exact"
   */
  precision?: Precision;

  /**
   * Name of case weight feature. When specified, the returned values represent the sum of the weights of all the cases that have
   * each feature value, rather than the number of cases.
   */
  weight_feature?: string;
};

/** Response of the Trainee method: getValueMasses. */
export type GetValueMassesResponse = {
  /**
   * A mapping of feature name to map defining the computed value masses.
   */
  masses?: Record<
    string,
    {
      /**
       * The sum of masses of values with mass below the minumum count threshold.
       */
      remaining?: number;
      /**
       * A list of tuples containing a feature value and its mass.
       */
      values?: any[][];
    }
  >;
};
