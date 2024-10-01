/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * RemoveFeature
 *
 * Removes the specified feature on all cases for a trainee that match the specified condition
 * if conditions are not specified, removes feature for all cases and from the model, if condition is an empty assoc, leaves the feature metadata in the model.
 * updates the accumulated data mass for the model proportional to the number of cases modified.
 */
import type { Condition } from "./Condition";

export type RemoveFeatureRequest = {
  /*
   * Assoc of feature->value(s).
   *     no value = must have feature
   *   - for continuous or numeric ordinal features:
   *     one value = must equal exactly the value or be close to it for fuzzy match
   *     values = inclusive between
   *   - for nominal or string ordinal features:
   *     n values = must match any of these values exactly
   */
  condition?: Condition;

  /*
   * If specified ignores condition and operates on cases for the specified session id
   */
  condition_session?: string;

  /*
   * The feature name to remove
   * @default ""
   */
  feature?: string;

  /*
   * The session id when this call is being made
   * @default "none"
   */
  session?: string;
};
