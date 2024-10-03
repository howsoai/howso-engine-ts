/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * SetSubstituteFeatureValues
 *
 * Sets substitution feature values used in case generation
 */

export type SetSubstituteFeatureValuesRequest = {
  /**
   * Assoc of feature -> assoc of value -> substitution.
   *   If this map is null, all substitutions will be disabled and cleared
   *   If any feature in the substitution_value_map has a missing or empty assoc of substitutions, substitution values will immeditally be generated
   */
  substitution_value_map: Record<string, any>;
};
