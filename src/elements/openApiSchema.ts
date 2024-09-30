import { html, css} from "lit"
import {customElement, property, query, state} from "lit/decorators.js"
import { oas30 } from "openapi3-ts"
import { getItemByRef } from "../services/openApi.js"
import { MdTabs } from "@material/web/tabs/tabs.js"
import "@material/web/tabs/tabs.js"
import "@material/web/tabs/primary-tab.js"
import "@material/web/tabs/secondary-tab.js"
import { OpenApiBaseElement } from "./openApiBaseElement.js"


@customElement('open-api-schema')
export class OpenApiSchema extends OpenApiBaseElement {
    static styles = css`
        :host {
            display: block;
        }
        md-tabs {
            width: 15rem;
        }
    `

    @query("md-tabs")
    tabs: MdTabs | undefined

    tabsChange() {
        this.activeTab = this.tabs?.activeTabIndex
        console.log("activeTab", this.activeTab)
    }
    @state()
    activeTab: number | undefined = 0

    @property({attribute: false})
    schema: oas30.SchemaObject | oas30.ReferenceObject | undefined

    getSchemaExpanded(schema: oas30.SchemaObject | oas30.ReferenceObject) {
        if (oas30.isSchemaObject(schema)) {
            if (schema.type === "array" && oas30.isReferenceObject(schema.items)) {
                if (schema.items.$ref) {
                    return getItemByRef(schema.items.$ref) as oas30.ComponentsObject
                }
            }
        }
        if (oas30.isReferenceObject(schema))
            return getItemByRef(schema.$ref) as oas30.ComponentsObject

    }
    render() {

        if (!this.schema) {
            return html`<span>no schema defined</span>`
        }

        const schema = this.getSchemaExpanded(this.schema)
        console.log(schema)
        
        return html`
            <md-tabs @change=${this.tabsChange}>
                <md-primary-tab id="example-tab" aria-controls="example-panel">
                    Example
                </md-primary-tab>
                <md-primary-tab id="schema-tab" aria-controls="schema-panel">
                    Schema
                </md-primary-tab>
            </md-tabs>
            ${!this.activeTab ? html`
                <div>
                    Example
                </div>
            ` : html`
                <div>
                    Schema
                    <json-viewer .data=${schema}></json-viewer>
                </div>
            `}
            
            
        `
    }
}
