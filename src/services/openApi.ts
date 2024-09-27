import * as oa from "@readyapi/openapi-parser"
import { HttpClient } from "./httpClientNode.js"

const http = new HttpClient()

export async function readSpec(url: string) {
    const spec = await http.get(url)
    const result = await oa.resolve(spec)
    console.log(result.schema?.components)
}

