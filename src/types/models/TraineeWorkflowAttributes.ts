/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface TraineeWorkflowAttributes
 */
export interface TraineeWorkflowAttributes {
  /**
   *
   * @type {{ [key: string]: any; }}
   * @memberof TraineeWorkflowAttributes
   */
  default_hyperparameter_map?: { [key: string]: any };
  /**
   *
   * @type {{ [key: string]: any; }}
   * @memberof TraineeWorkflowAttributes
   */
  hyperparameter_map?: { [key: string]: any };
  /**
   * When True, the train operation returns when it's time for the model to be analyzed again.
   * @type {boolean}
   * @memberof TraineeWorkflowAttributes
   */
  auto_analyze_enabled?: boolean;
  /**
   * The size of of the model at which to stop doing auto-analysis. Value of 0 means no limit.
   * @type {number}
   * @memberof TraineeWorkflowAttributes
   */
  auto_analyze_limit_size?: number;
  /**
   * The factor by which to increase the analyze threshold every time the model grows to the current threshold size.
   * @type {number}
   * @memberof TraineeWorkflowAttributes
   */
  analyze_growth_factor?: number;
  /**
   * The threshold for the number of cases at which the model should be re-analyzed.
   * @type {number}
   * @memberof TraineeWorkflowAttributes
   */
  analyze_threshold?: number;
}

/**
 * Check if a given object implements the TraineeWorkflowAttributes interface.
 */
export function instanceOfTraineeWorkflowAttributes(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function TraineeWorkflowAttributesFromJSON(json: any): TraineeWorkflowAttributes {
  return TraineeWorkflowAttributesFromJSONTyped(json, false);
}

export function TraineeWorkflowAttributesFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): TraineeWorkflowAttributes {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    default_hyperparameter_map: !exists(json, "default_hyperparameter_map")
      ? undefined
      : json["default_hyperparameter_map"],
    hyperparameter_map: !exists(json, "hyperparameter_map") ? undefined : json["hyperparameter_map"],
    auto_analyze_enabled: !exists(json, "auto_analyze_enabled") ? undefined : json["auto_analyze_enabled"],
    auto_analyze_limit_size: !exists(json, "auto_analyze_limit_size") ? undefined : json["auto_analyze_limit_size"],
    analyze_growth_factor: !exists(json, "analyze_growth_factor") ? undefined : json["analyze_growth_factor"],
    analyze_threshold: !exists(json, "analyze_threshold") ? undefined : json["analyze_threshold"],
  };
}

export function TraineeWorkflowAttributesToJSON(value?: TraineeWorkflowAttributes | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    default_hyperparameter_map: value.default_hyperparameter_map,
    hyperparameter_map: value.hyperparameter_map,
    auto_analyze_enabled: value.auto_analyze_enabled,
    auto_analyze_limit_size: value.auto_analyze_limit_size,
    analyze_growth_factor: value.analyze_growth_factor,
    analyze_threshold: value.analyze_threshold,
  };
}
