import * as utils from '../utils.js';


const name = 'note-display';
export default class NoteDisplay extends HTMLElement {

    constructor() {
        super();
        this._archive = this.getAttribute('archive');
        this._shadowRoot = this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        utils.storageReady();
        this._search_query = '';
        this.render();
        document.addEventListener(utils.event_keys.note_display_rerender, () => this.render());
        document.addEventListener(utils.event_keys.query_search, (e) => this._onSearchQueried(e.detail.query, this));
        document.addEventListener(utils.event_keys.empty_search, () => this._onSearchEmptied(this));
    }

    _onSearchQueried(query, root) {
        root._search_query = query;
        root.render();
    }

    _onSearchemptied(root) {
        root._search_query = '';
        root.render();
    }

    render() {
        this._shadowRoot.innerHTML = '';

        if (!utils.booleanize(this._archive)) {
            const add_note_item = document.createElement('add-note-item');
            this._shadowRoot.appendChild(add_note_item);
        }


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

            @media screen and (max-width: ${utils.responsive_thresholds[2]}) {
                :host {
                    justify-items: start;
                    padding: 0px;
                    gap: 1.75rem;
                }
            }
        `;
        this._shadowRoot.appendChild(style);

        // get the most latest edited note item
        let latest_edited_noteitem = 0;

        // sort by the latest edited first
        const sorted_notes = utils.getNotes(utils.booleanize(this._archive)).sort((a,b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

        // filter query searched notes
        const searched_notes = sorted_notes.filter(v => {
            if (this._search_query === '') return true;
            
            let condition = false;
            const search_regex = new RegExp(this._search_query, 'ig');
            if (search_regex.test(v.title)) condition = true;
            if (search_regex.test(v.body)) condition = true;
            return condition;
        });
        
        searched_notes.forEach((v) => {

            const note_item = document.createElement('note-item');
            note_item.setAttribute('data-noteid', v.id);
            note_item.setAttribute('data-editeddate', typeof v.updatedAt === 'string' ? v.updatedAt : v.createdAt);
            note_item.setAttribute('palette', typeof v.palette === 'number' ? v.palette : Math.floor(Math.random() * utils.note_palette.length));

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


        // send content header the latest edited note item
        document.dispatchEvent(new CustomEvent(utils.event_keys.note_display_header_rerender, { detail: {
            type: utils.booleanize(this._archive) ? 'archived' : 'notes',
            latest_edited_noteitem: latest_edited_noteitem === 0 ? new Date().toISOString() : latest_edited_noteitem,
            found_items: searched_notes.length,
        }}));
    }

}

customElements.define(name, NoteDisplay);