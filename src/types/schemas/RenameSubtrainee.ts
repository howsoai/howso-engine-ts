/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * RenameSubtrainee
 *
 * Rename a contained trainee
 */
import type { TraineePath } from "./TraineePath";
import type { TraineePathLabel } from "./TraineePathLabel";

/** Request parameters of the Trainee method: renameSubtrainee. */
export type RenameSubtraineeRequest = {
  /**
   * Id of child trainee to rename. Ignored if path is specified
   */
  child_id?: string;

  /**
   * New path label of child trainee
   */
  label: TraineePathLabel;

  /**
   * List of strings specifying the user-friendly path of the child subtrainee to rename
   */
  path?: TraineePath;
};
