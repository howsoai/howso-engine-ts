/**
 * WARNING: This file is auto generated, do not modify manually.
 *
 * Train
 *
 * Train the passed in cases, filtering out cases that match optionally passed in ablation parameters
 *  returns a response object in the following format:
 *   (associate
 *     "num_trained" num_trained_cases
 *     "ablated_indices" (list of session training indices for the ablated cases)
 *     "status" "status output message"
 *   )
 *    list of 'status' values:
 *     (null) - default output, no status output
 *     "analyzed" - if auto analysis is enabled and model has grown large enough to be analyzed again and was analyzed
 *     "analyze" - if auto analysis is enabled and model has grown large enough to be analyzed again but was not analyzed
 */

export type TrainRequest = {
  /*
   * Name of feature into which to accumulate neighbors' influences as weight for ablated cases. if unspecified, will not accumulate weights.
   */
  accumulate_weight_feature?: string;

  /*
   * Flag, allows feature names beginning with "." if true, otherwise an error will be given if any features start with ".".
   * @default false
   */
  allow_training_reserved_features?: boolean;

  /*
   * List of cases, ie a list of lists of values.
   * @default []
   */
  cases?: any[][];

  /*
   * List of features to derive in the specified order. if this list is not provided, features with
   *   the 'auto_derive_on_train' feature attribute set to true will be auto-derived. if provided an empty list, will not derive any features.
   *   any derived_features that are already in the 'features' list will not be derived since their values are being explicitly provided.
   */
  derived_features?: string[];

  /*
   * The list of features.
   * @default []
   */
  features?: string[];

  /*
   * Flag, if set to true assumes provided categorical (nominal or ordinal) feature values already been substituted.
   * @default false
   */
  input_is_substituted?: boolean;

  /*
   * Name of series to pull features and case values from internal series storage.  if specified, trains on all cases that are
   *   stored in the internal series store for the specified series and session. the trained feature set is the combined features from storage
   *   and the passed in features.  if input_cases is of length one, the value(s) of this case are appended to all cases in the series.
   *   if input_cases is the same length as the series, the value of each case in input_cases is applied in order to each of the cases in the
   *   series.
   */
  series?: string;

  /*
   * The session label to record these cases to.  if not specified, refers to this entity's label of same name.
   */
  session?: string;

  /*
   * Flag, if set to true, will not auto_analyze, but will instead return the status "analyze" which indicates that an analyze call is recommended
   * @default false
   */
  skip_auto_analyze?: boolean;

  /*
   * Flag, if set to true, and accumulate_weight_feature is provided, will not train on the cases, but instead accumulate all of their neighbor weights.
   * @default false
   */
  train_weights_only?: boolean;
};
