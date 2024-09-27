import { readSpec } from "./services/openApi.js"


async function run() {
    await readSpec("https://apidev.digilean.tools/swagger/v1/swagger.json")

    // const testHttp = await readSpec("http://127.0.0.1:4000/swagger/v1/swagger.json")
}

run().then(() => {
    console.log("done")
}).catch(err => {
    console.error(err)
}).finally(() => {
    console.log("finally")
})