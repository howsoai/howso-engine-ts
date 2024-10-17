/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * CopySubtrainee
 *
 * Creates a copy of a trainee and stores it a subtrainee, returns the name of the copied trainee on success
 */

export type CopySubtraineeRequest = {
  /**
   * Id of source trainee to copy. Ignored if source_name_path is specified.
   *   If neither source_name_path nor source_id are specified, copies the trainee itself.
   */
  source_id?: string;

  /**
   * List of strings specifying the user-friendly path of the child subtrainee to copy.
   */
  source_name_path?: string[];

  /**
   * Id of target trainee to copy trainee into.  Ignored if target_name_path is specified.
   *   If neither target_name_path nor target_id are specified, copies as a direct child of trainee
   */
  target_id?: string;

  /**
   * List of strings specifying the user-friendly path of the child subtrainee to copy trainee into.
   */
  target_name_path?: string[];

  /**
   * Name of new copied trainee
   */
  target_trainee: string | string[];
};

export type CopySubtraineeResponse = {
  name: string[] | string;
};
