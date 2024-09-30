import { EditHistory } from "./schemas";

/**
 * Internally stored features and their respective value type.
 */
export type InternalFeatures = {
  ".case_edit_history"?: EditHistory | null;
  ".case_weight"?: number | null;
  ".session"?: string;
  ".session_training_index"?: number;
  ".imputed"?: string[] | null;
};

/**
 * Fields and their respective value type which may be part of a React details response.
 */
export type InternalDetailFeatures = {
  ".session"?: string;
  ".session_training_index"?: number;
  ".influence_weight"?: number | null;
  ".raw_influence_weight"?: number | null;
};
