/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * Evaluate
 *
 * Evaluate custom Amalgam code for feature values of every case in the model and returns
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
  features_to_code_map: Record<string, string>;
};

export type EvaluateResponse = {
  /**
   * The resulting value of the aggregation code.
   */
  aggregated: any;
  /**
   * A map of feature names to list of resulting values for the evaluation code for each case.
   */
  evaluated: Record<string, any[]>;
};
