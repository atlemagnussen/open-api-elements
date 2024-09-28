import {LitElement, html, css} from "lit"
import {customElement, property} from "lit/decorators.js"
import {unsafeHTML} from 'lit/directives/unsafe-html.js';
// import shiki from "../services/shiki"

@customElement('open-api-syntax')
export class OpenApiSyntaxHighlight extends LitElement {
    static styles = css`
        :host {
            display: inline-block;
        }
    `

    @property({attribute: true, type: Boolean})
    isDark = false

    @property({attribute: true})
    lang = ""

    @property({attribute: false})
    code = ""

    
    render() {
        if (!this.code)
            return html`<span>empty</span>`

        const htmiHi = shiki.renderShiki(this.code, {
            lang: this.lang,
            theme: this.isDark ? 'vitesse-dark' : 'vitesse-light',
          })
        
        return html`
            ${unsafeHTML(htmiHi)}
        `
    }
}
