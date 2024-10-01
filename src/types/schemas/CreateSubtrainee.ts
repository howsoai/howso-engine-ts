/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * CreateSubtrainee
 *
 * Creates a new instance of a contained trainee as specified by the entity label "trainee".
 */

export type CreateSubtraineeRequest = {
  /*
   * Path to the file (optional)
   */
  filepath?: string;

  /*
   * Name of trainee to create
   * @default ""
   */
  trainee?: string | any[];

  /*
   * Unique id for trainee
   */
  trainee_id?: string;
};
