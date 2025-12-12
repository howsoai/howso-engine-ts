/**
 * 🛑 WARNING: DO NOT EDIT! 🛑
 * This file is auto generated and should not be modified directly.
 *
 * GetHierarchy
 *
 * Pull the hierarchy for a trainee, returns an assoc of:
 * the currently contained hierarchy as a nested assoc with .false for trainees that are stored independently.
 */
import type { TraineePath } from "./TraineePath";

/** Request parameters of the Trainee method: getHierarchy. */
export type GetHierarchyRequest = {
  /**
   * Path to this trainee as a list of path labels
   * @default []
   */
  path_list?: TraineePath;
};

/** Response of the Trainee method: getHierarchy. */
export type GetHierarchyResponse = Record<string, any>;
