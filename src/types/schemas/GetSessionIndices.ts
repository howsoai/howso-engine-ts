/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * GetSessionIndices
 *
 * Return list of all session indices for a specified session.
 * session indices are 0-based index of number of the case for the session used for replays; may change if cases are removed
 */

export type GetSessionIndicesRequest = {
  /**
   * Id of session
   */
  session: string;
};

export type GetSessionIndicesResponse = number[];
