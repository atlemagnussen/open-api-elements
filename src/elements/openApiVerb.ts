import {html, css} from "lit"
import {customElement, property} from "lit/decorators.js"
import { OpenApiBaseElement } from "./openApiBaseElement.js"

@customElement('open-api-verb')
export class OpenApiVerb extends OpenApiBaseElement {
    static styles = css`
        :host {
            display: inline-block;
        }
        open-api-badge {
            color: white;
            text-transform: uppercase;
            font-size: 0.7em;
            font-weight: 600;
        }
        .get {
            --open-api-badge-color: var(--open-api-green);
        }
        .post {
            --open-api-badge-color: var(--open-api-post);
        }
        .put {
            --open-api-badge-color: var(--open-api-put);
            color: var(--digilean-orange-dark);
        }
        .delete {
            --open-api-badge-color: var(--digilean-red-cardinal);
        }
    `

    @property({attribute: true})
    verb = "GET"
    
    render() {
        console.log(this.classList)
        return html`
            <open-api-badge class="${this.verb}">${this.verb}</open-api-badge>
        `
    }
}
