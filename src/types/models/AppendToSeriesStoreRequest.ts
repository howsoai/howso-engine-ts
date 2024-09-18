/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * The body of an append to series store request.
 * @export
 * @interface AppendToSeriesStoreRequest
 */
export interface AppendToSeriesStoreRequest {
  /**
   * The name of the series store to append to.
   * @type {string}
   * @memberof AppendToSeriesStoreRequest
   */
  series: string;
  /**
   * A 2D array of context values.
   * @type {Array<Array<any>>}
   * @memberof AppendToSeriesStoreRequest
   */
  contexts: Array<Array<any>>;
  /**
   * The context feature names.
   * @type {Array<string>}
   * @memberof AppendToSeriesStoreRequest
   */
  context_features: Array<string>;
}

/**
 * Check if a given object implements the AppendToSeriesStoreRequest interface.
 */
export function instanceOfAppendToSeriesStoreRequest(value: object): boolean {
  let isInstance = true;
  isInstance = isInstance && "series" in value;
  isInstance = isInstance && "contexts" in value;
  isInstance = isInstance && "context_features" in value;

  return isInstance;
}

export function AppendToSeriesStoreRequestFromJSON(json: any): AppendToSeriesStoreRequest {
  return AppendToSeriesStoreRequestFromJSONTyped(json, false);
}

export function AppendToSeriesStoreRequestFromJSONTyped(
  json: any,
  ignoreDiscriminator: boolean,
): AppendToSeriesStoreRequest {
  if (json === undefined || json === null) {
    return json;
  }
  return {
    series: json["series"],
    contexts: json["contexts"],
    context_features: json["context_features"],
  };
}

export function AppendToSeriesStoreRequestToJSON(value?: AppendToSeriesStoreRequest | null): any {
  if (value === undefined) {
    return undefined;
  }
  if (value === null) {
    return null;
  }
  return {
    series: value.series,
    contexts: value.contexts,
    context_features: value.context_features,
  };
}
