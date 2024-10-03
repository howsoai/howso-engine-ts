/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * ClearImputedData
 *
 * Clear values that were imputed during a specified session, but won't clear values that were manually set by user after the impute
 */

export type ClearImputedDataRequest = {
  /**
   * Session id of the impute for which to clear the data. if null, will clear all imputed
   */
  impute_session?: string;

  /**
   * Session id of this action
   * @default "clear_impute_none"
   */
  session?: string;
};
