/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * SetSessionMetadata
 *
 * Set session metadata for a specified session.
 */

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
