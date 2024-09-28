import {LitElement, html, css} from "lit"
import {customElement, property, state} from "lit/decorators.js"
import * as openApi from "../services/openApi.js"

@customElement('open-api-operation-header')
export class OpenApiOperationHeader extends LitElement {
    static styles = css`
        :host {
            display: block;
            --background-color: var(--digilean-grey-fog);
            background: var(--background-color);
            border: 1px solid var(--background-color);
            border-radius: 4px;
            padding: 0.3rem;
        }
        .url {
            text-transform: lowercase;
        }
    `

    @property({attribute: true})
    id = ""
    
    @state()
    operationVerb = ""

    @state()
    operationPath = ""

    @state()
    baseUrl = ""

    connectedCallback(): void {
        super.connectedCallback()
        this.baseUrl = openApi.getBaseUrl()
        this.operationPath = openApi.getOperationPath(this.id)
        this.operationVerb = openApi.getOperationMethod(this.id)
    }
    render() {
        return html`
            <open-api-verb verb="${this.operationVerb}"></open-api-verb>
            <span class="url">
                <span>${this.baseUrl}</span><span>${this.operationPath}</span>
            </span>
        `
    }
}
