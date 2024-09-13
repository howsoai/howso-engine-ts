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
  AsyncActionAccepted,
  Cases,
  ExtremeCasesRequest,
  FeatureAddRequest,
  FeatureAttributes,
  FeatureConviction,
  FeatureConvictionRequest,
  FeatureMarginalStats,
  FeatureMarginalStatsRequest,
  FeatureRemoveRequest,
} from '../models';
import {
    AsyncActionAcceptedFromJSON,
    CasesFromJSON,
    ExtremeCasesRequestToJSON,
    FeatureAddRequestToJSON,
    FeatureAttributesFromJSON,
    FeatureConvictionFromJSON,
    FeatureConvictionRequestToJSON,
    FeatureMarginalStatsFromJSON,
    FeatureMarginalStatsRequestToJSON,
    FeatureRemoveRequestToJSON,
} from '../models';

export interface AddFeatureRequest {
    trainee_id: string;
    FeatureAddRequest: FeatureAddRequest;
}

export interface GetExtremeCasesRequest {
    trainee_id: string;
    ExtremeCasesRequest: ExtremeCasesRequest;
}

export interface GetFeatureAttributesRequest {
    trainee_id: string;
}

export interface GetFeatureConvictionRequest {
    trainee_id: string;
    FeatureConvictionRequest: FeatureConvictionRequest;
}

export interface GetMarginalStatsRequest {
    trainee_id: string;
    FeatureMarginalStatsRequest: FeatureMarginalStatsRequest;
}

export interface GetSubstitutionMapRequest {
    trainee_id: string;
}

export interface RemoveFeatureRequest {
    trainee_id: string;
    FeatureRemoveRequest: FeatureRemoveRequest;
}

export interface SetFeatureAttributesRequest {
    trainee_id: string;
    request_body: { [key: string]: FeatureAttributes; };
}

export interface SetSubstitutionMapRequest {
    trainee_id: string;
    request_body: { [key: string]: any; };
}

/**
 * 
 */
export class TraineeFeatureOperationsApi extends runtime.BaseAPI {

    /**
     * Add a feature to a trainee or overwrite a feature.
     * Add a feature to a trainee.
     */
    async addFeatureRaw(requestParameters: AddFeatureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.trainee_id === null || requestParameters.trainee_id === undefined) {
            throw new runtime.RequiredError('trainee_id','Required parameter requestParameters.trainee_id was null or undefined when calling addFeature.');
        }

        if (requestParameters.FeatureAddRequest === null || requestParameters.FeatureAddRequest === undefined) {
            throw new runtime.RequiredError('FeatureAddRequest','Required parameter requestParameters.FeatureAddRequest was null or undefined when calling addFeature.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth_ums", ["trainee:write", "trainee:execute"]);
        }

        const response = await this.request({
            path: `/v2/trainee/{trainee_id}/feature/add`.replace(`{${"trainee_id"}}`, encodeURIComponent(String(requestParameters.trainee_id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: FeatureAddRequestToJSON(requestParameters.FeatureAddRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Add a feature to a trainee or overwrite a feature.
     * Add a feature to a trainee.
     */
    async addFeature(trainee_id: string, FeatureAddRequest: FeatureAddRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.addFeatureRaw({ trainee_id: trainee_id, FeatureAddRequest: FeatureAddRequest }, initOverrides);
    }

    /**
     * Retrieve the top or bottom number of cases for specified features, sorted top to bottom for top, and bottom to top for bottom. 
     * Get extreme top or bottom cases for specified feature(s) from a trainee
     */
    async getExtremeCasesRaw(requestParameters: GetExtremeCasesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<| Cases>> {
        if (requestParameters.trainee_id === null || requestParameters.trainee_id === undefined) {
            throw new runtime.RequiredError('trainee_id','Required parameter requestParameters.trainee_id was null or undefined when calling getExtremeCases.');
        }

        if (requestParameters.ExtremeCasesRequest === null || requestParameters.ExtremeCasesRequest === undefined) {
            throw new runtime.RequiredError('ExtremeCasesRequest','Required parameter requestParameters.ExtremeCasesRequest was null or undefined when calling getExtremeCases.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth_ums", ["trainee:read", "trainee:execute"]);
        }

        const response = await this.request({
            path: `/v2/trainee/{trainee_id}/cases/extreme`.replace(`{${"trainee_id"}}`, encodeURIComponent(String(requestParameters.trainee_id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: ExtremeCasesRequestToJSON(requestParameters.ExtremeCasesRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CasesFromJSON(jsonValue));
    }

    /**
     * Retrieve the top or bottom number of cases for specified features, sorted top to bottom for top, and bottom to top for bottom. 
     * Get extreme top or bottom cases for specified feature(s) from a trainee
     */
    async getExtremeCases(trainee_id: string, ExtremeCasesRequest: ExtremeCasesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<| Cases> {
        const response = await this.getExtremeCasesRaw({ trainee_id: trainee_id, ExtremeCasesRequest: ExtremeCasesRequest }, initOverrides);
        return await response.value();
    }

    /**
     * Get feature attributes for given trainee.
     * Get trainee feature attributes
     */
    async getFeatureAttributesRaw(requestParameters: GetFeatureAttributesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<| { [key: string]: FeatureAttributes; }>> {
        if (requestParameters.trainee_id === null || requestParameters.trainee_id === undefined) {
            throw new runtime.RequiredError('trainee_id','Required parameter requestParameters.trainee_id was null or undefined when calling getFeatureAttributes.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth_ums", ["trainee:read"]);
        }

        const response = await this.request({
            path: `/v2/trainee/{trainee_id}/feature/attributes`.replace(`{${"trainee_id"}}`, encodeURIComponent(String(requestParameters.trainee_id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => runtime.mapValues(jsonValue, FeatureAttributesFromJSON));
    }

    /**
     * Get feature attributes for given trainee.
     * Get trainee feature attributes
     */
    async getFeatureAttributes(trainee_id: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<| { [key: string]: FeatureAttributes; }> {
        const response = await this.getFeatureAttributesRaw({ trainee_id: trainee_id }, initOverrides);
        return await response.value();
    }

    /**
     * Retrieve the familiarity and/or prediction conviction for features in the model.
     * Retrieve conviction for features in the model.
     */
    async getFeatureConvictionRaw(requestParameters: GetFeatureConvictionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<| FeatureConviction| AsyncActionAccepted>> {
        if (requestParameters.trainee_id === null || requestParameters.trainee_id === undefined) {
            throw new runtime.RequiredError('trainee_id','Required parameter requestParameters.trainee_id was null or undefined when calling getFeatureConviction.');
        }

        if (requestParameters.FeatureConvictionRequest === null || requestParameters.FeatureConvictionRequest === undefined) {
            throw new runtime.RequiredError('FeatureConvictionRequest','Required parameter requestParameters.FeatureConvictionRequest was null or undefined when calling getFeatureConviction.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth_ums", ["trainee:read", "trainee:execute"]);
        }

        const response = await this.request({
            path: `/v2/trainee/{trainee_id}/feature/conviction`.replace(`{${"trainee_id"}}`, encodeURIComponent(String(requestParameters.trainee_id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: FeatureConvictionRequestToJSON(requestParameters.FeatureConvictionRequest),
        }, initOverrides);

        if (response.status === 202) {
            return new runtime.JSONApiResponse(response, (jsonValue) => AsyncActionAcceptedFromJSON(jsonValue));
        }
        return new runtime.JSONApiResponse(response, (jsonValue) => FeatureConvictionFromJSON(jsonValue));
    }

    /**
     * Retrieve the familiarity and/or prediction conviction for features in the model.
     * Retrieve conviction for features in the model.
     */
    async getFeatureConviction(trainee_id: string, FeatureConvictionRequest: FeatureConvictionRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<| FeatureConviction| AsyncActionAccepted> {
        const response = await this.getFeatureConvictionRaw({ trainee_id: trainee_id, FeatureConvictionRequest: FeatureConvictionRequest }, initOverrides);
        return await response.value();
    }

    /**
     * Returns marginal stats (e.g., mean, max, mode, count) for all features.
     * Get marginal stats for features
     */
    async getMarginalStatsRaw(requestParameters: GetMarginalStatsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<| FeatureMarginalStats>> {
        if (requestParameters.trainee_id === null || requestParameters.trainee_id === undefined) {
            throw new runtime.RequiredError('trainee_id','Required parameter requestParameters.trainee_id was null or undefined when calling getMarginalStats.');
        }

        if (requestParameters.FeatureMarginalStatsRequest === null || requestParameters.FeatureMarginalStatsRequest === undefined) {
            throw new runtime.RequiredError('FeatureMarginalStatsRequest','Required parameter requestParameters.FeatureMarginalStatsRequest was null or undefined when calling getMarginalStats.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth_ums", ["trainee:read"]);
        }

        const response = await this.request({
            path: `/v2/trainee/{trainee_id}/feature/stats/marginal`.replace(`{${"trainee_id"}}`, encodeURIComponent(String(requestParameters.trainee_id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: FeatureMarginalStatsRequestToJSON(requestParameters.FeatureMarginalStatsRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => FeatureMarginalStatsFromJSON(jsonValue));
    }

    /**
     * Returns marginal stats (e.g., mean, max, mode, count) for all features.
     * Get marginal stats for features
     */
    async getMarginalStats(trainee_id: string, FeatureMarginalStatsRequest: FeatureMarginalStatsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<| FeatureMarginalStats> {
        const response = await this.getMarginalStatsRaw({ trainee_id: trainee_id, FeatureMarginalStatsRequest: FeatureMarginalStatsRequest }, initOverrides);
        return await response.value();
    }

    /**
     * Get the trainee\'s substitution map.
     */
    async getSubstitutionMapRaw(requestParameters: GetSubstitutionMapRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<| { [key: string]: any; }>> {
        if (requestParameters.trainee_id === null || requestParameters.trainee_id === undefined) {
            throw new runtime.RequiredError('trainee_id','Required parameter requestParameters.trainee_id was null or undefined when calling getSubstitutionMap.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth_ums", ["trainee:read"]);
        }

        const response = await this.request({
            path: `/v2/trainee/{trainee_id}/substitution-map`.replace(`{${"trainee_id"}}`, encodeURIComponent(String(requestParameters.trainee_id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse<any>(response);
    }

    /**
     * Get the trainee\'s substitution map.
     */
    async getSubstitutionMap(trainee_id: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<| { [key: string]: any; }> {
        const response = await this.getSubstitutionMapRaw({ trainee_id: trainee_id }, initOverrides);
        return await response.value();
    }

    /**
     * Remove a feature from a trainee.
     * Remove a feature from a trainee.
     */
    async removeFeatureRaw(requestParameters: RemoveFeatureRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.trainee_id === null || requestParameters.trainee_id === undefined) {
            throw new runtime.RequiredError('trainee_id','Required parameter requestParameters.trainee_id was null or undefined when calling removeFeature.');
        }

        if (requestParameters.FeatureRemoveRequest === null || requestParameters.FeatureRemoveRequest === undefined) {
            throw new runtime.RequiredError('FeatureRemoveRequest','Required parameter requestParameters.FeatureRemoveRequest was null or undefined when calling removeFeature.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth_ums", ["trainee:write", "trainee:execute"]);
        }

        const response = await this.request({
            path: `/v2/trainee/{trainee_id}/feature/remove`.replace(`{${"trainee_id"}}`, encodeURIComponent(String(requestParameters.trainee_id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: FeatureRemoveRequestToJSON(requestParameters.FeatureRemoveRequest),
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Remove a feature from a trainee.
     * Remove a feature from a trainee.
     */
    async removeFeature(trainee_id: string, FeatureRemoveRequest: FeatureRemoveRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.removeFeatureRaw({ trainee_id: trainee_id, FeatureRemoveRequest: FeatureRemoveRequest }, initOverrides);
    }

    /**
     * Set all feature attributes for given trainee.
     * Set all trainee feature attributes
     */
    async setFeatureAttributesRaw(requestParameters: SetFeatureAttributesRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<| { [key: string]: FeatureAttributes; }>> {
        if (requestParameters.trainee_id === null || requestParameters.trainee_id === undefined) {
            throw new runtime.RequiredError('trainee_id','Required parameter requestParameters.trainee_id was null or undefined when calling setFeatureAttributes.');
        }

        if (requestParameters.request_body === null || requestParameters.request_body === undefined) {
            throw new runtime.RequiredError('request_body','Required parameter requestParameters.request_body was null or undefined when calling setFeatureAttributes.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth_ums", ["trainee:write"]);
        }

        const response = await this.request({
            path: `/v2/trainee/{trainee_id}/feature/attributes`.replace(`{${"trainee_id"}}`, encodeURIComponent(String(requestParameters.trainee_id))),
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.request_body,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => runtime.mapValues(jsonValue, FeatureAttributesFromJSON));
    }

    /**
     * Set all feature attributes for given trainee.
     * Set all trainee feature attributes
     */
    async setFeatureAttributes(trainee_id: string, request_body: { [key: string]: FeatureAttributes; }, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<| { [key: string]: FeatureAttributes; }> {
        const response = await this.setFeatureAttributesRaw({ trainee_id: trainee_id, request_body: request_body }, initOverrides);
        return await response.value();
    }

    /**
     * Set the trainee\'s substitution map.
     */
    async setSubstitutionMapRaw(requestParameters: SetSubstitutionMapRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.trainee_id === null || requestParameters.trainee_id === undefined) {
            throw new runtime.RequiredError('trainee_id','Required parameter requestParameters.trainee_id was null or undefined when calling setSubstitutionMap.');
        }

        if (requestParameters.request_body === null || requestParameters.request_body === undefined) {
            throw new runtime.RequiredError('request_body','Required parameter requestParameters.request_body was null or undefined when calling setSubstitutionMap.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth_ums", ["trainee:write", "trainee:execute"]);
        }

        const response = await this.request({
            path: `/v2/trainee/{trainee_id}/substitution-map`.replace(`{${"trainee_id"}}`, encodeURIComponent(String(requestParameters.trainee_id))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: requestParameters.request_body,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     * Set the trainee\'s substitution map.
     */
    async setSubstitutionMap(trainee_id: string, request_body: { [key: string]: any; }, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.setSubstitutionMapRaw({ trainee_id: trainee_id, request_body: request_body }, initOverrides);
    }

}
