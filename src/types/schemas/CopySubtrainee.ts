/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * CopySubtrainee
 *
 * Creates a copy of a trainee and stores it a subtrainee, returns the path of the copied trainee on success
 */
import type { TraineePath } from "./TraineePath";

/** Request parameters of the Trainee method: copySubtrainee. */
export type CopySubtraineeRequest = {
  /**
   * Id of source trainee to copy. Ignored if source_path is specified.
   *   If neither source_path nor source_id are specified, copies the trainee itself.
   */
  source_id?: string;

  /**
   * List of strings specifying the user-friendly path of the child subtrainee to copy.
   */
  source_path?: TraineePath;

  /**
   * New unique id of copied target trainee
   */
  target_id: string;

  /**
   * List of strings specifying the resulting destination user-friendly path of the child subtrainee.
   * including the label of the child as the last value in the path
   */
  target_path: TraineePath;
};

/** Response of the Trainee method: copySubtrainee. */
export type CopySubtraineeResponse = {
  /**
   * The path of the resulting trainee that was copied.
   */
  path?: string | string[];
};
