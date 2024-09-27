// import * as oa from "@readyapi/openapi-parser"
import * as http from "./httpClientNode.js"
import { OpenAPIObject } from "openapi3-ts/oas30"


export async function readSpec(url: string) {
    const spec = await http.get(url)
    // console.log("spec", spec)
    const result = JSON.parse(spec) as OpenAPIObject
    
    console.log("resolve result", result.components)
}

