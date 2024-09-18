/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists, mapValues } from "../runtime";
import type { MarginalStats } from "./MarginalStats";
import { MarginalStatsFromJSON, MarginalStatsToJSON } from "./MarginalStats";
import type { Warning } from "./Warning";
import { WarningFromJSON, WarningToJSON } from "./Warning";

/**
 * The response body of get_marginal_stats
 * @export
 * @interface FeatureMarginalStats
 */
export interface FeatureMarginalStats {
  /**
   *
   * @type {Array<Warning>}
   * @memberof FeatureMarginalStats
   */
  warnings?: Array<Warning>;
  /**
   *
   * @type {{ [key: string]: MarginalStats; }}
   * @memberof FeatureMarginalStats
   */
  content?: { [key: string]: MarginalStats };
}

/**
 * Check if a given object implements the FeatureMarginalStats interface.
 */
export function instanceOfFeatureMarginalStats(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function FeatureMarginalStatsFromJSON(json: any): FeatureMarginalStats {
  return FeatureMarginalStatsFromJSONTyped(json, false);
}

export function FeatureMarginalStatsFromJSONTyped(json: any, ignoreDiscriminator: boolean): FeatureMarginalStats {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    warnings: !exists(json, "warnings") ? undefined : (json["warnings"] as Array<any>).map(WarningFromJSON),
    content: !exists(json, "content") ? undefined : mapValues(json["content"], MarginalStatsFromJSON),
  };
}

export function FeatureMarginalStatsToJSON(value?: FeatureMarginalStats | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    warnings: value.warnings === undefined ? undefined : (value.warnings as Array<any>).map(WarningToJSON),
    content: value.content === undefined ? undefined : mapValues(value.content, MarginalStatsToJSON),
  };
}
