/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * ExecuteOnSubtrainee
 *
 * Execute any method in the API directly on any child trainee of this trainee, used for hierarchy operations.
 */

export type ExecuteOnSubtraineeRequest = {
  /**
   * Flag, applicable only to 'load_subtrainee' and 'save_subtrainee' and if specifying child_name_path or child_id.
   *   For 'save_subtrainee', stores the child out as an independent trainee and removes it as a contained entity.
   *   For 'load_subtrainee' updates hierarchy by adding the child as an independently stored trainee to the hierarchy without loading the trainee as a subtrainee.
   */
  as_external?: boolean;

  /**
   * Id of child trainee to execute method. Ignored if child_name_path is specified
   */
  child_id?: string;

  /**
   * List of strings specifying the user-friendly path of the child subtrainee for execution of method
   */
  child_name_path?: string[];

  /**
   * Trainee id of trainee being loaded, must be specified only when 'load_subtrainee' and as_external is true.
   */
  load_external_trainee_id?: string;

  /**
   * Name of method to execute
   */
  method: string;

  /**
   * Payload to pass to the method
   * @default {}
   */
  payload?: Record<string, any>;
};

export type ExecuteOnSubtraineeResponse = any;
