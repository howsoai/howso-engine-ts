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
  Metrics,
} from '../models';
import {
    MetricsFromJSON,
} from '../models';

export interface GetTraineeMetricsRequest {
    trainee_id: string;
}

/**
 * 
 */
export class TraineeStatusApi extends runtime.BaseAPI {

    /**
     * Retrieve the cpu & memory of the trainee - the value is collected by the configured kubernetes metrics server on a configurable frequency. 
     * Get the metrics of the trainee
     */
    async getTraineeMetricsRaw(requestParameters: GetTraineeMetricsRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<| Metrics>> {
        if (requestParameters.trainee_id === null || requestParameters.trainee_id === undefined) {
            throw new runtime.RequiredError('trainee_id','Required parameter requestParameters.trainee_id was null or undefined when calling getTraineeMetrics.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            // oauth required
            headerParameters["Authorization"] = await this.configuration.accessToken("oauth_ums", ["trainee:read"]);
        }

        const response = await this.request({
            path: `/v2/trainee/{trainee_id}/status/metrics`.replace(`{${"trainee_id"}}`, encodeURIComponent(String(requestParameters.trainee_id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => MetricsFromJSON(jsonValue));
    }

    /**
     * Retrieve the cpu & memory of the trainee - the value is collected by the configured kubernetes metrics server on a configurable frequency. 
     * Get the metrics of the trainee
     */
    async getTraineeMetrics(trainee_id: string, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<| Metrics> {
        const response = await this.getTraineeMetricsRaw({ trainee_id: trainee_id }, initOverrides);
        return await response.value();
    }

}
