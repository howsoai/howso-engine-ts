/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface Metrics
 */
export interface Metrics {
  /**
   * The current cpu usage of the trainee container includes units (usually nano-cpus)
   * @type {string}
   * @memberof Metrics
   */
  cpu?: string | null;
  /**
   * The current memory usage of the trainee container includes units (usually Kilobytes)
   * @type {string}
   * @memberof Metrics
   */
  memory?: string | null;
}

/**
 * Check if a given object implements the Metrics interface.
 */
export function instanceOfMetrics(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function MetricsFromJSON(json: any): Metrics {
  return MetricsFromJSONTyped(json, false);
}

export function MetricsFromJSONTyped(json: any, ignoreDiscriminator: boolean): Metrics {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    cpu: !exists(json, "cpu") ? undefined : json["cpu"],
    memory: !exists(json, "memory") ? undefined : json["memory"],
  };
}

export function MetricsToJSON(value?: Metrics | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    cpu: value.cpu,
    memory: value.memory,
  };
}
