/**
 * Howso API
 * OpenAPI implementation for interacting with the Howso API. 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  Account,
} from '../models';
import {
    AccountFromJSON,
} from '../models';

/**
 * 
 */
export class AccountApi extends runtime.BaseAPI {

    /**
     * Get details about your own account profile.
     * Get your account details.
     */
    async meRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<| Account>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth_ums", ["account:read"]);
        }

        const response = await this.request({
            path: `/v2/manage/accounts/me/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AccountFromJSON(jsonValue));
    }

    /**
     * Get details about your own account profile.
     * Get your account details.
     */
    async me(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<| Account> {
        const response = await this.meRaw(initOverrides);
        return await response.value();
    }

}
