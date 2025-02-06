import * as utils from '../utils.js';


const name = 'add-note-item'
export default class AddNoteItem extends HTMLElement {

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
                display: block;
                padding: 1rem;
                width: 15rem;
                height: 15rem;
                background-color: ${utils.pallette.primary0};
                border-radius: 15px 15px 45px 15px;
                font-family: ${utils.fontfamily};
            }
            h1 {
                margin: 0px;
                color: ${utils.pallette.primary0};
                font-size: 2rem;
                font-weight: 100;
                letter-spacing: 5%;
            }
        `;
        this._shadowRoot.appendChild(style);

        
        const header_date = document.createElement('h2');
        header_date.innerText = this._edit;
        this._shadowRoot.appendChild(header_date);
        
        
        const header_name = document.createElement('h1');
        header_name.innerText = this._title;
        this._shadowRoot.appendChild(header_name);
        

        const content_divide = document.createElement('div');
        content_divide.classList.add('divide');
        this._shadowRoot.appendChild(content_divide);
        

        const header_body = document.createElement('p');
        header_body.innerText = this._body;
        this._shadowRoot.appendChild(header_body);
    
        const card_flip = document.createElement('div');
        card_flip.classList.add(".card_flip");
        this._shadowRoot.appendChild(card_flip);
    }

}

customElements.define(name, AddNoteItem);