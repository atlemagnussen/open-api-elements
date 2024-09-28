import {LitElement, html, css} from "lit"
import {customElement, property} from "lit/decorators.js"
import { oas30 } from "openapi3-ts"

@customElement('open-api-schema')
export class OpenApiSchema extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
    `

    @property({attribute: false})
    schema: oas30.SchemaObject | oas30.ReferenceObject | undefined

    render() {

        if (!this.schema) {
            return html`<span>no schema defined</span>`
        }

        return html`
            <span>${this.schema.type}</span>
        `
    }
}
