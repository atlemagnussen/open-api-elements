import * as oa from "@readyapi/openapi-parser"
// import * as http from "./httpClientNode.js"
import * as http from "./httpClientBrowser.js"
import { OpenAPIObject } from "openapi3-ts/oas30"
import { httpVerbs } from "./httpVerbs.js"
import { OpenApiGroup, OpenApiOperation } from "../models/openApiTypes.js"

let spec: OpenAPIObject | null = null

export async function readSpec(url: string) {
    const load = await http.get<OpenAPIObject>(url)
    console.log("spec", load)

    if (load.info)
        spec = load

    const parsed = await oa.validate(load)
    if (parsed.errors)
        console.error(parsed.errors[0])
    //const result = JSON.parse(spec) as OpenAPIObject
    
    //console.log("resolve result", result.components)
    return spec
}

export function getBaseUrl() {
    if (!spec || !spec.servers || spec.servers.length === 0)
        return "missing base url"

    return spec.servers[0].url
}

export function getNavigationTree() {
    if (!spec || !spec.paths)
        return []

    const groups: OpenApiGroup[] = []
    const keysPath = Object.keys(spec.paths)
    for (const keyPath of keysPath) {
        const path = spec.paths[keyPath]
        for (const verb of httpVerbs) {
            /// @ts-ignore
            const opVerb = path[verb] as OpenApiOperation
            if (opVerb) {
                opVerb.path = keyPath
                opVerb.method = verb
                if (opVerb.tags) {
                    for(const tag of opVerb.tags) {
                        let group = groups.find(g => g.group === tag)
                        if (!group) {
                            group = {
                                group: tag,
                                operations: [opVerb]
                            }
                            groups.push(group)
                        } else {
                            group.operations.push(opVerb)       
                        }
                    }
                }
                else
                    console.warn("missing tags for operation", opVerb.operationId)
            }
        }
    }
    return groups
}

export function getOperation(opId: string) {
    if (!spec || !spec.paths)
        return null

    const keysPath = Object.keys(spec.paths)
    for (const keyPath of keysPath) {
        const path = spec.paths[keyPath]
        for (const verb of httpVerbs) {
            /// @ts-ignore
            const opVerb = path[verb] as OpenApiOperation
            if (opVerb && opVerb.operationId == opId) {
                opVerb.path = keyPath
                opVerb.method = verb
                return opVerb
            }
        }
    }
    return null
}

export function getItemByRef(ref: string) {
    if (!spec)
        return null

    const split = ref.split("/")
    let objFound: any = spec
    for(let i = 0; i < split.length; i++) {
        const p = split[i]
        if (p === "#")
            continue

        for (const path of Object.keys(objFound)) {
            if (path === p) {
                objFound = objFound[path]
            }
        }
    }
    return objFound
}