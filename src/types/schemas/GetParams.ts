/**
 * GetParams
 *
 * Return the full internal parameters map if no parameters are specified.
 * if any of the parameters are specified, then gethyperparameters is called, which uses the specified parameters to find the most suitable set of hyperparameters to return
 * {read_only (true)}
 *
 * NOTE: This file is auto generated, do not modify manually.
 */

export type GetParamsRequest = {
  /*
   * The target feature of the desired hyperparameters
   */
  action_feature?: string;

  /*
   * The set of context features used for the desired hyperparameters
   */
  context_features?: string[];

  /*
   * The method of calculation used to find the desired hyperparameters
   */
  mode?: "robust" | "full";

  /*
   * The weight feature used in the calculation of the desired hyperparameters
   */
  weight_feature?: string;
};
