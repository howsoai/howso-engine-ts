/**
 * GetExtremeCases
 *
 * Retrieve the top or bottom number of cases for a specified feature, sorted top to bottom for top, and bottom to top for bottom
 *
 *
 * NOTE: This file is auto generated, do not modify manually.
 */

export type GetExtremeCasesRequest = {
  /*
   * The features for which values should be returned
   */
  features?: string[];

  /*
   * Number of cases to return, positive value will return the top (largest value), negative will return smallest
   * @default 0
   */
  num?: number;

  /*
   * The feature for which to sort the cases by
   */
  sort_feature?: string;
};
