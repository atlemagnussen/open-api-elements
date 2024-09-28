import {LitElement, html, css, PropertyValues} from "lit"
import {customElement, query, state} from "lit/decorators.js"
import * as openApi from "./services/openApi.js"
import { OpenApiOperation } from "./models/openApiTypes.js"

import "./elements/index.js"

@customElement('open-api-test')
export class OpenApiTest extends LitElement {
    static styles = css`
        :host {
            background-color: var(--open-api-primary-background);
            color: var(--open-api-primary-text);
            display: grid;
            grid-template-columns: 1fr 6fr;
            grid-template-areas:
            "nav header"
            "nav content"
            "nav content"
            "nav content"
            "nav content"
            "nav content"
            "nav content";
            height: 100%;
        }

        nav {
            grid-area: nav;
            background: purple;
            padding: 0.3rem;
        }
        header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            grid-area: header;
            padding: 0.3rem;
        }
        main {
            grid-area: content;
            background: var(--open-api-secondary-background);
            color: var(--open-api-secondary-color);
            padding: 0.3rem;
        }
        input {
            width: 25rem;
            background: var(--open-api-secondary-background);
            color: var(--open-api-secondary-color);
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

    private _isDark = true
    @state()
    get isDark() {
        return this._isDark
    }
    set isDark(value) {
        this._isDark = value
        if (this.isDark)
            this.classList.add("dark-theme")
        else
            this.classList.remove("dark-theme")
    }

    isDarkChange(e: Event) {
        const el = e.target as HTMLInputElement
        this.isDark = el.checked
    }
    baseUrl = ""

    connectedCallback(): void {
        super.connectedCallback()
        this.isDark = true
    }

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
        this.baseUrl = openApi.getBaseUrl()
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
            <header>
                <div>
                    <h2>OpenAPI Elements Test</h2>
                </div>
                <div>
                    <label for="dark-mode">Dark mode</label>
                    <input id="dark-mode" type="checkbox" 
                        .checked=${this.isDark} 
                        @change=${this.isDarkChange} />
                </div>
            </header>
            <nav>
                <span>menu</span>
            </nav>
            <main>
                <input id="url" value="https://apidev.digilean.tools/swagger/v1/swagger.json" />
                <button @click=${this.getSpec}>Get spec</button>
                <input id="op" value="Boards_List" />
                <button @click=${this.getOp}>Get Op</button>
                <button @click=${this.getTree}>Get Tree</button>
                <div>${this.result}</div>
                
                <section>
                    <open-api-operation 
                        .operation=${this.selectedOp}
                        base-url="${this.baseUrl}">
                    </open-api-operation>
                </section>
            </main>
        `
    }
}
