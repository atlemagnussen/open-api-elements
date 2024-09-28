import {LitElement, html, css} from "lit"
import {customElement, property, state} from "lit/decorators.js"
import { OpenApiOperation } from "@lib/models/openApiTypes.js"

@customElement('open-api-operation-header')
export class OpenApiOperationHeader extends LitElement {
    static styles = css`
        :host {
            display: block;
            --background-color: var(--open-api-header-default);
            background: var(--background-color);
            border: 1px solid var(--background-color);
            border-radius: 4px;
            padding: 0.3rem;
        }
        .url {
            text-transform: lowercase;
        }
    `

    @property({attribute: false})
    operation?: OpenApiOperation | null

    @property({attribute: "base-url"})
    baseUrl = ""

    render() {

        if (!this.operation)
            return html`<span></span>`

        return html`
            <open-api-verb verb="${this.operation.method}"></open-api-verb>
            <span class="url">
                <span>${this.baseUrl}</span><span>${this.operation.path}</span>
            </span>
        `
    }
}
