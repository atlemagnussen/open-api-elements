export async function get<T = object>(url: string)  {
    const req = createRequest(url, "get")
    return await http<T>(req)
}

function createRequest(url: string, method: string, contentType?: string, data?: any) {
    const args: RequestInit = {
        method,
        headers: new Headers({"Content-Type": "application/json"})
    }
    return new Request(url, args)
}

async function http<T>(request: RequestInfo): Promise<T> {
    const res = await fetch(request)
    return resHandler(res)
}

async function resHandler(res: Response) {
    let errorFetchMsg: string
    if (res.ok) {
        const contentType = res.headers.get("content-type")
        if (res.status === 200 || res.status === 201) {
            
            if (contentType && contentType.includes("application/json")) {
                const json = await res.json()
                return json
            }
            const text = await res.text()
            return text
        }
        else {
            return ""
        }
    } else {
        errorFetchMsg = `${res.statusText} (${res.status})`
        console.error(errorFetchMsg)
        if (res.status >= 400 && res.status < 500) {
            try {
                const pd = await res.json()
                console.log(pd)
                errorFetchMsg = JSON.stringify(pd)
                console.error(errorFetchMsg)
            }
            catch (ex) {
                console.debug(ex)
            }
            
        } else {
            const message = await res.text()
            console.log(message)
        }
        throw new Error(errorFetchMsg)
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