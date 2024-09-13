/**
 * Howso API
 * OpenAPI implementation for interacting with the Howso API.
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists } from "../runtime";
import type { TraineeVersion } from "./TraineeVersion";
import { TraineeVersionFromJSON, TraineeVersionToJSON } from "./TraineeVersion";

/**
 * Information about the trainee configuration.
 * @export
 * @interface TraineeInformation
 */
export interface TraineeInformation {
  /**
   * The library type of the trainee.
   * "st": trainee uses the single-threaded amalgam library.
   * "mt": trainee uses the multi-threaded amalgam library.
   * "openmp": trainee uses the open multiprocessing amalgam library.
   * @type {string}
   * @memberof TraineeInformation
   */
  library_type?: TraineeInformationLibraryTypeEnum;
  /**
   *
   * @type {TraineeVersion}
   * @memberof TraineeInformation
   */
  version?: TraineeVersion;
}

/**
 * @export
 * @enum {string}
 */
export type TraineeInformationLibraryTypeEnum = "st" | "mt" | "openmp";

/**
 * Check if a given object implements the TraineeInformation interface.
 */
export function instanceOfTraineeInformation(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function TraineeInformationFromJSON(json: any): TraineeInformation {
  return TraineeInformationFromJSONTyped(json, false);
}

export function TraineeInformationFromJSONTyped(json: any, ignoreDiscriminator: boolean): TraineeInformation {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    library_type: !exists(json, "library_type") ? undefined : json["library_type"],
    version: !exists(json, "version") ? undefined : TraineeVersionFromJSON(json["version"]),
  };
}

export function TraineeInformationToJSON(value?: TraineeInformation | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    library_type: value.library_type,
    version: TraineeVersionToJSON(value.version),
  };
}
