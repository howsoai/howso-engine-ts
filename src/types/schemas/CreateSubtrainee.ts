/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * CreateSubtrainee
 *
 * Creates a new instance of a contained trainee as specified by the entity label "trainee".
 */

export type CreateSubtraineeRequest = {
  /**
   * Path to the file (optional)
   */
  filepath?: string;

  /**
   * Name of trainee to create
   * @default ""
   */
  trainee?: string | string[];

  /**
   * Unique id for trainee
   */
  trainee_id?: string;
};

export type CreateSubtraineeResponse = {
  /**
   * The ID of the resulting trainee that was created.
   */
  id?: string;
  /**
   * The name of the resulting trainee that was created.
   */
  name?: string;
};
