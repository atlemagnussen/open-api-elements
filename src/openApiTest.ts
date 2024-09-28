import {LitElement, html, css, PropertyValues} from "lit"
import {customElement, query, state} from "lit/decorators.js"
import * as openApi from "./services/openApi.js"
import { OpenApiOperation } from "./models/openApiTypes.js"

import "./elements/index.js"

@customElement('open-api-test')
export class OpenApiTest extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        input {
            width: 25rem;
        }
        section {
            background-color: #EEE;
        }
        textarea {
            width: 40rem;
            height: 40rem;
        }
    `

    @query("input#url")
    inputEl: HTMLInputElement | undefined

    @query("input#op")
    inputOp: HTMLInputElement | undefined

    @query("textarea")
    textareaEl: HTMLTextAreaElement | undefined

    @state()
    result = ""

    @state()
    selectedOp?: OpenApiOperation | null

    protected firstUpdated(_changedProperties: PropertyValues): void {
        this.getSpec()
    }
    async getSpec() {
        const url = this.inputEl?.value
        if (!url) {
            this.result = "no url"
            return
        }
            
        const spec = await openApi.readSpec(url)
        const info = JSON.stringify(spec?.info)
        this.result = `Spec ${spec?.openapi} loaded: ${info}`
    }
    getOp() {
        const opId = this.inputOp?.value
        if (!opId) {
            this.result = "no op id"
            return
        }
        this.selectedOp = openApi.getOperation(opId)
    }
    getTree() {
        const tree = openApi.getNavigationTree()
        const json = JSON.stringify(tree, null, 2)
        if (this.textareaEl)
            this.textareaEl.value = json
    }

    render() {
        return html`
            <p>Test</p>
            <input id="url" value="https://apidev.digilean.tools/swagger/v1/swagger.json" />
            <button @click=${this.getSpec}>Get spec</button>
            <input id="op" value="Boards_List" />
            <button @click=${this.getOp}>Get Op</button>
            <button @click=${this.getTree}>Get Tree</button>
            <div>${this.result}</div>
            
            <section>
                <open-api-operation .operation=${this.selectedOp}></open-api-operation>
            </section>

            <textarea></textarea>
        `
    }
}
