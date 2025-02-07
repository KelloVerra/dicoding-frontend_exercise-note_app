import * as utils from '../utils.js';


const name = 'note-item';
export default class NoteItem extends HTMLElement {

    constructor() {
        super();
        this._palette = this.getAttribute('palette');
        this._archived = this.getAttribute('archived');
        this._createdate = this.dataset.createdate;
        this._id = this.dataset.id;
        this._shadowRoot = this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {

        const chosen_palette = utils.note_palette[this._palette];

        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                position: relative;
                padding: 1.5rem;
                width: 19rem;
                height: 17rem;
                background-color: ${chosen_palette[1]};
                border-radius: 15px 15px 45px 15px;
                font-family: ${utils.fontfamily};
                box-shadow: 15px 15px 40px rgba(148, 146, 184, 25%);
            }

            h2 {
                margin: 0px;
                color: ${chosen_palette[0]};
                font-weight: 100;
                font-size: .75rem;
                letter-spacing: 5%;
            }
            #title {
                display: block;
                margin: .5rem 0px;
                color: ${chosen_palette[0]};
                font-size: 1.75rem;
                font-weight: 100;
                letter-spacing: 5%;
            }
            hr {
                margin: 1rem 0px;
                height: 2px;
                width: 100%;
                border: none;
                background-color: ${utils.css_transparent(chosen_palette[0], 30)};
            }
            #body {
                display: block;
                margin: 0px;
                color: ${chosen_palette[0]};
                font-size: 1rem;
                font-weight: 100;
                line-height: 135%;
                letter-spacing: 3.5%;
            }

            .card_flip {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 4rem;
                height: 4rem;
                border-radius: 15px 0px 45px 0px;
                background-color: ${chosen_palette[2]};
            }
        `;
        this._shadowRoot.appendChild(style);

        
        const header_date = document.createElement('h2');
        header_date.innerText = this._createdate;
        this._shadowRoot.appendChild(header_date);
        
        
        const header_title = document.createElement('slot');
        header_title.id = "title";
        header_title.name = "title";
        header_title.innerText = "title";
        this._shadowRoot.appendChild(header_title);
        

        const content_divide = document.createElement('hr');
        this._shadowRoot.appendChild(content_divide);
        

        const header_body = document.createElement('slot');
        header_body.id = "body";
        header_body.name = "body";
        this._shadowRoot.appendChild(header_body);
    
        const card_flip = document.createElement('div');
        card_flip.classList.add("card_flip");
        this._shadowRoot.appendChild(card_flip);
    }

}

customElements.define(name, NoteItem);