/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * SetParams
 *
 * Sets internal hyperparameters
 */
import type { HyperparameterMap } from "./HyperparameterMap";
import type { HyperparameterMapFull } from "./HyperparameterMapFull";
import type { NumericalPrecision } from "./NumericalPrecision";

/** Request parameters of the Trainee method: setParams. */
export type SetParamsRequest = {
  /**
   * The factor by which to increase the analyze threshold every time the dataset grows to the current threshold size
   *   dataset default value is the universal scaling factor e
   */
  analyze_growth_factor?: number;

  /**
   * Stores the threshold for the number of cases at which the dataset should be re-analyzed. dataset default is 100.
   */
  analyze_threshold?: number;

  /**
   * Flag, default is false. when true, returns when it's time for dataset to be analyzed again.
   */
  auto_analyze_enabled?: boolean;

  /**
   * An assoc of hyperparameters to use when no others are available must contain k, p, and dt.
   */
  default_hyperparameter_map?: HyperparameterMap;

  /**
   * Must have at least an target_mode (e.g., "targetless") -> a contexts key -> weight feature -> k, p and dt provided.
   *   example:
   *    {
   *       "targetless" { "featureA.featureB.": { ".none" : { "k" : number, "p" : number, "dt": number }}},
   *     "targeted" : { "featureA" : { "featureB.featureC.": { ".none" : { "k" : number, "p" : number, "dt": number }}}},
   *       ...
   *   }
   */
  hyperparameter_map?: HyperparameterMapFull;

  /**
   * Enum, acceptable values are:
   *   null or "recompute_precise" : default value, will use fast computation for finding similar cases but recompute their exact similarities and influences precisely
   *   "precise" : will always use high precision computation for finding similar cases and computing similarities and influences
   *   "fast" : will always use a fast approach for all computations which will use faster, but lower precision numeric operations
   *   "fastest": same as "fast" but will additionally use a faster approach specific for generative reacts
   */
  numerical_precision?: NumericalPrecision;
};
