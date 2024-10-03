/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * SaveSubtrainee
 *
 * Saves a subtrainee with the following optional parameters, escapes trainee filenames on save
 */

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
  trainee?: string | any[];

  /**
   * Unique id for trainee. must be provided if trainee does not have one already specified.
   */
  trainee_id?: string;
};
