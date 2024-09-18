/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists, mapValues } from "../runtime";
import type { FeatureAttributes } from "./FeatureAttributes";
import { FeatureAttributesFromJSON, FeatureAttributesToJSON } from "./FeatureAttributes";

/**
 *
 * @export
 * @interface TraineeRequest
 */
export interface TraineeRequest {
  /**
   *
   * @type {string}
   * @memberof TraineeRequest
   */
  name?: string | null;
  /**
   *
   * @type {{ [key: string]: FeatureAttributes; }}
   * @memberof TraineeRequest
   */
  features: { [key: string]: FeatureAttributes };
  /**
   * If allow, the trainee may be manually persisted and will be persisted automatically only when unloaded. If always, the trainee will be automatically persisted whenever it is updated. If never, the trainee will never be persisted and any requests to explicitly persist it will fail.
   * @type {string}
   * @memberof TraineeRequest
   */
  persistence?: TraineeRequestPersistenceEnum;
  /**
   *
   * @type {string}
   * @memberof TraineeRequest
   */
  project_id?: string;
  /**
   *
   * @type {string}
   * @memberof TraineeRequest
   */
  id?: string;
  /**
   * Metadata for a trainee. User can specify any key-value pair to store custom metadata for a trainee.
   * @type {{ [key: string]: any; }}
   * @memberof TraineeRequest
   */
  metadata?: { [key: string]: any };
}

/**
 * @export
 * @enum {string}
 */
export type TraineeRequestPersistenceEnum = "allow" | "always" | "never";

/**
 * Check if a given object implements the TraineeRequest interface.
 */
export function instanceOfTraineeRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "features" in value;

  return isInstance;
}

export function TraineeRequestFromJSON(json: any): TraineeRequest {
  return TraineeRequestFromJSONTyped(json, false);
}

export function TraineeRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): TraineeRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    name: !exists(json, "name") ? undefined : json["name"],
    features: mapValues(json["features"], FeatureAttributesFromJSON),
    persistence: !exists(json, "persistence") ? undefined : json["persistence"],
    project_id: !exists(json, "project_id") ? undefined : json["project_id"],
    id: !exists(json, "id") ? undefined : json["id"],
    metadata: !exists(json, "metadata") ? undefined : json["metadata"],
  };
}

export function TraineeRequestToJSON(value?: TraineeRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    name: value.name,
    features: mapValues(value.features, FeatureAttributesToJSON),
    persistence: value.persistence,
    project_id: value.project_id,
    id: value.id,
    metadata: value.metadata,
  };
}
