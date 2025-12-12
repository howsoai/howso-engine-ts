/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * GetHierarchyRelationships
 *
 * Method to output references for contained trainees
 */

/** Response of the Trainee method: getHierarchyRelationships. */
export type GetHierarchyRelationshipsResponse = {
  /**
   * Map of contained trainee unique id to its path label.
   */
  id_to_path_map?: Record<string, string>;
  /**
   * Map of trainee path label to boolean if it's contained internally.
   */
  is_contained_map?: Record<string, boolean>;
  /**
   * The unique string identifier for the parent of the trainee.
   */
  parent_id?: string | null;
  /**
   * Map of contained trainee path label to its unique id.
   */
  path_to_id_map?: Record<string, string>;
};
