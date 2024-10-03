/**
 * WARNING: This file is auto generated, do not modify manually.
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
   * List of lists. case values corresponding to the context features to store into a series.
   */
  context_values: any[][];

  /**
   * Series id, the key for storing series of react cases
   */
  series: string;
};
