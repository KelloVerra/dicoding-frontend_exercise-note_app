import * as utils from '../utils.js';


const name = 'note-item';
export default class NoteItem extends HTMLElement {

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this._palette = this.getAttribute('palette');
        this._archived = this.getAttribute('archived');
        this._createdate = this.dataset.createdate;
        this._id = this.dataset.noteid;
        this.render();
    }

    _onStartEdit(ev, note_item) {
        document.dispatchEvent(new CustomEvent(utils.event_keys.show_noteedit_interface, { detail: note_item._id }));
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
                
            button {
                border: none;
                outline: none;
                background-color: transparent;
            }

            h2 {
                margin: 0px;
                color: ${chosen_palette[0]};
                font-weight: 100;
                font-size: .75rem;
                letter-spacing: 5%;
                overflow-wrap: break-word;
            }
            #title {
                display: block;
                margin: .5rem 0px;
                color: ${chosen_palette[0]};
                font-size: 1.75rem;
                font-weight: 100;
                letter-spacing: 5%;
                overflow-wrap: break-word;
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
                overflow-wrap: break-word;
            }

            .card_flip {
                display: flex;
                flex-direction: column;
                justify-content: center;
                position: absolute;
                right: 0;
                bottom: 0;
                width: 4.25rem;
                height: 4.25rem;
                border-radius: 15px 0px 45px 0px;
                background-color: ${chosen_palette[2]};
            }
            #edit-button {
                width: 100%;
                height: 100%;
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

        const edit_button = document.createElement('button');
        const edit_icon = utils.initImage(1, `
            <svg width="37" height="9" viewBox="0 0 37 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30.0059 4.47174C30.0059 5.73262 31.0232 6.75476 32.2781 6.75476C33.533 6.75476 34.5503 5.73262 34.5503 4.47174C34.5503 3.21086 33.533 2.18872 32.2781 2.18872C31.0232 2.18872 30.0059 3.21086 30.0059 4.47174Z" stroke="${chosen_palette[1]}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M16.3728 4.47174C16.3728 5.73262 17.3901 6.75476 18.645 6.75476C19.8999 6.75476 20.9172 5.73262 20.9172 4.47174C20.9172 3.21086 19.8999 2.18872 18.645 2.18872C17.3901 2.18872 16.3728 3.21086 16.3728 4.47174Z" stroke="${chosen_palette[1]}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2.73965 4.47174C2.73965 5.73262 3.75695 6.75476 5.01184 6.75476C6.26674 6.75476 7.28403 5.73262 7.28403 4.47174C7.28403 3.21086 6.26674 2.18872 5.01184 2.18872C3.75695 2.18872 2.73965 3.21086 2.73965 4.47174Z" stroke="${chosen_palette[1]}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `); // from ./assets/optionnote.svg
        edit_button.appendChild(edit_icon);
        edit_button.id = 'edit-button';
        card_flip.appendChild(edit_button);
        edit_button.addEventListener('click', (e) => this._onStartEdit(e, this))

        this._shadowRoot.appendChild(card_flip);
    }

}

customElements.define(name, NoteItem);