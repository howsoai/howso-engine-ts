/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * EditHistoryRecord
 */

export type EditHistoryRecord = {
  /**
   * The feature that was modified.
   */
  feature?: string;
  /**
   * The previous value.
   */
  previous_value?: any;
  /**
   * The type of modification.
   */
  type?: "set" | "remove" | "impute" | "edit";
  /**
   * The new value.
   */
  value?: any;
};
