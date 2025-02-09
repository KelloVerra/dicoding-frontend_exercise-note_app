import * as utils from '../utils.js';


const name = 'note-display';
export default class NoteDisplay extends HTMLElement {

    constructor() {
        super();
        this._archive = this.getAttribute('archive');
        this._shadowRoot = this.attachShadow({mode:'open'});
        utils.note_displays.push(this);
    }

    connectedCallback() {
        utils.storageReady();
        this.render();
        document.addEventListener(utils.event_keys.note_display_rerender, () => this.render());
    }

    render() {
        this._shadowRoot.innerHTML = '';

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
        // get the most latest edited note item
        let latest_edited_noteitem = 0;

        // sort by the latest edited first
        const sorted_notes = utils.getNotes(utils.booleanize(this._archive)).sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

        // filter query searched notes
        const searched_notes = sorted_notes; // TODO : SEARCH
        
        searched_notes.forEach((v) => {

            const note_item = document.createElement('note-item');
            note_item.setAttribute('data-noteid', v.id);
            note_item.setAttribute('data-editeddate', v.updatedAt);
            note_item.setAttribute('palette', v.palette);

            const note_title = document.createElement('span');
            note_title.slot = "title";
            note_title.innerText = v.title;
            note_item.appendChild(note_title);

            const note_body = document.createElement('span');
            note_body.slot = "body";
            note_body.innerText = v.body;
            note_item.appendChild(note_body);
            
            this._shadowRoot.appendChild(note_item)

            const editeddate_ms = new Date(v.updatedAt).getTime();
            latest_edited_noteitem = latest_edited_noteitem < editeddate_ms ? editeddate_ms : latest_edited_noteitem;
        });
        
        if (utils.booleanize(this._archive)) return;
        const add_note_item = document.createElement('add-note-item');
        this._shadowRoot.appendChild(add_note_item);

        // send content header the latest edited note item
        document.dispatchEvent(new CustomEvent(utils.event_keys.note_display_header_rerender, { detail: {
            latest_edited_noteitem: latest_edited_noteitem,
        }}));
    }

}

customElements.define(name, NoteDisplay);