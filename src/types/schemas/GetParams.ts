/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * GetParams
 *
 * Return the full internal parameters map if no parameters are specified.
 * if any of the parameters are specified, then GetHyperparameters is called, which uses the specified parameters to find the most suitable set of hyperparameters to return
 */
import type { HyperparameterMap } from "./HyperparameterMap";
import type { HyperparameterMapFull } from "./HyperparameterMapFull";
import type { NumericalPrecision } from "./NumericalPrecision";

/** Request parameters of the Trainee method: getParams. */
export type GetParamsRequest = {
  /**
   * The target feature of the desired hyperparameters, when specified as a feature name, outputs the matching "targeted" hyperparameters.
   *   When empty string "" will output "targetless" hyperparameters. When unspecified defaults to whatever hyperparameters were analyzed,
   *   prioritizing "targetless" hyperparameters if multiple parameters exist.
   */
  action_feature?: string;

  /**
   * The set of context features used for the desired hyperparameters
   */
  context_features?: string[];

  /**
   * The weight feature used in the calculation of the desired hyperparameters
   */
  weight_feature?: string;
};

/** Response of the Trainee method: getParams. */
export type GetParamsResponse = {
  /**
   * The scalar rate at which the number of cases to trigger an auto-analysis grows with each iteration
   */
  analyze_growth_factor?: number;
  /**
   * The number of cases at which the auto-analysis is triggered.
   */
  analyze_threshold?: number;
  /**
   * Flag indicating of auto-analysis is enabled.
   */
  auto_analyze_enabled?: boolean;
  /**
   * The map of default hyperparameters
   */
  default_hyperparameter_map?: HyperparameterMap;
  /**
   * The full map of hyperparameters or a specific map of hyperparameters if any parameters were given
   */
  hyperparameter_map?: HyperparameterMap | HyperparameterMapFull;
  /**
   * Parameter controlling the tradeoff of precision of computations for speed.
   */
  numerical_precision?: NumericalPrecision;
};
