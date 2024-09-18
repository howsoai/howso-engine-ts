/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 *
 * @export
 * @interface RandomSeedRequest
 */
export interface RandomSeedRequest {
  /**
   * The random seed string.
   * @type {string}
   * @memberof RandomSeedRequest
   */
  seed?: string | null;
}

/**
 * Check if a given object implements the RandomSeedRequest interface.
 */
export function instanceOfRandomSeedRequest(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function RandomSeedRequestFromJSON(json: any): RandomSeedRequest {
  return RandomSeedRequestFromJSONTyped(json, false);
}

export function RandomSeedRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): RandomSeedRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    seed: !exists(json, "seed") ? undefined : json["seed"],
  };
}

export function RandomSeedRequestToJSON(value?: RandomSeedRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    seed: value.seed,
  };
}
