/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * DeleteSubtrainee
 *
 * Destroys the instance of the trainee specified by the parameter "trainee".
 */
import type { TraineePath } from "./TraineePath";

/** Request parameters of the Trainee method: deleteSubtrainee. */
export type DeleteSubtraineeRequest = {
  /**
   * Unique id of child trainee to delete. Ignored if path is specified
   */
  child_id?: string;

  /**
   * List of strings specifying the user-friendly path of the child subtrainee to delete
   * including the label of the child as the last value in the path
   */
  path?: TraineePath;
};
