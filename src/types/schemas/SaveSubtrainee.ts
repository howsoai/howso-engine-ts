/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * SaveSubtrainee
 *
 * Saves a subtrainee with the following optional parameters, escapes trainee filenames on save
 */

/** Request parameters of the Trainee method: saveSubtrainee. */
export type SaveSubtraineeRequest = {
  /**
   * Name to store (without extension)
   * @default ""
   */
  filename?: string;

  /**
   * Base path to store to
   * @default ""
   */
  filepath?: string;

  /**
   * Flag, default to false. if set to true will save each case as an individual file
   * @default false
   */
  separate_files?: boolean;

  /**
   * Trainee instance name path to store
   * @default ""
   */
  trainee?: string | string[];

  /**
   * Unique id for trainee. Must be provided if trainee does not have one already specified.
   */
  trainee_id?: string;
};
