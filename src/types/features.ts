import { EditHistory } from "./schemas";

/**
 * Built in features and their respective value type. These features may be automatically computed to a case or found
 * in react details.
 */
export type BuiltInFeatures = {
  ".case_edit_history"?: EditHistory | null;
  ".case_weight"?: number | null;
  ".session"?: string;
  ".session_training_index"?: number;
  ".imputed"?: string[] | null;
  ".influence_weight"?: number | null;
  ".raw_influence_weight"?: number | null;
  ".series_progress"?: number | null;
  ".series_progress_delta"?: number | null;
  ".series_index"?: number | null;
};
