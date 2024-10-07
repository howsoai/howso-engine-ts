/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * GenerateNewCases
 */

/**
 * Control whether generated cases can be those that already exist in the model. This parameter takes in a string that could be one of the following:
 * a. "attempt": attempts to generate new cases and if its not possible to generate a new case, it might generate cases in "no" mode (see point c.)
 * b. "always": always generates new cases and if its not possible to generate a new case, it returns nulls.
 * c. "no": generates data based on the `desired_conviction` specified and the generated data is not guaranteed to be a new case (that is, a case not found in original dataset.)
 */
export type GenerateNewCases = "no" | "attempt" | "always";
