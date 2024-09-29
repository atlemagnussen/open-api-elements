import {html, css} from "lit"
import {customElement, property, state} from "lit/decorators.js"
import { OpenApiOperation } from "../models/openApiTypes.js"
import { OpenApiBaseElement } from "./openApiBaseElement.js"
// import * as openApi from "../services/openApi.js"
//import { oas30 } from "openapi3-ts"
// import "rapidoc"

@customElement('open-api-operation')
export class OpenApiOperationElement extends OpenApiBaseElement {
    static styles = css`
        :host {
            display: block;
            background: var(--md-sys-color-surface);
            color: var(--md-sys-color-on-secondary-container);
        }
        h2 {
            color: var(--md-sys-color-secondary);
        }
        h4 {
            color: var(--md-sys-color-tertiary);
        }
    `

    @property({attribute: "base-url" })
    baseUrl = ""

    @property({attribute: false})
    operation?: OpenApiOperation | null

    connectedCallback(): void {
        super.connectedCallback()
    }
    render() {

        if (!this.operation)
            return html`<h2>Missing spec</h2>`
        return html`
            <h2>${this.operation.summary}</h2>
            <h4>${this.operation.description}</h4>

            <open-api-operation-header
                .operation=${this.operation}
                base-url="${this.baseUrl}">
            </open-api-operation-header>

            <open-api-response
                .operation=${this.operation}>
            </open-api-response>
        `
    }
}
