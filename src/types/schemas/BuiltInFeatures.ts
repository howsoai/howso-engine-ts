/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 */
import type { EditHistory } from "./EditHistory";

/**
 * The features and their values created by the Howso Engine automatically
 */
export type BuiltInFeatures = {
  ".case_edit_history"?: EditHistory;
  /**
   * The default feature to store case weight, which scales the influence of a case during queries.
   */
  ".case_weight"?: number | null;
  /**
   * The list of features that have been imputed for the case.
   */
  ".imputed"?: string[] | null;
  /**
   * The normalized influence of a case on a prediction.
   */
  ".influence_weight"?: number;
  /**
   * The influence of a case on a prediction.
   */
  ".raw_influence_weight"?: number;
  /**
   * The zero-based index of the case within its series sorted by time in reverse.
   */
  ".reverse_series_index"?: number;
  /**
   * The zero-based index of the case within its series sorted by time.
   */
  ".series_index"?: number;
  /**
   * The name of the session the case was trained in.
   */
  ".session"?: string;
  /**
   * The 0-based index of the case's order in training within its session.
   */
  ".session_training_index"?: number;
  /**
   * The number of time steps that follow in the series that take place at the same time value.
   */
  ".synchronous_counter"?: number;
  /**
   * The difference between the last time value observed in the series and the maximum time value observed in the trained data. This is only defined and used when using a universal time feature.
   */
  ".time_to_horizon"?: number;
};
