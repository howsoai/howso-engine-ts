/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * EditHistoryRecord
 */

/**
 * A record of a single edit that was made to a feature of a case.
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
