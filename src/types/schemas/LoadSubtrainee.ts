/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * LoadSubtrainee
 *
 * Attempts to load a subtrainee with the following optional parameters.
 * If the saved instance does not exist the existing trainee will remain unmodified and the function will return null.
 * assumes loaded trainee filenames need to be escaped
 * returns the trainee path if successful, null if not
 */
import type { TraineePath } from "./TraineePath";

/** Request parameters of the Trainee method: loadSubtrainee. */
export type LoadSubtraineeRequest = {
  /**
   * Unique id of child trainee to load
   */
  child_id: string;

  /**
   * Name to load (without extension)
   */
  filename: string;

  /**
   * Base path to load from
   * @default ""
   */
  filepath?: string;

  /**
   * List of strings specifying the user-friendly path of the child subtrainee to load
   * including the label of the child as the last value in the path
   */
  path: TraineePath;

  /**
   * Flag, default to false. if set to true will load each case from its individual file
   * @default false
   */
  separate_files?: boolean;
};

/** Response of the Trainee method: loadSubtrainee. */
export type LoadSubtraineeResponse = {
  /**
   * The path of the resulting trainee that was loaded.
   */
  path: string | string[];
};
