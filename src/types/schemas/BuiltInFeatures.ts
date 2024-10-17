/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * BuiltInFeatures
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
   * The zero-based index of the case within its series sorted by time.
   */
  ".series_index"?: number;
  /**
   * A 0-1 float describing the progress though the case's series at the point in time described by the case.
   */
  ".series_progress"?: number;
  /**
   * The delta between the series progress of the previous case of the series and the case being described.
   */
  ".series_progress_delta"?: number;
  /**
   * The name of the session the case was trained in.
   */
  ".session"?: string;
  /**
   * The 0-based index of the case's order in training within its session.
   */
  ".session_training_index"?: number;
};
