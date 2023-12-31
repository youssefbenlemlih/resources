/* tslint:disable */
/* eslint-disable */
/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface CreateTodoRequest
 */
export interface CreateTodoRequest {
    /**
     * 
     * @type {string}
     * @memberof CreateTodoRequest
     */
    text: string;
}

/**
 * Check if a given object implements the CreateTodoRequest interface.
 */
export function instanceOfCreateTodoRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "text" in value;

    return isInstance;
}

export function CreateTodoRequestFromJSON(json: any): CreateTodoRequest {
    return CreateTodoRequestFromJSONTyped(json, false);
}

export function CreateTodoRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): CreateTodoRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'text': json['text'],
    };
}

export function CreateTodoRequestToJSON(value?: CreateTodoRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'text': value.text,
    };
}

