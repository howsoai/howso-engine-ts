/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface ReactGroupResponseContent
 */
export interface ReactGroupResponseContent {
  /**
   * The familiarity conviction of adding the cases to the Model.
   * @type {Array<number>}
   * @memberof ReactGroupResponseContent
   */
  familiarity_conviction_addition?: Array<number>;
  /**
   * The familiarity conviction of removing the cases from the Model.
   * @type {Array<number>}
   * @memberof ReactGroupResponseContent
   */
  familiarity_conviction_removal?: Array<number>;
  /**
   * The KL divergence of adding the cases to the Model.
   * @type {Array<number>}
   * @memberof ReactGroupResponseContent
   */
  kl_divergence_addition?: Array<number>;
  /**
   * The KL divergence of removing the cases from the Model.
   * @type {Array<number>}
   * @memberof ReactGroupResponseContent
   */
  kl_divergence_removal?: Array<number>;
  /**
   * The p value of adding the cases to the Model.
   * @type {Array<number>}
   * @memberof ReactGroupResponseContent
   */
  p_value_of_addition?: Array<number>;
  /**
   * The p value of removing the cases from the Model.
   * @type {Array<number>}
   * @memberof ReactGroupResponseContent
   */
  p_value_of_removal?: Array<number>;
  /**
   * Distance contribution ratios.
   * @type {Array<number>}
   * @memberof ReactGroupResponseContent
   */
  distance_contribution?: Array<number>;
  /**
   * The base Model average distance contribution.
   * @type {Array<number>}
   * @memberof ReactGroupResponseContent
   */
  base_model_average_distance_contribution?: Array<number>;
  /**
   * The combined Model average distance contribution.
   * @type {Array<number>}
   * @memberof ReactGroupResponseContent
   */
  combined_model_average_distance_contribution?: Array<number>;
}

/**
 * Check if a given object implements the ReactGroupResponseContent interface.
 */
export function instanceOfReactGroupResponseContent(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function ReactGroupResponseContentFromJSON(json: any): ReactGroupResponseContent {
  return ReactGroupResponseContentFromJSONTyped(json, false);
}

export function ReactGroupResponseContentFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): ReactGroupResponseContent {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    familiarity_conviction_addition: !exists(json, "familiarity_conviction_addition")
      ? undefined
      : json["familiarity_conviction_addition"],
    familiarity_conviction_removal: !exists(json, "familiarity_conviction_removal")
      ? undefined
      : json["familiarity_conviction_removal"],
    kl_divergence_addition: !exists(json, "kl_divergence_addition") ? undefined : json["kl_divergence_addition"],
    kl_divergence_removal: !exists(json, "kl_divergence_removal") ? undefined : json["kl_divergence_removal"],
    p_value_of_addition: !exists(json, "p_value_of_addition") ? undefined : json["p_value_of_addition"],
    p_value_of_removal: !exists(json, "p_value_of_removal") ? undefined : json["p_value_of_removal"],
    distance_contribution: !exists(json, "distance_contribution") ? undefined : json["distance_contribution"],
    base_model_average_distance_contribution: !exists(json, "base_model_average_distance_contribution")
      ? undefined
      : json["base_model_average_distance_contribution"],
    combined_model_average_distance_contribution: !exists(json, "combined_model_average_distance_contribution")
      ? undefined
      : json["combined_model_average_distance_contribution"],
  };
}

export function ReactGroupResponseContentToJSON(value?: ReactGroupResponseContent | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    familiarity_conviction_addition: value.familiarity_conviction_addition,
    familiarity_conviction_removal: value.familiarity_conviction_removal,
    kl_divergence_addition: value.kl_divergence_addition,
    kl_divergence_removal: value.kl_divergence_removal,
    p_value_of_addition: value.p_value_of_addition,
    p_value_of_removal: value.p_value_of_removal,
    distance_contribution: value.distance_contribution,
    base_model_average_distance_contribution: value.base_model_average_distance_contribution,
    combined_model_average_distance_contribution: value.combined_model_average_distance_contribution,
  };
}
