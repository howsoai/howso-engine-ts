/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * Time series options for a feature.
 * @export
 * @interface FeatureTimeSeries
 */
export interface FeatureTimeSeries {
  /**
   * When `rate` is specified, uses the difference of the current value from its previous value divided by the change in time since the previous value. When `delta` is specified, uses the difference of the current value from its previous value regardless of the elapsed time. Set to `delta` if feature has `time_feature` set to true.
   * @type {string}
   * @memberof FeatureTimeSeries
   */
  type: FeatureTimeSeriesTypeEnum;
  /**
   * If provided, will generate the specified number of derivatives and boundary values.
   * @type {number}
   * @memberof FeatureTimeSeries
   */
  order?: number;
  /**
   * The number of orders of derivatives that should be derived instead of synthesized. Ignored if order is not provided.
   * @type {number}
   * @memberof FeatureTimeSeries
   */
  derived_orders?: number;
  /**
   * If specified, ensures that the smallest difference between features values is not smaller than this specified value. A null value means no min boundary. The length of the list must match the number of derivatives as specified by `order`. Only applicable when time series type is set to `delta`.
   * @type {Array<number>}
   * @memberof FeatureTimeSeries
   */
  delta_min?: Array<number>;
  /**
   * If specified, ensures that the largest difference between feature values is not larger than this specified value. A null value means no max boundary. The length of the list must match the number of derivatives as specified by `order`. Only applicable when time series type is set to `delta`.
   * @type {Array<number>}
   * @memberof FeatureTimeSeries
   */
  delta_max?: Array<number>;
  /**
   * If specified, generates lag features containing previous values using the enumerated lag offsets. Takes precedence over `num_lags`. If neither `num_lags` nor `lags` is specified for a feature, then a single lag feature is generated.
   * @type {Array<number>}
   * @memberof FeatureTimeSeries
   */
  lags?: Array<number>;
  /**
   * If specified, generates the specified amount of lag features containing previous values. If `lags` is specified, then this parameter will be ignored. If neither `num_lags` nor `lags` is specified for a feature, then a single lag feature is generated.
   * @type {number}
   * @memberof FeatureTimeSeries
   */
  num_lags?: number;
  /**
   * If specified, ensures that the rate (the difference quotient, the discrete version of derivative) for this feature won't be less than the value provided. A null value means no min boundary. The value must be in epoch format for the time feature. The length of the list must match the number of derivatives as specified by `order`. Only applicable when time series type is set to `rate`.
   * @type {Array<number>}
   * @memberof FeatureTimeSeries
   */
  rate_min?: Array<number>;
  /**
   * If specified, ensures that the rate (the difference quotient, the discrete version of derivative) for this feature won't be more than the value provided. A null value means no max boundary. The value must be in epoch format for the time feature. The length of the list must match the number of derivatives as specified by `order`. Only applicable when time series type is set to `rate`.
   * @type {Array<number>}
   * @memberof FeatureTimeSeries
   */
  rate_max?: Array<number>;
  /**
   * When true, requires that the model identify and learn values that explicitly denote the end of a series. Only applicable to id features for a series.
   * @type {boolean}
   * @memberof FeatureTimeSeries
   */
  series_has_terminators?: boolean;
  /**
   * When true, requires that a series ends on a terminator value. Only applicable to id features for a series.
   * @type {boolean}
   * @memberof FeatureTimeSeries
   */
  stop_on_terminator?: boolean;
  /**
   * When true, the feature will be treated as the time feature for time series modeling. Additionally, time features must use type `delta`.
   * @type {boolean}
   * @memberof FeatureTimeSeries
   */
  time_feature?: boolean;
  /**
   * Controls whether future values of independent time series are considered. Applicable only to the time feature. When false, the time feature is not universal and allows using future data from other series in decisions; this is applicable when the time is not globally relevant and is independent for each time series. When true, universally excludes using any data with from the future from all series; this is applicable when time is globally relevant and there are events that may affect all time series. If there is any possibility of global relevancy of time, it is generally recommended to set this value to true, which is the default.
   * @type {boolean}
   * @memberof FeatureTimeSeries
   */
  universal?: boolean;
}

/**
 * @export
 * @enum {string}
 */
export type FeatureTimeSeriesTypeEnum = "rate" | "delta";

/**
 * Check if a given object implements the FeatureTimeSeries interface.
 */
export function instanceOfFeatureTimeSeries(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "type" in value;

  return isInstance;
}

export function FeatureTimeSeriesFromJSON(json: any): FeatureTimeSeries {
  return FeatureTimeSeriesFromJSONTyped(json, false);
}

export function FeatureTimeSeriesFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureTimeSeries {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    type: json["type"],
    order: !exists(json, "order") ? undefined : json["order"],
    derived_orders: !exists(json, "derived_orders") ? undefined : json["derived_orders"],
    delta_min: !exists(json, "delta_min") ? undefined : json["delta_min"],
    delta_max: !exists(json, "delta_max") ? undefined : json["delta_max"],
    lags: !exists(json, "lags") ? undefined : json["lags"],
    num_lags: !exists(json, "num_lags") ? undefined : json["num_lags"],
    rate_min: !exists(json, "rate_min") ? undefined : json["rate_min"],
    rate_max: !exists(json, "rate_max") ? undefined : json["rate_max"],
    series_has_terminators: !exists(json, "series_has_terminators") ? undefined : json["series_has_terminators"],
    stop_on_terminator: !exists(json, "stop_on_terminator") ? undefined : json["stop_on_terminator"],
    time_feature: !exists(json, "time_feature") ? undefined : json["time_feature"],
    universal: !exists(json, "universal") ? undefined : json["universal"],
  };
}

export function FeatureTimeSeriesToJSON(value?: FeatureTimeSeries | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    type: value.type,
    order: value.order,
    derived_orders: value.derived_orders,
    delta_min: value.delta_min,
    delta_max: value.delta_max,
    lags: value.lags,
    num_lags: value.num_lags,
    rate_min: value.rate_min,
    rate_max: value.rate_max,
    series_has_terminators: value.series_has_terminators,
    stop_on_terminator: value.stop_on_terminator,
    time_feature: value.time_feature,
    universal: value.universal,
  };
}
