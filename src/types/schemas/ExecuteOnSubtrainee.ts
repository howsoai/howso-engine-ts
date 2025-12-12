/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * ExecuteOnSubtrainee
 *
 * Execute any method in the API directly on any child trainee of this trainee, used for hierarchy operations.
 */
import type { TraineePath } from "./TraineePath";

/** Request parameters of the Trainee method: executeOnSubtrainee. */
export type ExecuteOnSubtraineeRequest = {
  /**
   * Id of child trainee to execute method. Ignored if path is specified
   */
  child_id?: string;

  /**
   * Name of method to execute
   */
  method: string;

  /**
   * List of strings specifying the user-friendly path of the child subtrainee for execution of method
   */
  path?: TraineePath;

  /**
   * Payload to pass to the method
   * @default {}
   */
  payload?: Record<string, any>;
};
