import * as utils from '../utils.js';


const name = 'add-note-item'
export default class AddNoteItem extends HTMLButtonElement {

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin: 2.5rem 0px;
                padding: 1rem;
                width: 10rem;
                height: 10rem;
                border-radius: 15px 15px 15px 15px;
                border: 3px ${utils.css_transparent(utils.palette.primary0, 15)} dashed;
                --color: ${utils.css_transparent(utils.palette.primary0, 15)};
                font-family: ${utils.fontfamily};
                cursor: pointer;
                transition: scale 75ms ease-out;
            }
            :host(:hover) {
                border: 3px ${utils.css_transparent(utils.palette.primary0, 25)} dashed;
                --color: ${utils.css_transparent(utils.palette.primary0, 25)};
                scale: 1.05;
            }
            :host(:active) {
                border: 3px ${utils.css_transparent(utils.palette.primary0, 50)} dashed;
                --color: ${utils.css_transparent(utils.palette.primary0, 50)};
                scale: .95;
            }
            h1 {
                margin: 0px auto;
                color: var(--color);
                font-size: 1.5rem;
                font-weight: 100;
                letter-spacing: 6.5%;
            }
        `;
        this._shadowRoot.appendChild(style);
        
        
        const header_name = document.createElement('h1');
        header_name.innerText = "Note Baru";
        this._shadowRoot.appendChild(header_name);
    }

}

customElements.define(name, AddNoteItem, {extends:"button"});