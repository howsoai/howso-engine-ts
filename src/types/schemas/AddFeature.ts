/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * AddFeature
 *
 * Adds the specified feature on all cases for a trainee that match the specified condition. overwrites features that
 * if condition are not specified, adds feature for all cases and to the model.  if condition is an empty assoc, will not modify feature metadata in the model.
 * if feature attributes are passed in, will also set the model's feature attributes.
 * updates the accumulated data mass for the model proportional to the number of cases modified.
 */
import type { Condition } from "./Condition";
import type { FeatureAttributes } from "./FeatureAttributes";

export type AddFeatureRequest = {
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
   * If specified ignores condition and returns cases for the specified session id
   */
  condition_session?: string;

  /*
   * List of case ids to operate on. if specified, conditions will be ignored
   */
  entities?: string[];

  /*
   * Name of feature to odd
   * @default ""
   */
  feature?: string;

  /*
   * Assoc of feature specific attributes for this feature. if unspecified and conditions are not specified, will assume feature type as 'continuous'.
   */
  feature_attributes?: FeatureAttributes;

  /*
   * Value for the feature
   */
  feature_value?: any;

  /*
   * Flag, if set to true, will not update hyperparameter metadata map
   * @default false
   */
  internal_feature?: boolean;

  /*
   * {type "boolean"}
   * @default true
   */
  overwrite?: boolean;

  /*
   * The session id when this call is being made
   * @default "none"
   */
  session?: string;
};
