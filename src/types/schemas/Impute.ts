/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * Impute
 *
 * Imputes the model, filling in all the (null) feature values
 */

export type ImputeRequest = {
  /**
   * A positive integer, specifying how many rows to fill before recomputing entropy. default is 1 which should return the
   *   best accuracy since it'll recompute it everytime.  higher values should improve performance but may decrease accuracy of results
   * @default 1
   */
  batch_size?: number;

  /**
   * List of features to use for imputation. if unspecified will use all the features in the dataset
   * @default []
   */
  features?: string[];

  /**
   * List of features to impute. if unspecified will use features
   * @default []
   */
  features_to_impute?: string[];

  /**
   * The session id for this impute
   * @default "none"
   */
  session?: string;
};
