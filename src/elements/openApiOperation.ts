import {LitElement, html, css} from "lit"
import {customElement, property, state} from "lit/decorators.js"
import * as openApi from "../services/openApi"
import { oas30 } from "openapi3-ts"
import "rapidoc"

@customElement('open-api-operation')
export class OpenApiOperation extends LitElement {
    static styles = css`
        :host {
            display: inline-block;
        }
    `

    @property({attribute: true})
    operationId = ""

    @state()
    operation: oas30.OperationObject | undefined

    @property({attribute: true, type: Boolean})
    isDark = false

    connectedCallback(): void {
        super.connectedCallback()
        const op = openApi.getOperation(this.operationId)
        console.log(op)
        this.operation = op
    }
    render() {

        const code = "var test=124;\nconsole.log('hello')"

        if (!this.operation)
            return html`<h2>Missing spec</h2>`
        return html`
            <h2>${this.operation.summary}</h2>
            <h4>${this.operation.description}</h4>

            <open-api-operation-header id="${this.operationId}"></open-api-operation-header>

            <open-api-response id="${this.operationId}"></open-api-response>
        `
    }
}
