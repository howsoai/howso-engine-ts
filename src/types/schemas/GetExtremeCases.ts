/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * GetExtremeCases
 *
 * Retrieve the top or bottom number of cases for a specified feature, sorted top to bottom for top, and bottom to top for bottom
 */

export type GetExtremeCasesRequest = {
  /**
   * The features for which values should be returned
   */
  features: string[];

  /**
   * Number of cases to return, positive value will return the top (largest value), negative will return smallest
   */
  num: number;

  /**
   * The feature for which to sort the cases by
   */
  sort_feature: string;
};

export type GetExtremeCasesResponse = {
  /**
   * A list of lists of case values in the order specified by 'features'.
   */
  cases?: any[][];
  /**
   * The list of features in the order of values of the sublists in 'cases'.
   */
  features?: string[];
};
