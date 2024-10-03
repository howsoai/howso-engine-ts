/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * RenameSubtrainee
 *
 * Rename a contained trainee
 */

export type RenameSubtraineeRequest = {
  /**
   * Id of child trainee to rename. ignored if child_name_path is specified
   */
  child_id?: string;

  /**
   * List of strings specifying the user-friendly path of the child subtrainee to rename
   */
  child_name_path?: string[];

  /**
   * New name of child trainee
   */
  new_name?: string;
};
