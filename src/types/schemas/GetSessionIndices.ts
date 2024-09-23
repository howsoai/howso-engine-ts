/**
 * GetSessionIndices
 *
 * Return list of all session indices for a specified session.
 * session indices are 0-based index of number of the case for the session used for replays; may change if cases are removed
 * {read_only (true)}
 *
 * NOTE: This file is auto generated, do not modify manually.
 */

export type GetSessionIndicesRequest = {
  /*
   * Id of session
   * @default ""
   */
  session?: string;
};
