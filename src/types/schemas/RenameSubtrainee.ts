/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * RenameSubtrainee
 *
 * Rename a contained trainee
 */

/** Request parameters of the Trainee method: renameSubtrainee. */
export type RenameSubtraineeRequest = {
  /**
   * Id of child trainee to rename. Ignored if child_name_path is specified
   */
  child_id?: string;

  /**
   * List of strings specifying the user-friendly path of the child subtrainee to rename
   */
  child_name_path?: string[];

  /**
   * New name of child trainee
   */
  new_name: string;
};
