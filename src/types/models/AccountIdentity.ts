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
 * @interface AccountIdentity
 */
export interface AccountIdentity {
    /**
     * The user's UUID.
     * @type {string}
     * @memberof AccountIdentity
     */
    uuid?: string;
    /**
     * The user's username.
     * @type {string}
     * @memberof AccountIdentity
     */
    username?: string;
    /**
     * The user's full name.
     * @type {string}
     * @memberof AccountIdentity
     */
    full_name?: string;
}

/**
 * Check if a given object implements the AccountIdentity interface.
 */
export function instanceOfAccountIdentity(value: object): boolean {
    const isInstance = true;

    return isInstance;
}

export function AccountIdentityFromJSON(json: any): AccountIdentity {
    return AccountIdentityFromJSONTyped(json, false);
}

export function AccountIdentityFromJSONTyped(json: any, ignoreDiscriminator: boolean): AccountIdentity {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'uuid': !exists(json, 'uuid') ? undefined : json['uuid'],
        'username': !exists(json, 'username') ? undefined : json['username'],
        'full_name': !exists(json, 'full_name') ? undefined : json['full_name'],
    };
}

export function AccountIdentityToJSON(value?: AccountIdentity | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'uuid': value.uuid,
        'username': value.username,
        'full_name': value.full_name,
    };
}

