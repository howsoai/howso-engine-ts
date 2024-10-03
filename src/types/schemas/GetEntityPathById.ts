/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * GetEntityPathById
 *
 * Returns the full entity path to a child trainee provided its unique trainee id if it is contained in the hierarchy.
 * iterates down the hierarchy searching for a trainee that matches the specified id, returns null if not found or
 * a string error if found but trainee is stored externally as an independent trainee.
 */

export type GetEntityPathByIdRequest = {
  /**
   * Unique id of trainee
   */
  id?: string;

  /**
   * List of strings, entity path to parent of trainee
   */
  path?: string[];
};
