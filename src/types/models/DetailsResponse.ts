/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
import type { DerivationParameters } from "./DerivationParameters";
import { DerivationParametersFromJSON, DerivationParametersToJSON } from "./DerivationParameters";
import type { DetailsResponseDistanceRatioPartsInner } from "./DetailsResponseDistanceRatioPartsInner";
import {
  DetailsResponseDistanceRatioPartsInnerFromJSON,
  DetailsResponseDistanceRatioPartsInnerToJSON,
} from "./DetailsResponseDistanceRatioPartsInner";
import type { DetailsResponseOutlyingFeatureValuesInnerValue } from "./DetailsResponseOutlyingFeatureValuesInnerValue";

/**
 *
 * @export
 * @interface DetailsResponse
 */
export interface DetailsResponse {
  /**
   *
   * @type {Array<Array<any>>}
   * @memberof DetailsResponse
   */
  boundary_cases?: Array<Array<any>>;
  /**
   *
   * @type {Array<{ [key: string]: any; }>}
   * @memberof DetailsResponse
   */
  categorical_action_probabilities?: Array<{ [key: string]: any }>;
  /**
   *
   * @type {Array<DerivationParameters>}
   * @memberof DetailsResponse
   */
  derivation_parameters?: Array<DerivationParameters>;
  /**
   *
   * @type {Array<{ [key: string]: any; }>}
   * @memberof DetailsResponse
   */
  feature_residuals_full?: Array<{ [key: string]: any }>;
  /**
   *
   * @type {Array<{ [key: string]: any; }>}
   * @memberof DetailsResponse
   */
  feature_residuals_robust?: Array<{ [key: string]: any }>;
  /**
   *
   * @type {Array<{ [key: string]: any; }>}
   * @memberof DetailsResponse
   */
  prediction_stats?: Array<{ [key: string]: any }>;
  /**
   *
   * @type {Array<{ [key: string]: DetailsResponseOutlyingFeatureValuesInnerValue; }>}
   * @memberof DetailsResponse
   */
  outlying_feature_values?: Array<{ [key: string]: DetailsResponseOutlyingFeatureValuesInnerValue }>;
  /**
   *
   * @type {Array<Array<any>>}
   * @memberof DetailsResponse
   */
  influential_cases?: Array<Array<any>>;
  /**
   *
   * @type {Array<Array<any>>}
   * @memberof DetailsResponse
   */
  most_similar_cases?: Array<Array<any>>;
  /**
   * Observational errors for all features as defined in feature attributes.
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  observational_errors?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  feature_mda_full?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  feature_mda_robust?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  feature_mda_ex_post_full?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  feature_mda_ex_post_robust?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  directional_feature_contributions_full?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  directional_feature_contributions_robust?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  feature_contributions_full?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  feature_contributions_robust?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  case_directional_feature_contributions_full?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  case_directional_feature_contributions_robust?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  case_feature_contributions_full?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  case_feature_contributions_robust?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<Array<{ [key: string]: any; }>>}
   * @memberof DetailsResponse
   */
  case_mda_full?: Array<Array<{ [key: string]: any }>>;
  /**
   *
   * @type {Array<Array<{ [key: string]: any; }>>}
   * @memberof DetailsResponse
   */
  case_mda_robust?: Array<Array<{ [key: string]: any }>>;
  /**
   *
   * @type {Array<Array<{ [key: string]: any; }>>}
   * @memberof DetailsResponse
   */
  case_contributions_full?: Array<Array<{ [key: string]: any }>>;
  /**
   *
   * @type {Array<Array<{ [key: string]: any; }>>}
   * @memberof DetailsResponse
   */
  case_contributions_robust?: Array<Array<{ [key: string]: any }>>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  case_feature_residuals_full?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  case_feature_residuals_robust?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  local_case_feature_residual_convictions_full?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  local_case_feature_residual_convictions_robust?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  global_case_feature_residual_convictions_full?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: number; }>}
   * @memberof DetailsResponse
   */
  global_case_feature_residual_convictions_robust?: Array<{ [key: string]: number }>;
  /**
   *
   * @type {Array<{ [key: string]: any; }>}
   * @memberof DetailsResponse
   */
  hypothetical_values?: Array<{ [key: string]: any }>;
  /**
   *
   * @type {Array<number>}
   * @memberof DetailsResponse
   */
  distance_ratio?: Array<number>;
  /**
   *
   * @type {Array<DetailsResponseDistanceRatioPartsInner>}
   * @memberof DetailsResponse
   */
  distance_ratio_parts?: Array<DetailsResponseDistanceRatioPartsInner>;
  /**
   *
   * @type {Array<number>}
   * @memberof DetailsResponse
   */
  distance_contribution?: Array<number>;
  /**
   *
   * @type {Array<number>}
   * @memberof DetailsResponse
   */
  similarity_conviction?: Array<number>;
  /**
   *
   * @type {Array<Array<{ [key: string]: any; }>>}
   * @memberof DetailsResponse
   */
  most_similar_case_indices?: Array<Array<{ [key: string]: any }>>;
  /**
   *
   * @type {Array<number>}
   * @memberof DetailsResponse
   */
  generate_attempts?: Array<number>;
  /**
   *
   * @type {Array<Array<number>>}
   * @memberof DetailsResponse
   */
  series_generate_attempts?: Array<Array<number>>;
}

/**
 * Check if a given object implements the DetailsResponse interface.
 */
export function instanceOfDetailsResponse(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function DetailsResponseFromJSON(json: any): DetailsResponse {
  return DetailsResponseFromJSONTyped(json, false);
}

export function DetailsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): DetailsResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    boundary_cases: !exists(json, "boundary_cases") ? undefined : json["boundary_cases"],
    categorical_action_probabilities: !exists(json, "categorical_action_probabilities")
      ? undefined
      : json["categorical_action_probabilities"],
    derivation_parameters: !exists(json, "derivation_parameters")
      ? undefined
      : (json["derivation_parameters"] as Array<any>).map(DerivationParametersFromJSON),
    feature_residuals_full: !exists(json, "feature_residuals_full") ? undefined : json["feature_residuals_full"],
    feature_residuals_robust: !exists(json, "feature_residuals_robust") ? undefined : json["feature_residuals_robust"],
    prediction_stats: !exists(json, "prediction_stats") ? undefined : json["prediction_stats"],
    outlying_feature_values: !exists(json, "outlying_feature_values") ? undefined : json["outlying_feature_values"],
    influential_cases: !exists(json, "influential_cases") ? undefined : json["influential_cases"],
    most_similar_cases: !exists(json, "most_similar_cases") ? undefined : json["most_similar_cases"],
    observational_errors: !exists(json, "observational_errors") ? undefined : json["observational_errors"],
    feature_mda_full: !exists(json, "feature_mda_full") ? undefined : json["feature_mda_full"],
    feature_mda_robust: !exists(json, "feature_mda_robust") ? undefined : json["feature_mda_robust"],
    feature_mda_ex_post_full: !exists(json, "feature_mda_ex_post_full") ? undefined : json["feature_mda_ex_post_full"],
    feature_mda_ex_post_robust: !exists(json, "feature_mda_ex_post_robust")
      ? undefined
      : json["feature_mda_ex_post_robust"],
    directional_feature_contributions_full: !exists(json, "directional_feature_contributions_full")
      ? undefined
      : json["directional_feature_contributions_full"],
    directional_feature_contributions_robust: !exists(json, "directional_feature_contributions_robust")
      ? undefined
      : json["directional_feature_contributions_robust"],
    feature_contributions_full: !exists(json, "feature_contributions_full")
      ? undefined
      : json["feature_contributions_full"],
    feature_contributions_robust: !exists(json, "feature_contributions_robust")
      ? undefined
      : json["feature_contributions_robust"],
    case_directional_feature_contributions_full: !exists(json, "case_directional_feature_contributions_full")
      ? undefined
      : json["case_directional_feature_contributions_full"],
    case_directional_feature_contributions_robust: !exists(json, "case_directional_feature_contributions_robust")
      ? undefined
      : json["case_directional_feature_contributions_robust"],
    case_feature_contributions_full: !exists(json, "case_feature_contributions_full")
      ? undefined
      : json["case_feature_contributions_full"],
    case_feature_contributions_robust: !exists(json, "case_feature_contributions_robust")
      ? undefined
      : json["case_feature_contributions_robust"],
    case_mda_full: !exists(json, "case_mda_full") ? undefined : json["case_mda_full"],
    case_mda_robust: !exists(json, "case_mda_robust") ? undefined : json["case_mda_robust"],
    case_contributions_full: !exists(json, "case_contributions_full") ? undefined : json["case_contributions_full"],
    case_contributions_robust: !exists(json, "case_contributions_robust")
      ? undefined
      : json["case_contributions_robust"],
    case_feature_residuals_full: !exists(json, "case_feature_residuals_full")
      ? undefined
      : json["case_feature_residuals_full"],
    case_feature_residuals_robust: !exists(json, "case_feature_residuals_robust")
      ? undefined
      : json["case_feature_residuals_robust"],
    local_case_feature_residual_convictions_full: !exists(json, "local_case_feature_residual_convictions_full")
      ? undefined
      : json["local_case_feature_residual_convictions_full"],
    local_case_feature_residual_convictions_robust: !exists(json, "local_case_feature_residual_convictions_robust")
      ? undefined
      : json["local_case_feature_residual_convictions_robust"],
    global_case_feature_residual_convictions_full: !exists(json, "global_case_feature_residual_convictions_full")
      ? undefined
      : json["global_case_feature_residual_convictions_full"],
    global_case_feature_residual_convictions_robust: !exists(json, "global_case_feature_residual_convictions_robust")
      ? undefined
      : json["global_case_feature_residual_convictions_robust"],
    hypothetical_values: !exists(json, "hypothetical_values") ? undefined : json["hypothetical_values"],
    distance_ratio: !exists(json, "distance_ratio") ? undefined : json["distance_ratio"],
    distance_ratio_parts: !exists(json, "distance_ratio_parts")
      ? undefined
      : (json["distance_ratio_parts"] as Array<any>).map(DetailsResponseDistanceRatioPartsInnerFromJSON),
    distance_contribution: !exists(json, "distance_contribution") ? undefined : json["distance_contribution"],
    similarity_conviction: !exists(json, "similarity_conviction") ? undefined : json["similarity_conviction"],
    most_similar_case_indices: !exists(json, "most_similar_case_indices")
      ? undefined
      : json["most_similar_case_indices"],
    generate_attempts: !exists(json, "generate_attempts") ? undefined : json["generate_attempts"],
    series_generate_attempts: !exists(json, "series_generate_attempts") ? undefined : json["series_generate_attempts"],
  };
}

export function DetailsResponseToJSON(value?: DetailsResponse | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    boundary_cases: value.boundary_cases,
    categorical_action_probabilities: value.categorical_action_probabilities,
    derivation_parameters:
      value.derivation_parameters === undefined
        ? undefined
        : (value.derivation_parameters as Array<any>).map(DerivationParametersToJSON),
    feature_residuals_full: value.feature_residuals_full,
    feature_residuals_robust: value.feature_residuals_robust,
    prediction_stats: value.prediction_stats,
    outlying_feature_values: value.outlying_feature_values,
    influential_cases: value.influential_cases,
    most_similar_cases: value.most_similar_cases,
    observational_errors: value.observational_errors,
    feature_mda_full: value.feature_mda_full,
    feature_mda_robust: value.feature_mda_robust,
    feature_mda_ex_post_full: value.feature_mda_ex_post_full,
    feature_mda_ex_post_robust: value.feature_mda_ex_post_robust,
    directional_feature_contributions_full: value.directional_feature_contributions_full,
    directional_feature_contributions_robust: value.directional_feature_contributions_robust,
    feature_contributions_full: value.feature_contributions_full,
    feature_contributions_robust: value.feature_contributions_robust,
    case_directional_feature_contributions_full: value.case_directional_feature_contributions_full,
    case_directional_feature_contributions_robust: value.case_directional_feature_contributions_robust,
    case_feature_contributions_full: value.case_feature_contributions_full,
    case_feature_contributions_robust: value.case_feature_contributions_robust,
    case_mda_full: value.case_mda_full,
    case_mda_robust: value.case_mda_robust,
    case_contributions_full: value.case_contributions_full,
    case_contributions_robust: value.case_contributions_robust,
    case_feature_residuals_full: value.case_feature_residuals_full,
    case_feature_residuals_robust: value.case_feature_residuals_robust,
    local_case_feature_residual_convictions_full: value.local_case_feature_residual_convictions_full,
    local_case_feature_residual_convictions_robust: value.local_case_feature_residual_convictions_robust,
    global_case_feature_residual_convictions_full: value.global_case_feature_residual_convictions_full,
    global_case_feature_residual_convictions_robust: value.global_case_feature_residual_convictions_robust,
    hypothetical_values: value.hypothetical_values,
    distance_ratio: value.distance_ratio,
    distance_ratio_parts:
      value.distance_ratio_parts === undefined
        ? undefined
        : (value.distance_ratio_parts as Array<any>).map(DetailsResponseDistanceRatioPartsInnerToJSON),
    distance_contribution: value.distance_contribution,
    similarity_conviction: value.similarity_conviction,
    most_similar_case_indices: value.most_similar_case_indices,
    generate_attempts: value.generate_attempts,
    series_generate_attempts: value.series_generate_attempts,
  };
}
