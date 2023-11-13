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


import * as runtime from '../runtime';
import type {
  CreateTodoRequest,
  CreateTodoResponse,
  GetTodosResponse,
} from '../models';
import {
    CreateTodoRequestFromJSON,
    CreateTodoRequestToJSON,
    CreateTodoResponseFromJSON,
    CreateTodoResponseToJSON,
    GetTodosResponseFromJSON,
    GetTodosResponseToJSON,
} from '../models';

export interface CreateTodoOperationRequest {
    createTodoRequest: CreateTodoRequest;
}

/**
 * 
 */
export class TodosControllerApi extends runtime.BaseAPI {

    /**
     */
    async createTodoRaw(requestParameters: CreateTodoOperationRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<CreateTodoResponse>> {
        if (requestParameters.createTodoRequest === null || requestParameters.createTodoRequest === undefined) {
            throw new runtime.RequiredError('createTodoRequest','Required parameter requestParameters.createTodoRequest was null or undefined when calling createTodo.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/todos`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: CreateTodoRequestToJSON(requestParameters.createTodoRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => CreateTodoResponseFromJSON(jsonValue));
    }

    /**
     */
    async createTodo(createTodoRequest: CreateTodoRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<CreateTodoResponse> {
        const response = await this.createTodoRaw({ createTodoRequest: createTodoRequest }, initOverrides);
        return await response.value();
    }

    /**
     */
    async getTodosRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<GetTodosResponse>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        const response = await this.request({
            path: `/todos`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => GetTodosResponseFromJSON(jsonValue));
    }

    /**
     */
    async getTodos(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<GetTodosResponse> {
        const response = await this.getTodosRaw(initOverrides);
        return await response.value();
    }

}
