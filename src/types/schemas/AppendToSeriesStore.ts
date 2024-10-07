/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * AppendToSeriesStore
 *
 * Append cases to a series
 */

export type AppendToSeriesStoreRequest = {
  /**
   * List of context features for the corresponding context_values
   */
  context_features: string[];

  /**
   * List of lists. Case values corresponding to the context features to store into a series.
   */
  context_values: any[][];

  /**
   * Series id, the key for storing series of react cases
   */
  series: string;
};
