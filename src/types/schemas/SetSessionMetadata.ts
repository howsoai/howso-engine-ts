/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * SetSessionMetadata
 *
 * Set session metadata for a specified session.
 */

/** Request parameters of the Trainee method: setSessionMetadata. */
export type SetSessionMetadataRequest = {
  /**
   * Any arbitrary metadata.
   */
  metadata: Record<string, any>;

  /**
   * Id of session to modify.
   */
  session: string;
};
