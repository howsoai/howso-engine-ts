/**
 * Howso API
 * OpenAPI implementation for interacting with the Howso API. 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists } from '../runtime';
import type { Trainee } from './Trainee';
import {
    TraineeFromJSON,
    TraineeToJSON,
} from './Trainee';

/**
 * 
 * @export
 * @interface TraineeActionOutput
 */
export interface TraineeActionOutput {
    /**
     * The async action's unique identifier.
     * @type {string}
     * @memberof TraineeActionOutput
     */
    action_id?: string;
    /**
     * The status of the action.
     * @type {string}
     * @memberof TraineeActionOutput
     */
    status: string;
    /**
     * The type of operation that is running.
     * @type {string}
     * @memberof TraineeActionOutput
     */
    operation_type: string;
    /**
     * 
     * @type {Trainee}
     * @memberof TraineeActionOutput
     */
    output?: Trainee | null;
}

/**
 * Check if a given object implements the TraineeActionOutput interface.
 */
export function instanceOfTraineeActionOutput(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "status" in value;
    isInstance = isInstance && "operation_type" in value;

    return isInstance;
}

export function TraineeActionOutputFromJSON(json: any): TraineeActionOutput {
    return TraineeActionOutputFromJSONTyped(json, false);
}

export function TraineeActionOutputFromJSONTyped(json: any, ignoreDiscriminator: boolean): TraineeActionOutput {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'action_id': !exists(json, 'action_id') ? undefined : json['action_id'],
        'status': json['status'],
        'operation_type': json['operation_type'],
        'output': !exists(json, 'output') ? undefined : TraineeFromJSON(json['output']),
    };
}

export function TraineeActionOutputToJSON(value?: TraineeActionOutput | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'action_id': value.action_id,
        'status': value.status,
        'operation_type': value.operation_type,
        'output': TraineeToJSON(value.output),
    };
}

