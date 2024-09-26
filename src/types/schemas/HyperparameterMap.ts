/**
 * HyperparameterMap
 *
 * NOTE: This file is auto generated, do not modify manually.
 */

export type HyperparameterMap = {
  /*
   * Flag indicating if all feature's residuals have been cached.
   */
  allFeatureResidualsCached?: boolean;
  /*
   * Internal flag indicating if derived features have been analyzed.
   */
  derivedAutoAnalyzed?: boolean;
  /*
   * The distance transform. used as an exponent to convert distance to influence before normalization.
   */
  dt?: number;
  /*
   * Internal map of features to their deviations. includes null deviations and sparse deviation matrices.
   */
  featureDeviations?: Record<string, any>;
  /*
   * Internal map of features to various domain attributes.
   */
  featureDomainAttributes?: Record<string, any>;
  /*
   * Map of ordinal features to their deviations.
   */
  featureOrdinalDeviations?: Record<string, any>;
  /*
   * Map of features to their computed feature residuals.
   */
  featureResiduals?: Record<string, any>;
  /*
   * Map of features to feature weights used in the distance metric.
   */
  featureWeights?: Record<string, any>;
  /*
   * Error computed during the grid search in analysis.
   */
  gridSearchError?: number;
  /*
   * The number of most similar cases used for interpolation.
   */
  k?: number;
  /*
   * Map of features to null uncertainties which describes the distances in the context of missing values.
   */
  nullUncertainties?: Record<string, any>;
  /*
   * The parameter of the lebesgue space.
   */
  p?: number;
  /*
   * The list of strings that make up the path to the set of hyperparameters within the larger hyperparameter map.
   */
  paramPath?: string[];
  /*
   * Flag indicating if deviations are used in the distance metric.
   */
  useDeviations?: boolean;
};
