import {LitElement} from "lit"
import {property} from "lit/decorators.js"

export class OpenApiBaseElement extends LitElement {

    private _isDark = false
    // @property({attribute: "is-dark", type: Boolean})
    // get isDark() {
    //     return this._isDark
    // }
    // set isDark(value) {
    //     this._isDark = value
    //     if (this.isDark) {
    //         this.classList.add("dark")
    //         this.classList.remove("light")
    //     }
    //     else {
    //         this.classList.remove("dark")
    //         this.classList.add("light")
    //     }
    // }
}