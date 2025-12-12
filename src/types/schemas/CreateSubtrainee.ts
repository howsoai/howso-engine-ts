/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * CreateSubtrainee
 *
 * Creates a new instance of a contained trainee
 */
import type { TraineePath } from "./TraineePath";

/** Request parameters of the Trainee method: createSubtrainee. */
export type CreateSubtraineeRequest = {
  /**
   * Unique id of child trainee to create
   */
  child_id: string;

  /**
   * Path to the file (optional)
   */
  filepath?: string;

  /**
   * List of strings specifying the user-friendly path of the child subtrainee to create
   * including the label of the child as the last value in the path
   */
  path: TraineePath;
};

/** Response of the Trainee method: createSubtrainee. */
export type CreateSubtraineeResponse = {
  /**
   * The ID of the resulting trainee that was created.
   */
  id?: string;
  /**
   * The path of the resulting trainee that was created.
   */
  path?: string | string[];
};
