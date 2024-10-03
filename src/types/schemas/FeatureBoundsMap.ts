/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * FeatureBoundsMap
 */

export type FeatureBoundsMap = {
  /**
   * Explicitly allowed values to be output.
   */
  allowed?: any[];
  /**
   * Allow nulls to be output, per their distribution in the data. defaults to true.
   */
  allow_null?: boolean;
  /**
   * Amalgam code, whose logic has to evaluate to true for value to be considered valid when this feature is being generated. same format as 'derived_feature_code'.
   * examples:
   * - ``"(> #f1 0 #f2 0)"``: feature 'f1' value from current (offset 0) data must be bigger than feature 'f2' value from current (offset 0) data.
   */
  constraint?: string;
  /**
   * The maximum value to be output. may be a number or date string.
   */
  max?: number | string;
  /**
   * The minimum value to be output. may be a number or date string.
   */
  min?: number | string;
};
