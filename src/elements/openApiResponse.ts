import {LitElement, html, css} from "lit"
import {customElement, property, state} from "lit/decorators.js"
import * as openApi from "../services/openApi.js"
import { oas30 } from "openapi3-ts"

@customElement('open-api-response')
export class OpenApiResponse extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
        open-api-badge {
            --digilean-badge-color: var(--digilean-grey-fog);
        }
    `

    @property({attribute: true})
    id = ""

    @state()
    responses: oas30.ResponsesObject | undefined

    connectedCallback(): void {
        super.connectedCallback()
        if (this.id) {
            const ops = openApi.getOperation(this.id)
            this.responses = ops.responses
            console.log(this.responses)
        }
    }
    render() {

        if (!this.responses) {
            return html`<span>no responses defined</span>`
        }

        const responses = Object.keys(this.responses)
        return html`
            <h4>Responses</h4>
            ${responses.map(code => {
                const response = this.responses![code] as oas30.ResponseObject
                return html`
                <open-api-badge>${code}</open-api-badge>
                <open-api-badge>${response.description}</open-api-badge>
                <open-api-content .content=${response.content}></open-api-content>`
            })}
        `
    }
}
