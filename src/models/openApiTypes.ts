import { OpenAPIObject, OperationObject } from "openapi3-ts/oas30"

export interface OpenApiOperation extends OperationObject {
    path: string
    method: string
}

export interface OpenApiGroup {
    group: string
    operations: OpenApiOperation[] 
}