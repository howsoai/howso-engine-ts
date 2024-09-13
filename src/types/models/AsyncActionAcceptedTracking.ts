/**
 * Howso API
 * OpenAPI implementation for interacting with the Howso API. 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists } from '../runtime';
/**
 * 
 * @export
 * @interface AsyncActionAcceptedTracking
 */
export interface AsyncActionAcceptedTracking {
    /**
     * The url to track the status of the action.
     * @type {string}
     * @memberof AsyncActionAcceptedTracking
     */
    url?: string;
}

/**
 * Check if a given object implements the AsyncActionAcceptedTracking interface.
 */
export function instanceOfAsyncActionAcceptedTracking(value: object): boolean {
    const isInstance = true;

    return isInstance;
}

export function AsyncActionAcceptedTrackingFromJSON(json: any): AsyncActionAcceptedTracking {
    return AsyncActionAcceptedTrackingFromJSONTyped(json, false);
}

export function AsyncActionAcceptedTrackingFromJSONTyped(json: any, ignoreDiscriminator: boolean): AsyncActionAcceptedTracking {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'url': !exists(json, 'url') ? undefined : json['url'],
    };
}

export function AsyncActionAcceptedTrackingToJSON(value?: AsyncActionAcceptedTracking | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'url': value.url,
    };
}

