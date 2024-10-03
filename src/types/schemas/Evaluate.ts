/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * Evaluate
 *
 * Evaluate custom amalgam code for feature values of every case in the model and returns
 * a list of the custom code's return values for each feature specified.
 */

export type EvaluateRequest = {
  /**
   * Custom code to aggregrate the results from using features_to_code
   */
  aggregation_code?: string;

  /**
   * A assoc of feature names to custom code
   */
  features_to_code_map?: Record<string, string>;
};
