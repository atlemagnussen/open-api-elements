import * as oa from '@readyapi/openapi-parser'

const file = `{
  "openapi": "3.1.0",
  "info": {
    "title": "Hello World",
    "version": "1.0.0"
  },
  "paths": {}
}`

const result = await oa.resolve(file)

console.log(result.schema?.components)
