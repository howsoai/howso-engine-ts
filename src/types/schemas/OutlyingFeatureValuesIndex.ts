/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * OutlyingFeatureValuesIndex
 */

/**
 * Map of feature name to map indicating the case value and the maximum or minimum value of the feature observed in the most similar cases.
 */
export type OutlyingFeatureValuesIndex = Record<
  string,
  {
    /**
     * The case value for the specified feature.
     */
    input_case_value?: number;
    /**
     * The largest value observed for the specified feature among the most similar cases.
     */
    local_max?: number;
    /**
     * The smallest value observed for the specified feature among the most similar cases.
     */
    local_min?: number;
  }
>;
