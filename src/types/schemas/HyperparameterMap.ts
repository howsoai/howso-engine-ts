/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 */

/**
 * HyperparameterMap schema.
 */
export type HyperparameterMap = {
  /**
   * Flag indicating if all feature's residuals have been cached.
   */
  allFeatureResidualsCached?: boolean;
  /**
   * Internal flag indicating if derived features have been analyzed.
   */
  derivedAutoAnalyzed?: boolean;
  /**
   * The distance transform. Used as an exponent to convert distance to influence before normalization. Also accepts string value "surprisal_to_prob" as experimental option that converts distances to surprisal.
   */
  dt: number | "surprisal_to_prob";
  /**
   * Internal map of features to their deviations. Includes null deviations and sparse deviation matrices.
   */
  featureDeviations?: Record<string, any> | null;
  /**
   * Internal map of features to various domain attributes.
   */
  featureDomainAttributes?: Record<string, any> | null;
  /**
   * Map of ordinal features to their deviations.
   */
  featureOrdinalDeviations?: Record<string, any>;
  /**
   * Map of features to their computed feature residuals.
   */
  featureResiduals?: Record<string, number>;
  /**
   * Map of features to feature weights used in the distance metric.
   */
  featureWeights?: Record<string, number> | null;
  /**
   * Error computed during the grid search in analysis.
   */
  gridSearchError?: number;
  /**
   * The number of most similar cases used for interpolation.
   */
  k: number;
  /**
   * Map of features to null uncertainties which describes the distances in the context of missing values.
   */
  nullUncertainties?: Record<string, (number | null)[]>;
  /**
   * The parameter of the Lebesgue space.
   */
  p: number;
  /**
   * The list of strings that make up the path to the set of hyperparameters within the larger hyperparameter map.
   */
  paramPath?: string[];
  /**
   * Flag indicating if deviations are used in the distance metric.
   */
  useDeviations?: boolean;
};
