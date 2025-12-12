/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * Train
 *
 * Train the provided cases, filtering out cases that match optionally passed in ablation parameters.
 */

/** Request parameters of the Trainee method: train. */
export type TrainRequest = {
  /**
   * Name of feature into which to accumulate neighbors' influences as weight for ablated cases. If unspecified, will not accumulate weights.
   */
  accumulate_weight_feature?: string;

  /**
   * Flag, allows feature names beginning with "." if true, otherwise an error will be given if any features start with ".".
   * @default false
   */
  allow_training_reserved_features?: boolean;

  /**
   * List of cases, ie a list of lists of values.
   */
  cases: any[][];

  /**
   * List of features to derive in the specified order. If this list is not provided, features with
   *   the 'auto_derive_on_train' feature attribute set to True will be auto-derived. If provided an empty list, will not derive any features.
   *   Any derived_features that are already in the 'features' list will not be derived since their values are being explicitly provided.
   */
  derived_features?: string[];

  /**
   * The list of features.
   */
  features: string[];

  /**
   * Flag, if set to true assumes provided categorical (nominal or ordinal) feature values already been substituted.
   * @default false
   */
  input_is_substituted?: boolean;

  /**
   * Name of series to pull features and case values from internal series storage.  If specified, trains on all cases that are
   *   stored in the internal series store for the specified series and session. The trained feature set is the combined features from storage
   *   and the passed in features.  If input_cases is of length one, the value(s) of this case are appended to all cases in the series.
   *   If input_cases is the same length as the series, the value of each case in input_cases is applied in order to each of the cases in the
   *   series.
   */
  series?: string;

  /**
   * The session label to record these cases to.  If not specified, refers to this entity's label of same name.
   */
  session?: string;

  /**
   * Flag, if set to true, will not auto_analyze, but will instead return the status "analyze" which indicates that an analyze call is recommended
   * @default false
   */
  skip_auto_analyze?: boolean;

  /**
   * Flag, if set to true, will not reduce_data, but will instead return the status "reduce_data" which indicates that a reduce_data call is recommended
   * @default false
   */
  skip_reduce_data?: boolean;

  /**
   * If specified, then the training indices for this batch of cases will start at this value. This value must be greater than the last trained index of the session.
   */
  start_index?: number;

  /**
   * Flag, if set to true, and accumulate_weight_feature is provided, will not train on the cases, but instead accumulate all of their neighbor weights.
   * @default false
   */
  train_weights_only?: boolean;
};

/** Response of the Trainee method: train. */
export type TrainResponse = {
  /**
   * The indices of the ablated input cases.
   */
  ablated_indices?: number[];
  /**
   * The number of trained cases.
   */
  num_trained: number;
  /**
   * The status output.
   *
   * - (null): No status output. This is the default.
   * - analyzed: If auto analysis is enabled and dataset has grown large enough to be analyzed again and was analyzed.
   * - analyze: If auto analysis is enabled and dataset has grown large enough to be analyzed again but was not analyzed.
   */
  status: "analyze" | "analyzed" | null;
};
