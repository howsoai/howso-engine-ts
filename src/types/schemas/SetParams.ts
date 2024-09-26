/**
 * SetParams
 *
 * Sets internal hyperparameters
 *
 * NOTE: This file is auto generated, do not modify manually.
 */
import { FullHyperparameterMap } from "./FullHyperparameterMap";
import { HyperparameterMap } from "./HyperparameterMap";

export type SetParamsRequest = {
  /*
   * The factor by which to increase the analyze threshold everytime the model grows to the current threshold size
   *   default of two orders of magnitude using the universal scaling factor e
   * @default 7.389056
   */
  analyze_growth_factor?: number;

  /*
   * Stores the threshold for the number of cases at which the model should be re-analyzed. default of 100.
   * @default 100
   */
  analyze_threshold?: number;

  /*
   * Flag, default is false. when true, returns when it's time for model to be analyzed again.
   * @default false
   */
  auto_analyze_enabled?: boolean;

  /*
   * An assoc of hyperparameters to use when no others are available must contain k, p, and dt.
   */
  default_hyperparameter_map?: HyperparameterMap;

  /*
   * Must have at least an action feature (e.g., .targetless) -> a contexts key -> robust -> k, p and dt provided.
   *   example:
   *    {
   *       ".targetless" { "featurea.featureb.": { "robust" : { "k" : number, "p" : number, "dt": number }}},
   *     "featurea" : { "featureb.featurec.": { "full" : { "k" : number, "p" : number, "dt": number }}},
   *       ...
   *   }
   */
  hyperparameter_map?: FullHyperparameterMap;
};
