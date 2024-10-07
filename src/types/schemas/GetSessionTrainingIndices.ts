/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * GetSessionTrainingIndices
 *
 * Return list of all session training indices for a specified session.
 * session training indices are 0-based index of the case, ordered by training during the session; is not changed
 */

export type GetSessionTrainingIndicesRequest = {
  /**
   * Id of session
   */
  session: string;
};

export type GetSessionTrainingIndicesResponse = number[];
