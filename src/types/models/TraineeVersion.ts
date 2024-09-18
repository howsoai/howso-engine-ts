/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * Trainee version information.
 * @export
 * @interface TraineeVersion
 */
export interface TraineeVersion {
  /**
   * The trainee's platform container version.
   * @type {string}
   * @memberof TraineeVersion
   */
  container?: string;
  /**
   * The version of the Trainee.
   * @type {string}
   * @memberof TraineeVersion
   */
  trainee?: string;
  /**
   * The version of the loaded Amalgam library.
   * @type {string}
   * @memberof TraineeVersion
   */
  amalgam?: string;
}

/**
 * Check if a given object implements the TraineeVersion interface.
 */
export function instanceOfTraineeVersion(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function TraineeVersionFromJSON(json: any): TraineeVersion {
  return TraineeVersionFromJSONTyped(json, false);
}

export function TraineeVersionFromJSONTyped(json: any, ignoreDiscriminator: boolean): TraineeVersion {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    container: !exists(json, "container") ? undefined : json["container"],
    trainee: !exists(json, "trainee") ? undefined : json["trainee"],
    amalgam: !exists(json, "amalgam") ? undefined : json["amalgam"],
  };
}

export function TraineeVersionToJSON(value?: TraineeVersion | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    container: value.container,
    trainee: value.trainee,
    amalgam: value.amalgam,
  };
}
