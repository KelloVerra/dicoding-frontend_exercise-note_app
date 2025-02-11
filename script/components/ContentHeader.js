import * as utils from '../utils.js';


const name = 'content-header';
export default class ContentHeader extends HTMLElement {

    constructor() {
        super();
        this._type = this.getAttribute('type');
    }

    connectedCallback() {        
        utils.storageReady();

        this.render(
            this._type,
            new Date().getTime(), 
            this._type === 'notes' ? utils.getNotes(false).length : utils.getNotes(true).length
        );


        document.addEventListener(utils.event_keys.note_display_header_rerender, (e) => this.render(e.detail.type, e.detail.latest_edited_noteitem, e.detail.found_items));
    }

    render(render_type, latest_edited_noteitem_time, note_count) {
        if (render_type !== this._type) return;
        
        this.innerHTML = '';

        const style = document.createElement('style');
        style.textContent = `
            ${name} > .header-wrapper {
                display: flex;
                justify-content: space-between;
                align-items: baseline;
            }

            ${name} h1 {
                display: inline;
                margin: 0px;
                color: ${utils.css_transparent(utils.palette.primary0, 65)};
                font-weight: 100;
                font-size: 2.5rem;
                letter-spacing: 5%;
            }
                
            ${name} h2 {
                display: inline;
                margin: 0px;
                margin-inline-start: 2rem;
                color: ${utils.css_transparent(utils.palette.primary0, 20)};
                font-weight: 100;
                font-size: 1.5rem;
                letter-spacing: 5%;
            }

            ${name} p {
                display: inline;
                margin: 0px;
                height: fit-content;
                color: ${utils.css_transparent(utils.palette.primary0, 50)};
                font-size: 1.125rem;
                letter-spacing: 2.5%;
            }
                
            ${name} hr {
                height: 2px;
                width: 100%;
                margin-top: .75rem;
                margin-bottom: 1.75rem;
                border: none;
                background-color: ${utils.css_transparent(utils.palette.primary0, 20)};
            }

            @media screen and (max-width: ${utils.responsive_thresholds[0]}) {
                ${name} h1 {
                    font-size: 2rem;
                    letter-spacing: 4%;
                }
                    
                ${name} h2 {
                    margin-inline-start: 1rem;
                    font-size: 1rem;
                    letter-spacing: 3%;
                }

                ${name} p {
                    font-size: 1rem;
                    letter-spacing: 3%;
                    max-width: 10rem;
                    text-align: right;
                    translate: 0px -.5rem;
                }
            }
        `;
        this.appendChild(style);

        const header_wrapper = document.createElement('div');
        header_wrapper.classList.add('header-wrapper');

        
        const left_header_wrapper = document.createElement('div');
        left_header_wrapper.classList.add('left-header-wrapper');

        const header_name = document.createElement('h1');
        header_name.innerText = render_type === 'notes' ? 'My Notes' : 'Archived Notes';
        left_header_wrapper.appendChild(header_name);

        const header_count = document.createElement('h2');
        header_count.innerText = `(${note_count})`;
        left_header_wrapper.appendChild(header_count);

        header_wrapper.appendChild(left_header_wrapper);
        

        const header_edit = document.createElement('p');
        header_edit.innerText = `Terakhir diedit ${utils.formatEditDate2IdealTimeRange(new Date(latest_edited_noteitem_time).toISOString())}`;
        header_wrapper.appendChild(header_edit);
        this.appendChild(header_wrapper);


        const content_divide = document.createElement('hr');
        this.appendChild(content_divide);
    }

}

customElements.define(name, ContentHeader);