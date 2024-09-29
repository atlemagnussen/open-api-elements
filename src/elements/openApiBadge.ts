import { html, css} from "lit"
import {customElement} from "lit/decorators.js"
import { OpenApiBaseElement } from "./openApiBaseElement.js"

@customElement('open-api-badge')
export class OpenApiBadge extends OpenApiBaseElement {
    static styles = css`
        :host {
            display: inline-block;
            --open-api-badge-color: var(--open-api-badge-default); 
            background-color: var(--open-api-badge-color);
            border: solid 1px var(--badge-color);
            border-radius: 4px;
            padding: 0.3rem 0.7rem;
            white-space: nowrap;
        }
        ::slotted() {
            background-color: red;
            color: red;
        }
    `
    
    render() {
        return html`
            <slot></slot>
        `
    }
}
