/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * ComputeTrainPayload
 *
 * Alternate read-only train call that given cases, returns the case data that should be trained and the case-id -> weight accumulating maps to be used on a
 * write-permissioned follow up call to the Trainee
 */

/** Request parameters of the Trainee method: computeTrainPayload. */
export type ComputeTrainPayloadRequest = {
  /**
   * Name of feature into which to accumulate neighbors' influences as weight for ablated cases. Will default to the default auto ablation weight
   * feature if unspecified
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
   * This parameter is not truly supported in this method, but this endpoint should be able to take Train parameters.
   */
  series?: string;

  /**
   * The session label to record these cases to.  If not specified, refers to this entity's label of same name.
   */
  session?: string;

  /**
   * Flag, if set to true, will not auto_analyze, but will instead return the status "analyze" which indicates that an analyze call is recommended.
   * This flag is just passed back in the response to be used within `process_train_payload` which is designed to take the response of this label
   * @default false
   */
  skip_auto_analyze?: boolean;

  /**
   * Flag, if set to true, will not reduce_data, but will instead return the status "reduce_data" which indicates that a reduce_data call is recommended
   * This flag is just passed back in the response to be used within `process_train_payload` which is designed to take the response of this label
   * @default false
   */
  skip_reduce_data?: boolean;

  /**
   * If specified, then the training indices for this batch of cases will start at this value. This value must be greater than the last trained index of the session.
   * This value is just passed back in the response to be used within `process_train_payload` which is designed to take the response of this label
   */
  start_index?: number;

  /**
   * Flag, if set to true, and accumulate_weight_feature is provided, will not train on the cases, but instead accumulate all of their neighbor weights.
   * @default false
   */
  train_weights_only?: boolean;
};

/** Response of the Trainee method: computeTrainPayload. */
export type ComputeTrainPayloadResponse = {
  /**
   * A list of cases with feature values already derived.
   */
  cases: any[][];
  /**
   * A map of maps defining updated features values to assign to trained cases.
   */
  case_edit_map?: Record<string, any>;
  /**
   * The list of feature names that correspond to the values in each list of values in 'cases'.
   */
  features: string[];
  /**
   * The new value for the cached mass to use when rebalance features are enabled.
   */
  new_total_mass?: number;
  /**
   * The new value for the cached rebalance mass to use when rebalance features are enabled.
   */
  new_total_rebalance_mass?: number;
  /**
   * A list of maps defining the influence weights to accumulate to trained cases.
   */
  weight_accumulation_maps?: Record<string, any>[];
};
