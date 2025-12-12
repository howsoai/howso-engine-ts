/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 */

/**
 * A map defining any feature bounds, allowed values, and constraints.
 */
export type FeatureBounds = {
  /**
   * Explicitly allowed values to be output.
   */
  allowed?: any[];
  /**
   * Allow nulls to be output, per their distribution in the data. Defaults to true.
   */
  allow_null?: boolean;
  /**
   * Amalgam code, whose logic has to evaluate to true for value to be considered valid when this feature is being generated. Same format as 'derived_feature_code'.
   * Examples:
   * - ``"(> #f1 0 #f2 0)"``: Feature 'f1' value from current (offset 0) data must be bigger than feature 'f2' value from current (offset 0) data.
   */
  constraint?: string;
  /**
   * The maximum value to be output. May be a number or date string.
   */
  max?: number | string;
  /**
   * The minimum value to be output. May be a number or date string.
   */
  min?: number | string;
  /**
   * The observed maximum value in the data. May be a number, string, or date string.
   */
  observed_max?: number | string;
  /**
   * The observed minimum value in the data. May be a number, string, or date string.
   */
  observed_min?: number | string;
};
