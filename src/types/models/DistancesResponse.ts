/* eslint-disable @typescript-eslint/no-unused-vars */

import { exists } from "../runtime";
/**
 * The body of the distances metric response.
 * @export
 * @interface DistancesResponse
 */
export interface DistancesResponse {
  /**
   * The list of case identifiers corresponding to the distances matrix rows. List of tuples, of session id and
   * index, where index is the original 0-based index of the case as it was trained into the session.
   * @type {Array<Array<any>>}
   * @memberof DistancesResponse
   */
  row_case_indices?: Array<Array<any>>;
  /**
   * The list of case identifiers corresponding to the distances matrix columns. List of tuples, of session id and
   * index, where index is the original 0-based index of the case as it was trained into the session.
   * @type {Array<Array<any>>}
   * @memberof DistancesResponse
   */
  column_case_indices?: Array<Array<any>>;
  /**
   * The distance values matrix.
   * @type {Array<Array<number>>}
   * @memberof DistancesResponse
   */
  distances?: Array<Array<number>>;
}

/**
 * Check if a given object implements the DistancesResponse interface.
 */
export function instanceOfDistancesResponse(value: object): boolean {
  const isInstance = true;

  return isInstance;
}

export function DistancesResponseFromJSON(json: any): DistancesResponse {
  return DistancesResponseFromJSONTyped(json, false);
}

export function DistancesResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): DistancesResponse {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    row_case_indices: !exists(json, "row_case_indices") ? undefined : json["row_case_indices"],
    column_case_indices: !exists(json, "column_case_indices") ? undefined : json["column_case_indices"],
    distances: !exists(json, "distances") ? undefined : json["distances"],
  };
}

export function DistancesResponseToJSON(value?: DistancesResponse | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    row_case_indices: value.row_case_indices,
    column_case_indices: value.column_case_indices,
    distances: value.distances,
  };
}
