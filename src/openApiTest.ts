import {LitElement, html, css} from "lit"
import {customElement, query, state} from "lit/decorators.js"
import * as openApi from "./services/openApi.js"

@customElement('open-api-test')
export class OpenApiTest extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        input {
            width: 40rem;
        }
    `

    @query("input")
    inputEl: HTMLInputElement | undefined

    @state()
    result = ""
    
    async getSpec() {
        const url = this.inputEl?.value
        if (!url) {
            this.result = "no url"
            return
        }
            
        const spec = await openApi.readSpec(url)
        this.result = JSON.stringify(spec, null, 2)
    }
    render() {
        return html`
            <p>Test</p>
            <input value="https://apidev.digilean.tools/swagger/v1/swagger.json" />
            <button @click=${this.getSpec}>Get</button>
            <div>${this.result}</div>
        `
    }
}
