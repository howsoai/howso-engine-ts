/**
 * WARNING: This file is auto generated, do not modify manually.
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
