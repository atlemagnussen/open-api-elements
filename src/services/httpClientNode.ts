import http from "http"
import https from "https"

export class HttpClient  {

    async get(url: string) {
        const options = await this.createRequestOptions("GET", url)
        return this.request(options)
    }
    
    async createRequestOptions(method: string, url: string) {
        const urlObj = new URL(url)
        console.log(urlObj)
        const options: http.RequestOptions = {
            method,
            host: urlObj.host,
            path: urlObj.pathname,
            port: urlObj.port,
            protocol: urlObj.protocol
        }
        
        options.headers = { "Content-Type": "application/json" }
        return options
    }
    request(options: http.RequestOptions, data?: any): Promise<string> {
        let postData = ""
        if (data && typeof data === "object")
            postData = JSON.stringify(data)
        else if (data && typeof data === "string")
            postData = data

        if (postData)
            options.headers!["Content-Length"] = Buffer.byteLength(postData)

        let requestSend = https.request
        if (options.protocol === "http:")
            requestSend = http.request

        return new Promise((resolve, reject) => {
            const request = requestSend(options, (res) => {
                handleResponse(res, resolve, reject)
            })
                .on("error", (e) => reject(e))
            if (postData)
                request.write(postData)
            request.end()
        })
    }
}

export function handleResponse(res: http.IncomingMessage, resolve: (data:any)=>void, reject:(msg:string | ProblemDetails)=>void) {
    let {statusCode} = res
    let error: Error | null = null

    if (!statusCode) statusCode = 500
    if (statusCode >= 400) {
        error = new Error(`Request Failed.\nStatus Code: ${statusCode}`);
        res.resume()
    }

    res.setEncoding("utf8")
    let rawData = ""
    res.on("data", (chunk: string) => {
        rawData += chunk
    })
    res.on("end", () => {
        const errmsg = `Status: ${statusCode} - msg: ${rawData}`
        if (error) {
            reject(errmsg)
        } else {
            resolve(rawData)
        }
    })
}