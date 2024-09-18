/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * The body of a train request.
 * @export
 * @interface TrainRequest
 */
export interface TrainRequest {
  /**
   * One or more cases to train into the model.
   * @type {Array<Array<any>>}
   * @memberof TrainRequest
   */
  cases: Array<Array<any>>;
  /**
   * List of feature names. Note, features may not begin with one of the following four characters . ^ ! #
   * @type {Array<string>}
   * @memberof TrainRequest
   */
  features?: Array<string>;
  /**
   * List of feature names for which values should be derived in the specified order. If this list is not provided, features with the "auto_derive_on_train" feature attribute set to True will be auto-derived. If provided an empty list, no features are derived. Any derived_features that are already in the "features" list will not be derived since their values are being explicitly provided.
   * @type {Array<string>}
   * @memberof TrainRequest
   */
  derived_features?: Array<string>;
  /**
   * If set to true, assumes provided categorical (nominal or ordinal) feature values have already been substituted.
   * @type {boolean}
   * @memberof TrainRequest
   */
  input_is_substituted?: boolean;
  /**
   * The name of a feature into which to accumulate neighbors' influences as weight for ablated cases. If unspecified, will not accumulate weights.
   * @type {string}
   * @memberof TrainRequest
   */
  accumulate_weight_feature?: string;
  /**
   * The name of the series to pull features and case values from internal series storage. If specified, trains on all cases that are stored in the internal series store for the specified series. The trained feature set is the combined features from storage and the passed in features. If cases is of length one, the value(s) of this case are appended to all cases in the series. If cases is the same length as the series, the value of each case in cases is applied in order to each of the cases in the series.
   * @type {string}
   * @memberof TrainRequest
   */
  series?: string;
  /**
   * When true, any auto-analysis will be skipped within the training process and a status of "analyze" will be returned if an analysis is needed. When false, the training process will automatically trigger an analysis if auto-analyze is enabled and the conditions are met. In the case when an analysis was triggered, the "status" of the TrainResponse will be "analyzed".
   * @type {boolean}
   * @memberof TrainRequest
   */
  skip_auto_analyze?: boolean;
  /**
   * When true, and accumulate_weight_feature is provided, will accumulate all of the cases' neighbor weights instead of training the cases into the model.
   * @type {boolean}
   * @memberof TrainRequest
   */
  train_weights_only?: boolean;
  /**
   * Process the request using the asynchronous Request-Reply flow. Otherwise processes request normally.
   * @type {boolean}
   * @memberof TrainRequest
   */
  run_async?: boolean;
}

/**
 * Check if a given object implements the TrainRequest interface.
 */
export function instanceOfTrainRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "cases" in value;

  return isInstance;
}

export function TrainRequestFromJSON(json: any): TrainRequest {
  return TrainRequestFromJSONTyped(json, false);
}

export function TrainRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): TrainRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    cases: json["cases"],
    features: !exists(json, "features") ? undefined : json["features"],
    derived_features: !exists(json, "derived_features") ? undefined : json["derived_features"],
    input_is_substituted: !exists(json, "input_is_substituted") ? undefined : json["input_is_substituted"],
    accumulate_weight_feature: !exists(json, "accumulate_weight_feature")
      ? undefined
      : json["accumulate_weight_feature"],
    series: !exists(json, "series") ? undefined : json["series"],
    skip_auto_analyze: !exists(json, "skip_auto_analyze") ? undefined : json["skip_auto_analyze"],
    train_weights_only: !exists(json, "train_weights_only") ? undefined : json["train_weights_only"],
    run_async: !exists(json, "run_async") ? undefined : json["run_async"],
  };
}

export function TrainRequestToJSON(value?: TrainRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    cases: value.cases,
    features: value.features,
    derived_features: value.derived_features,
    input_is_substituted: value.input_is_substituted,
    accumulate_weight_feature: value.accumulate_weight_feature,
    series: value.series,
    skip_auto_analyze: value.skip_auto_analyze,
    train_weights_only: value.train_weights_only,
    run_async: value.run_async,
  };
}
