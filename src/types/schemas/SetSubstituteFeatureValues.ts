/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * SetSubstituteFeatureValues
 *
 * Sets substitution feature values used in case generation
 */

/** Request parameters of the Trainee method: setSubstituteFeatureValues. */
export type SetSubstituteFeatureValuesRequest = {
  /**
   * Assoc of feature -> assoc of value -> substitution.
   *   If this map is null, all substitutions will be disabled and cleared
   *   If any feature in the substitution_value_map has a missing or empty assoc of substitutions, substitution values will immeditally be generated
   */
  substitution_value_map: Record<string, any>;
};
