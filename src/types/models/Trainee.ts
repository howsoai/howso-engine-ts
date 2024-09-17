/**
 * Howso API
 * OpenAPI implementation for interacting with the Howso API.
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from "../runtime";
import type { FeatureAttributes } from "./FeatureAttributes";
import { FeatureAttributesFromJSON, FeatureAttributesToJSON } from "./FeatureAttributes";

/**
 *
 * @export
 * @interface Trainee
 */
export interface Trainee {
  /**
   *
   * @type {string}
   * @memberof Trainee
   */
  name?: string | null;
  /**
   *
   * @type {{ [key: string]: FeatureAttributes; }}
   * @memberof Trainee
   */
  features?: { [key: string]: FeatureAttributes };
  /**
   * If allow, the trainee may be manually persisted and will be persisted automatically only when unloaded. If always, the trainee will be automatically persisted whenever it is updated. If never, the trainee will never be persisted and any requests to explicitly persist it will fail.
   * @type {string}
   * @memberof Trainee
   */
  persistence?: TraineePersistenceEnum;
  /**
   *
   * @type {string}
   * @memberof Trainee
   */
  project_id?: string;
  /**
   *
   * @type {string}
   * @memberof Trainee
   */
  id: string;
  /**
   * Metadata for a trainee. User can specify any key-value pair to store custom metadata for a trainee.
   * @type {{ [key: string]: any; }}
   * @memberof Trainee
   */
  metadata?: { [key: string]: any };
}

/**
 * @export
 * @enum {string}
 */
export type TraineePersistenceEnum = "allow" | "always" | "never";

/**
 * Check if a given object implements the Trainee interface.
 */
export function instanceOfTrainee(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function TraineeFromJSON(json: any): Trainee {
  return TraineeFromJSONTyped(json, false);
}

export function TraineeFromJSONTyped(json: any, ignoreDiscriminator: boolean): Trainee {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: !exists(json, "name") ? undefined : json["name"],
    features: !exists(json, "features") ? undefined : mapValues(json["features"], FeatureAttributesFromJSON),
    persistence: !exists(json, "persistence") ? undefined : json["persistence"],
    project_id: !exists(json, "project_id") ? undefined : json["project_id"],
    id: !exists(json, "id") ? undefined : json["id"],
    metadata: !exists(json, "metadata") ? undefined : json["metadata"],
  };
}

export function TraineeToJSON(value?: Trainee | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    features: value.features === undefined ? undefined : mapValues(value.features, FeatureAttributesToJSON),
    persistence: value.persistence,
    project_id: value.project_id,
    id: value.id,
    metadata: value.metadata,
  };
}
