/**
 * Howso API
 * OpenAPI implementation for interacting with the Howso API.
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists } from "../runtime";
/**
 * Parameters that get passed to get_internal_parameters.
 * @export
 * @interface TraineeWorkflowAttributesRequest
 */
export interface TraineeWorkflowAttributesRequest {
  /**
   * The action feature used to determine the desired hyperparameters.
   * @type {string}
   * @memberof TraineeWorkflowAttributesRequest
   */
  action_feature?: string;
  /**
   * The context features used to determine the desired hyperparameters.
   * @type {Array<string>}
   * @memberof TraineeWorkflowAttributesRequest
   */
  context_features?: Array<string>;
  /**
   * The mode of calculation (robust or full) used to determine the desired hyperparameters.
   * @type {string}
   * @memberof TraineeWorkflowAttributesRequest
   */
  mode?: TraineeWorkflowAttributesRequestModeEnum;
  /**
   * The weight feature used to determine the desired hyperparameters.
   * @type {string}
   * @memberof TraineeWorkflowAttributesRequest
   */
  weight_feature?: string;
}

/**
 * @export
 * @enum {string}
 */
export type TraineeWorkflowAttributesRequestModeEnum = "robust" | "full";

/**
 * Check if a given object implements the TraineeWorkflowAttributesRequest interface.
 */
export function instanceOfTraineeWorkflowAttributesRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function TraineeWorkflowAttributesRequestFromJSON(json: any): TraineeWorkflowAttributesRequest {
  return TraineeWorkflowAttributesRequestFromJSONTyped(json, false);
}

export function TraineeWorkflowAttributesRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): TraineeWorkflowAttributesRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    action_feature: !exists(json, "action_feature") ? undefined : json["action_feature"],
    context_features: !exists(json, "context_features") ? undefined : json["context_features"],
    mode: !exists(json, "mode") ? undefined : json["mode"],
    weight_feature: !exists(json, "weight_feature") ? undefined : json["weight_feature"],
  };
}

export function TraineeWorkflowAttributesRequestToJSON(value?: TraineeWorkflowAttributesRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    action_feature: value.action_feature,
    context_features: value.context_features,
    mode: value.mode,
    weight_feature: value.weight_feature,
  };
}