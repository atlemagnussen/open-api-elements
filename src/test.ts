import { readSpec } from "./services/openApi.js"

async function run() {
    // const testHttps = await readSpec("https://apidev.digilean.tools/swagger/v1/swagger.json")
    // console.log(testHttps)

    const testHttp = await readSpec("http://127.0.0.1:4000/swagger/v1/swagger.json")
    console.log(testHttp)
}

run().then(() => {
    console.log("done")
}).catch(err => {
    console.error(err)
}).finally(() => {
    console.log("finally")
})