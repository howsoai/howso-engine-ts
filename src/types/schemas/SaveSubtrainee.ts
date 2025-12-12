/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * SaveSubtrainee
 *
 * Saves a subtrainee with the following optional parameters, escapes trainee filenames on save
 */
import type { TraineePath } from "./TraineePath";

/** Request parameters of the Trainee method: saveSubtrainee. */
export type SaveSubtraineeRequest = {
  /**
   * When true, stores the child out as an independent trainee and removes it as a contained entity.
   * @default false
   */
  as_external?: boolean;

  /**
   * Unique id of child trainee to save. Ignored if path is specified
   */
  child_id?: string;

  /**
   * Name to store (without extension)
   */
  filename: string;

  /**
   * Base path to store to
   * @default ""
   */
  filepath?: string;

  /**
   * List of strings specifying the user-friendly path of the child subtrainee to save
   * including the label of the child as the last value in the path
   */
  path?: TraineePath;

  /**
   * Flag, default to false. if set to true will save each case as an individual file
   * @default false
   */
  separate_files?: boolean;
};
