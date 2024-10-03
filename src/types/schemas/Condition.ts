/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * Condition
 */

/**
 * The condition map to select the cases to remove that meet all the provided conditions. the dictionary keys are the feature name and values are one of:
 * - none
 * - a value, must match exactly.
 * - an array of two numeric values, specifying an inclusive range. only applicable to continuous and numeric ordinal features.
 * - an array of string values, must match any of these values exactly. only applicable to nominal and string ordinal features.
 */
export type Condition = Record<string, any>;
