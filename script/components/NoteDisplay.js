import * as utils from '../utils.js';


const name = 'note-display';
export default class NoteDisplay extends HTMLElement {

    constructor() {
        super();
        this._archive = this.getAttribute('archive');
        this._shadowRoot = this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const style = document.createElement('style');
        style.textContent = `
            :host {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(22rem, 22rem));
                justify-items: center;
                align-items: center;
                gap: 2.25rem;
                padding: 1rem;
                width: 100%;
            }
        `;
        this._shadowRoot.appendChild(style);

        utils.dummynotedata.forEach((v) => {
            if (v.archived !== utils.booleanize(this._archive)) return;

            const note_item = document.createElement('note-item');
            note_item.setAttribute('data-noteid', v.id);
            note_item.setAttribute('data-createdate', v.createdAt);
            note_item.setAttribute('palette', v.palette);

            const note_title = document.createElement('div');
            note_title.slot = "title";
            note_title.innerText = v.title;
            note_item.appendChild(note_title);

            const note_body = document.createElement('div');
            note_body.slot = "body";
            note_body.innerText = v.body;
            note_item.appendChild(note_body);
            
            this._shadowRoot.appendChild(note_item)
        });
        
        if (utils.booleanize(this._archive)) return;
        const add_note_item = document.createElement('add-note-item');
        this._shadowRoot.append(add_note_item);
    }

}

customElements.define(name, NoteDisplay);