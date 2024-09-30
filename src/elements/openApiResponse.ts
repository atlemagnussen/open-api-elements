import {html, css} from "lit"
import {customElement, property, state} from "lit/decorators.js"
import { oas30 } from "openapi3-ts"
import { OpenApiOperation } from "@lib/models/openApiTypes.js"
import { OpenApiBaseElement } from "./openApiBaseElement.js"

@customElement('open-api-response')
export class OpenApiResponse extends OpenApiBaseElement {
    static styles = css`
        :host {
            display: block;
        }
        open-api-badge {
            --digilean-badge-color: var(--digilean-grey-fog);
        }
    `

    @property({attribute: false})
    operation?: OpenApiOperation | null

    render() {

        if (!this.operation || !this.operation.responses) {
            return html`<span>no responses defined</span>`
        }

        const responses = Object.keys(this.operation.responses)
        return html`
            <h4>Responses</h4>
            ${responses.map(code => {
                const response = this.operation?.responses![code] as oas30.ResponseObject
                return html`
                    <open-api-badge>
                        ${code}
                    </open-api-badge>
                    <open-api-badge>
                        ${response.description}
                    </open-api-badge>
                    <open-api-content
                        .content=${response.content}>
                    </open-api-content>
                `
            })}
        `
    }
}
