/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 */

/**
 * Parameter that adjusts the required distance ratio for a newly generated case to be considered private. When unspecified, defaults to 1.0 and generated cases with a ratio of 1.0 or greater are considered private. Larger values will increase strictness of privacy check. Smaller values will loosen the privacy check. Must be a positive number, since 0 would function same as `generate_new_cases='no'`.
 */
export type NewCaseMinDistanceRatio = number | null;
