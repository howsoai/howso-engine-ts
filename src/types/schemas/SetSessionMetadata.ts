/**
 * SetSessionMetadata
 *
 * Set session metadata for a specified session.
 *
 * NOTE: This file is auto generated, do not modify manually.
 */

export type SetSessionMetadataRequest = {
  /*
   * Any arbitrary metadata.
   * @default {}
   */
  metadata?: Record<string, any>;

  /*
   * Id of session to modify.
   * @default "none"
   */
  session?: string;
};
