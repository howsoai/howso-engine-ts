/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * LoadSubtrainee
 *
 * Attempts to load a subtrainee with the following optional parameters.
 * If a parameter is not specified, it will look to this entity's own label of the same name.
 * If the saved instance does not exist the existing trainee will remain unmodified and the function will return null.
 * assumes loaded trainee filenames need to be escaped
 * returns the trainee name if successful, null if not
 */

export type LoadSubtraineeRequest = {
  /**
   * Name to load (without extension)
   * @default ""
   */
  filename?: string;

  /**
   * Base path to load from
   * @default ""
   */
  filepath?: string;

  /**
   * Flag, default to false. if set to true will load each case from its individual file
   * @default false
   */
  separate_files?: boolean;

  /**
   * Name path of trainee to load
   * @default ""
   */
  trainee?: string | string[];
};

export type LoadSubtraineeResponse = {
  /**
   * The name of the resulting trainee that was loaded.
   */
  name: string;
};
