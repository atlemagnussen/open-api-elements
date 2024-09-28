import {LitElement, html, css} from "lit"
import {customElement, property, state} from "lit/decorators.js"
import { oas30 } from "openapi3-ts"

@customElement('open-api-content')
export class OpenApiContent extends LitElement {
    static styles = css`
        :host {
            display: block;
        }
    `

    @property({attribute: false})
    content: oas30.ContentObject | undefined

    render() {

        if (!this.content) {
            return html`<span>no content defined</span>`
        }
        const contentTypes = Object.keys(this.content)
        return html`
            <h4>Content</h4>
            ${contentTypes.map(type => {
                const mediaType = this.content![type]
                console.log("mediaType", mediaType)
                return html`
                    <p>
                        ${type}<br>
                        ${mediaType.encoding}
                    </p>

                    <open-api-schema .schema=${mediaType.schema}></open-api-schema>
                `
            })}
        `
    }
}
