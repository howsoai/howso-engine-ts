/**
 * SetContainedTraineeMaps
 *
 * Method to update the references for contained trainees, should only be used for debugging purposes.
 *
 * NOTE: This file is auto generated, do not modify manually.
 */

export type SetContainedTraineeMapsRequest = {
  /*
   * Map of trainee name to boolean if it's contained internally
   */
  child_trainee_is_contained_map?: Record<string, any>;

  /*
   * Map of contained trainee unique id to its name
   */
  contained_trainee_id_to_name_map?: Record<string, any>;

  /*
   * Map of contained trainee name to its unique id
   */
  contained_trainee_name_to_id_map?: Record<string, any>;
};
