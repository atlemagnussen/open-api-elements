import {LitElement, html, css} from "lit"
import {customElement, property} from "lit/decorators.js"

@customElement('open-api-verb')
export class OpenApiVerb extends LitElement {
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
            --digilean-badge-color: var(--digilean-greeny);
        }
        .post {
            --digilean-badge-color: var(--digilean-blue);
        }
        .put {
            --digilean-badge-color: var(--digilean-yellow);
            color: var(--digilean-orange-dark);
        }
        .delete {
            --digilean-badge-color: var(--digilean-red-cardinal);
        }
    `

    @property({attribute: true})
    verb = "GET"
    
    render() {
        return html`
            <open-api-badge class="${this.verb}">${this.verb}</open-api-badge>
        `
    }
}
