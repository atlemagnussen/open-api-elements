import { css, html, LitElement } from "lit"
import { customElement, property } from "lit/decorators.js";

@customElement('json-viewer')
export default class JsonViewer extends LitElement {
    static styles = css`
        :host{
            display:flex;
        }
        :where(button, input[type="checkbox"], [tabindex="0"]):focus-visible { box-shadow: var(--focus-shadow); }
        :where(input[type="text"], input[type="password"], select, textarea):focus-visible { border-color: var(--primary-color); }
        .json-tree {
            position: relative;
            font-family: var(--font-mono);
            font-size: var(--font-size-small);
            display:inline-block;
            overflow:hidden;
            word-break: break-all;
            flex:1;
            line-height: calc(var(--font-size-small) + 6px);
            min-height: 40px;
            direction: ltr; 
            text-align: left;
        }

        .open-bracket {
            display:inline-block;
            padding: 0 20px 0 0;
            cursor:pointer;
            border: 1px solid transparent;
            border-radius:3px;
        }
        .close-bracket {
            border: 1px solid transparent;
            border-radius:3px;
            display:inline-block;
        }
        .open-bracket:hover {
            color:var(--primary-color);
            background-color:var(--hover-color);
            border: 1px solid var(--border-color);
        }
        .open-bracket.expanded:hover ~ .inside-bracket {
            border-left: 1px solid var(--fg3);
        }
        .open-bracket.expanded:hover ~ .close-bracket {
            color:var(--primary-color);
        }
        .inside-bracket {
            padding-left:12px;
            overflow: hidden;
            border-left:1px dotted var(--border-color);
        }
        .open-bracket.collapsed + .inside-bracket,
        .open-bracket.collapsed + .inside-bracket + .close-bracket {
            display:none;
        }

        .string{color:var(--open-api-green);}
        .number{color:var(--open-api-blue);}
        .null{color:var(--open-api-red);}
        .boolean{color:var(--open-api-purple);}
        .object{color:var(--open-api-fg)}
        .toolbar {
            position: absolute;
            top:5px;
            right:6px;
            display:flex;
            padding:2px;
            align-items: center;
        }
    `

    @property({attribute: false})
    data: any
    
    render() {
        return html`
            <div class = "json-tree"  @click='${(e) => { if (e.target.classList.contains('btn-copy')) { copyToClipboard(JSON.stringify(this.data, null, 2), e); } else { this.toggleExpand(e); } }}'>
                <div class='toolbar'> 
                    <button class="toolbar-btn btn-copy" part="btn btn-fill btn-copy"> Copy </button>
                </div>
                ${this.generateTree(this.data, true)}
            </div>  
        `
    }

    generateTree(data: any, isLast = false): any {
        if (data === null) {
            return html`<div class="null" style="display:inline;">null</div>`;
        }
        if (typeof data === 'object' && (data instanceof Date === false)) {
            const detailType = Array.isArray(data) ? 'array' : 'pure_object';
            if (Object.keys(data).length === 0) {
                return html`${(Array.isArray(data) ? '[ ],' : '{ },')}`;
            }
            return html`
                <div class="open-bracket expanded ${detailType === 'array' ? 'array' : 'object'}" > ${detailType === 'array' ? '[' : '{'}</div>
                <div class="inside-bracket">
                    ${Object.keys(data).map((key, i, a) => html`
                        <div class="item"> 
                            ${detailType === 'pure_object' ? html`"${key}":` : ''}
                            ${this.generateTree(data[key], i === (a.length - 1))}
                        </div>`)
                }
                </div>
                <div class="close-bracket">${detailType === 'array' ? ']' : '}'}${isLast ? '' : ','}</div>
            `;
        }
        return (typeof data === 'string' || data instanceof Date)
            ? html`<span class="${typeof data}">"${data}"</span>${isLast ? '' : ','}`
            : html`<span class="${typeof data}">${data}</span>${isLast ? '' : ','}`;
    }
    /* eslint-enable indent */

    toggleExpand(e: Event) {
        const openBracketEl = e.target as HTMLElement
        if (openBracketEl.classList.contains('open-bracket')) {
            if (openBracketEl.classList.contains('expanded')) {
                openBracketEl.classList.replace('expanded', 'collapsed');
                openBracketEl.innerHTML = openBracketEl.classList.contains('array') ? '[...]' : '{...}';
            } else {
                openBracketEl.classList.replace('collapsed', 'expanded');
                openBracketEl.innerHTML = openBracketEl.classList.contains('array') ? '[' : '{';
            }
        }
    }
}
