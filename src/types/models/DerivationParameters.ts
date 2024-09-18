/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface DerivationParameters
 */
export interface DerivationParameters {
  /**
   * The number of cases used for the local model.
   * @type {number}
   * @memberof DerivationParameters
   */
  k?: number;
  /**
   * The parameter for the Lebesgue space.
   * @type {number}
   * @memberof DerivationParameters
   */
  p?: number;
  /**
   * The value used as an exponent to convert distances to raw influence weights.
   * @type {number}
   * @memberof DerivationParameters
   */
  distance_transform?: number;
  /**
   * The weights for each feature used in the distance metric.
   * @type {{ [key: string]: number; }}
   * @memberof DerivationParameters
   */
  feature_weights?: { [key: string]: number };
  /**
   * The deviations for each feature used in the distance metric.
   * @type {{ [key: string]: number; }}
   * @memberof DerivationParameters
   */
  feature_deviations?: { [key: string]: number };
  /**
   * The number of unique values for each nominal feature.
   * @type {{ [key: string]: number; }}
   * @memberof DerivationParameters
   */
  nominal_class_counts?: { [key: string]: number };
  /**
   * A flag indicating if feature weights were derived using inverse residual weighting.
   * @type {boolean}
   * @memberof DerivationParameters
   */
  use_irw?: boolean;
}

/**
 * Check if a given object implements the DerivationParameters interface.
 */
export function instanceOfDerivationParameters(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function DerivationParametersFromJSON(json: any): DerivationParameters {
  return DerivationParametersFromJSONTyped(json, false);
}

export function DerivationParametersFromJSONTyped(json: any, ignoreDiscriminator: boolean): DerivationParameters {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    k: !exists(json, "k") ? undefined : json["k"],
    p: !exists(json, "p") ? undefined : json["p"],
    distance_transform: !exists(json, "distance_transform") ? undefined : json["distance_transform"],
    feature_weights: !exists(json, "feature_weights") ? undefined : json["feature_weights"],
    feature_deviations: !exists(json, "feature_deviations") ? undefined : json["feature_deviations"],
    nominal_class_counts: !exists(json, "nominal_class_counts") ? undefined : json["nominal_class_counts"],
    use_irw: !exists(json, "use_irw") ? undefined : json["use_irw"],
  };
}

export function DerivationParametersToJSON(value?: DerivationParameters | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    k: value.k,
    p: value.p,
    distance_transform: value.distance_transform,
    feature_weights: value.feature_weights,
    feature_deviations: value.feature_deviations,
    nominal_class_counts: value.nominal_class_counts,
    use_irw: value.use_irw,
  };
}
