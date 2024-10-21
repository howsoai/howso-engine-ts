/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * GetEntityPathById
 *
 * Returns the full entity path to a child trainee provided its unique trainee id if it is contained in the hierarchy.
 * Iterates down the hierarchy searching for a trainee that matches the specified id, returns null if not found or
 * a string error if found but trainee is stored externally as an independent trainee.
 */

/** Request parameters of the Trainee method: getEntityPathById. */
export type GetEntityPathByIdRequest = {
  /**
   * Unique id of trainee
   */
  id: string;

  /**
   * List of strings, entity path to parent of trainee
   */
  path: string[];
};

/** Response of the Trainee method: getEntityPathById. */
export type GetEntityPathByIdResponse = string[] | string | null;
