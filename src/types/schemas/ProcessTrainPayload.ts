/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * ProcessTrainPayload
 *
 * Sibling method of #compute_train_payload that takes that endpoints return data as input.
 * this method simply trains the given case data, accumulates to the weight feature, and makes
 * any case edits that are given
 */

/** Request parameters of the Trainee method: processTrainPayload. */
export type ProcessTrainPayloadRequest = {
  /**
   * List of cases, ie a list of lists of values.
   */
  cases?: any[][];

  /**
   * A map of maps defining case-ids to features to values that should be used to overwrite that case's
   * current feature value
   */
  case_edit_map?: Record<string, any>;

  /**
   * The list of features.
   */
  features?: string[];

  /**
   * The new value to update the Trainee's cached total mass to after the operation is completed.
   */
  new_total_mass?: number;

  /**
   * The new value to update the Trainee's cached total rebalance mass to after the operation is completed.
   */
  new_total_rebalance_mass?: number;

  /**
   * The session name to train the new cases into
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
   * A list of maps defining values to accumulate to each case-id's weight feature
   */
  weight_accumulation_maps?: Record<string, any>[];

  /**
   * The name of the weight feature used in ablation.
   */
  weight_feature?: string;
};

/** Response of the Trainee method: processTrainPayload. */
export type ProcessTrainPayloadResponse = {
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
