import {LitElement, html, css, PropertyValues} from "lit"
import {customElement, query, state} from "lit/decorators.js"
import * as openApi from "./services/openApi.js"
import { OpenApiGroup, OpenApiOperation } from "./models/openApiTypes.js"
// import "@material/web/"
import "@material/web/checkbox/checkbox.js"
import "@material/web/textfield/outlined-text-field.js"
import "@material/web/textfield/filled-text-field.js"
import "@material/web/button/outlined-button.js"

import "./elements/index.js"

@customElement('open-api-test')
export class OpenApiTest extends LitElement {
    static styles = css`
        :host {
            background-color: var(--md-sys-color-background);
            color: var(--md-sys-color-on-background);
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
            background: var(--md-sys-color-primary-container);
            color: var(--md-sys-color-on-primary-container);
            padding: 0.3rem;
        }
        header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            grid-area: header;
            padding: 0.8rem;
            h2 {
                color: var(--md-sys-color-primary);
                margin-block-start: 0;
                margin-block-end: 0;
            }
        }
        main {
            grid-area: content;
            background: var(--md-sys-color-surface-container-lowest);
            color: var(--md-sys-color-secondary);
            padding: 0.3rem;
        }
        #specurl, #op {
            width: 10rem;
        }
        section {
            background-color: #EEE;
        }
        textarea {
            width: 40rem;
            height: 40rem;
        }
    `

    @query("#specurl")
    inputEl: HTMLInputElement | undefined

    @query("#op")
    inputOp: HTMLInputElement | undefined

    @query("textarea")
    textareaEl: HTMLTextAreaElement | undefined

    @state()
    result = ""

    @state()
    selectedOp?: OpenApiOperation | null

    private _isDark = false
    @state()
    get isDark() {
        return this._isDark
    }
    set isDark(value) {
        this._isDark = value
        if (this.isDark) {
            this.classList.add("dark")
            this.classList.remove("light")
        }
        else {
            this.classList.remove("dark")
            this.classList.add("light")
        }
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
        this.getTree()
    }
    getOp(opId?: string) {
        if (!opId) {
            this.result = "no op id"
            return
        }
        this.selectedOp = openApi.getOperation(opId)
    }
    tree: OpenApiGroup[] = []
    getTree() {
        this.tree = openApi.getNavigationTree()
    }

    render() {
        return html`
            <header>
                <div>
                    <h2>OpenAPI Elements Test</h2>
                </div>
                <div>
                    <md-outlined-text-field id="specurl" label="Spec" value="https://apidev.digilean.tools/swagger/v1/swagger.json">
                    </md-outlined-text-field>
                    <md-outlined-button @click=${this.getSpec}>Get Spec</md-outlined-button>
                </div>
                <div>
                <label>
                    Dark theme
                    <md-checkbox .checked=${this.isDark} 
                        @change=${this.isDarkChange}>
                    </md-checkbox>
                </label>
                </div>
            </header>
            <nav>
                <h3>menu</h3>
                ${this.tree.map(g => {
                    return html`
                        <p>${g.group}</p>
                        ${g.operations.map(o => {
                            return html`<md-outlined-button @click=${() => this.getOp(o.operationId)}>${o.operationId}</md-outlined-button>`
                        })}
                    `
                })}
            </nav>
            <main>
                <!-- <md-outlined-button @click=${this.getTree}>Get Tree</md-outlined-button> -->
                <!-- <div>${this.result}</div> -->
                
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
