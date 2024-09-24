export interface SessionIdentity {
  /**
   * The Session's unique identifier.
   */
  id: string;

  /**
   * The name given to the Session.
   */
  name?: string;
}

export interface Session extends SessionIdentity {
  /**
   * Any key-value pair to be stored with the Session.
   */
  metadata?: { [key: string]: any };

  /**
   * The timestamp of when the Session was issued.
   */
  created_date?: Date;

  /**
   * The timestamp of when the Session was last modified.
   */
  modified_date?: Date;
}
