/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * GetSessions
 *
 * Returns a list of all of the training sessions, assoc of id->session, and whatever other attributes specified.
 */

export type GetSessionsRequest = {
  /**
   * List of metadata attributes to return from the session
   * @default []
   */
  attributes?: string[];
};

export type GetSessionsResponse = ({
  /**
   * The session ID
   */
  id: string;
} & Record<string, any>)[];
