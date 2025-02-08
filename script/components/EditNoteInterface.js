import * as utils from '../utils.js';


const name = 'edit-note-interface'
export default class EditNoteInterface extends HTMLElement {

    constructor() {
        super();
        this._shadowRoot = this.attachShadow({mode:'open'});
    }

    connectedCallback() {
        this._id = atob(this.getAttribute('id'));
        this._title = atob(this.getAttribute('title'));
        this._body = atob(this.getAttribute('body'));
        this._palette = parseInt(atob(this.getAttribute('palette')));
        this._body_message = this._title_message = '';

        this.render();
    }

    _onInputUpdate(shadow_root) {
        const title = shadow_root.querySelector('#title');
        const body = shadow_root.querySelector('#body');
        const title_message = shadow_root.querySelector('#title-message');
        const body_message = shadow_root.querySelector('#body-message');
        const save_button = shadow_root.querySelector('#save-button');
        let invalidation_count = 0;

        const title_content = title.value.trim().replaceAll(/\s+/g, ' ');
        const body_content = body.value.replaceAll(/(?!\n)\s/g, ' ');

        this._title = title_content;
        this._body = body_content;

        const body_element = this._shadowRoot.getElementById('body');


        // title validation
        title_message.innerHTML = '&nbsp;';
        if(parseInt(title_content.length) === 0) title_message.innerHTML = 'Judul tidak boleh kosong';
        if(parseInt(title_content.length) > 19) title_message.innerHTML = `&nbsp;${title_content.length} / 28`;
        if(parseInt(title_content.length) > 28) title_message.innerHTML = 'Judul tidak boleh melebihi 28 karakter';


        // body validation
        body_message.innerHTML = '&nbsp;';
        if(parseInt(body_content.length) === 0) body_message.innerHTML = 'Isi tidak boleh kosong';
        if(parseInt(body_content.length) > 130) body_message.innerHTML = `&nbsp;${body_content.length} / 160`;
        if(parseInt((body_content.match(/\n/g) || []).length) > 4) body_message.innerHTML = 'Isi tidak boleh melebihi 4 linebreak';
        if(parseInt(body_content.length) > 160) body_message.innerHTML = 'Isi tidak boleh melebihi 160 karakter';
        if(body_element.clientHeight < body_element.scrollHeight) body_message.innerHTML = 'Isi terlalu besar';
    

        // totalize invalidations
        invalidation_count += title_message.innerHTML.includes('&nbsp;') ? 0 : 1;
        invalidation_count += body_message.innerHTML.includes('&nbsp;') ? 0 : 1;
        save_button.disabled = invalidation_count > 0;
    }


    _onNoteDelete(ev, root) {
        ev.preventDefault();
        console.log('_onNoteDelete');
    }

    _onNoteAlternateColor(ev, root) {
        ev.preventDefault();
        this._palette = (this._palette + 1) % utils.note_palette.length;
        this.render();
    }

    _onNoteSave(ev, root) {
        ev.preventDefault();
        utils.edit_note_interface.unshow_interface(root._id, root._title, root._body, `${root._palette}`);
    }


    render() {
        this._shadowRoot.innerHTML = '';

        const chosen_palette = utils.note_palette[this._palette];

        const style = document.createElement('style');
        style.textContent = `
            :host {
                position: absolute;
                inset: 0;
                display: flex;
                flex-direction: column;
                justify-content: center;
                margin: 0px;
                width: 100%;
                font-family: ${utils.fontfamily};
                background-color: ${utils.css_transparent(utils.palette.overlay, 65)};
                color: ${chosen_palette[0]};
                z-index: 1;
            }

            #card {
                display: block;
                position: relative;
                margin: 0px auto;
                padding: 1.75rem;
                width: 32rem;
                height: 30rem;
                background-color: ${chosen_palette[1]};
                border-radius: 15px 15px 100px 15px;
                font-family: ${utils.fontfamily};
                z-index: 2;
            }
            p {
                margin: 0px;
                opacity: 45%;
            }

            button {
                border: none;
                outline: none;
                background-color: transparent;
            }

            #title {
                display: block;
                padding: .5rem 1.25rem;
                margin: .5rem 0px;
                color: ${chosen_palette[0]};
                font-family: ${utils.fontfamily};
                font-size: 2.25rem;
                letter-spacing: 7.5%;
                width: calc(100% - 2.5rem);
                outline: none;
                border: none;
                border-radius: 10px;
                caret-color: ${chosen_palette[0]}
            }
            #title::placeholder {
                color: ${utils.css_transparent(chosen_palette[0], 20)};
            }
            hr {
                margin: 1rem 0px;
                height: 2px;
                width: 100%;
                border: none;
                background-color: ${utils.css_transparent(chosen_palette[0], 30)};
            }
            #body_wrapper {
                position: relative;
                width: 22rem;
            }
            #body {
                display: block;
                margin: 0px;
                padding: 1.25rem;
                color: ${chosen_palette[0]};
                font-family: ${utils.fontfamily};
                font-size: 1.25rem;
                font-weight: 100;
                line-height: 145%;
                height: 16.25rem;
                width: 100%;
                letter-spacing: 3.5%;
                outline: none;
                border: none;
                border-radius: 10px;
                caret-color: ${chosen_palette[0]};
                resize: none;
            }
            #body::placeholder {
                color: ${utils.css_transparent(chosen_palette[0], 20)};
            }
            #body + p {
                margin-top: .5rem;
                width: calc(100% + 1.25rem * 2);
                text-align: right;
            }

            #option-wrapper {
                position: absolute;
                right: 0;
                bottom: 0;
                display: flex;
                gap: 3.25rem;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
            }

            #card_flip {
                display:flex;
                flex-direction: column;
                justify-content: center;
                width: 6.5rem;
                height: 6.5rem;
                border-radius: 15px 0px 100px 0px;
                background-color: ${chosen_palette[2]};
            }
            #save-button {
                margin-left: auto;
                margin-right: auto;
                margin-bottom: .5rem;
                padding-right: .5rem;
                stroke: white;
            }
            #save-button:disabled {
                stroke: ${chosen_palette[1]};
            }
            .button_misc {
                margin-right: .5rem;
                padding: 1rem 1rem 1rem 1rem;
                border-radius: 15px;
                stroke: ${utils.css_transparent(chosen_palette[0], 45)};
                transition: background-color 100ms ease-out, scale 70ms ease-out;
            }
            .button_misc:hover {
                background-color: ${utils.css_transparent(chosen_palette[0], 15)};
                scale: 1.05;
            }
            .button_misc:active {
                scale: .95;
            }
        `;
        this._shadowRoot.appendChild(style);
        
        const card = document.createElement('form');
        card.id = 'card';
        

        const title = document.createElement('input');
        title.type = 'text';
        title.id = 'title';
        title.name = 'title';
        title.value = this._title;
        title.placeholder = 'Judul';
        title.addEventListener('input', () => this._onInputUpdate(this._shadowRoot));
        card.appendChild(title);
        
        const title_message = document.createElement('p');
        title_message.id = 'title-message';
        title_message.innerHTML = this._title_message;
        card.appendChild(title_message);


        const content_divide = document.createElement('hr');
        card.appendChild(content_divide);
        
        
        const body_wrapper = document.createElement('section');
        body_wrapper.id = 'body_wrapper';

        const body = document.createElement('textarea');
        body.id = 'body';
        body.name = 'body';
        body.value = this._body;
        body.placeholder = 'Isi Note';
        body.addEventListener('input', () => this._onInputUpdate(this._shadowRoot));
        body_wrapper.appendChild(body);
        
        const body_message = document.createElement('p');
        body_message.id = 'body-message';
        body_message.innerHTML = this._body_message;
        body_wrapper.appendChild(body_message);

        card.appendChild(body_wrapper);


        const option_wrapper = document.createElement('div');
        option_wrapper.id = 'option-wrapper';
        
        const delete_button = document.createElement('button');
        delete_button.id = 'delete-button';
        delete_button.classList.add('button_misc');
        delete_button.addEventListener('click', (e) => this._onNoteDelete(e, this));
        const delete_icon = utils.initImage(1, `
            <svg width="44" height="50" viewBox="0 0 44 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.75 10.3333V39.1778C7.75 41.9158 7.75 43.2839 8.26772 44.3297C8.72312 45.2496 9.44925 45.999 10.343 46.4677C11.3581 47 12.6876 47 15.3427 47H28.6573C31.3124 47 32.64 47 33.6551 46.4677C34.5488 45.999 35.2774 45.2496 35.7328 44.3297C36.25 43.2849 36.25 41.918 36.25 39.1853V10.3333M7.75 10.3333H12.5M7.75 10.3333H3M12.5 10.3333H31.5M12.5 10.3333C12.5 8.0554 12.5 6.91699 12.8616 6.01855C13.3437 4.82064 14.2678 3.86834 15.4316 3.37214C16.3046 3 17.4118 3 19.625 3H24.375C26.5882 3 27.6948 3 28.5677 3.37214C29.7316 3.86834 30.6561 4.82064 31.1382 6.01855C31.4998 6.91699 31.5 8.0554 31.5 10.3333M31.5 10.3333H36.25M36.25 10.3333H41" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `); // from ./assets/deletenote.svg
        delete_button.appendChild(delete_icon);
        
        const alternate_color_button = document.createElement('button');
        alternate_color_button.id = 'alternate_color-button';
        alternate_color_button.classList.add('button_misc');
        alternate_color_button.addEventListener('click', (e) => this._onNoteAlternateColor(e, this));
        const alternate_color_icon = utils.initImage(1, `
            <svg width="39" height="46" viewBox="0 0 39 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.0503 31.8889H3.92761V43M23.9485 14.1111H35.0711V3M3 16.3409C4.24726 13.257 6.33554 10.5845 9.02748 8.62717C11.7194 6.66981 14.9098 5.5056 18.2308 5.2678C21.5519 5.02999 24.871 5.72756 27.8149 7.28136C30.7588 8.83516 33.2053 11.1834 34.8801 14.0581M36 29.6602C34.7527 32.744 32.6645 35.4165 29.9725 37.3739C27.2806 39.3312 24.0934 40.494 20.7724 40.7318C17.4514 40.9696 14.1295 40.2721 11.1856 38.7183C8.24172 37.1645 5.79361 34.8167 4.11879 31.9421" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `); // from ./assets/alternatenote.svg
        alternate_color_button.appendChild(alternate_color_icon);
        
        const save_button = document.createElement('button');
        save_button.type = 'submit';
        save_button.id = 'save-button';
        const save_icon = utils.initImage(1, `
            <svg width="44" height="33" viewBox="0 0 44 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 16.5001L16.0009 29L40 4" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `); // from ./assets/savenote.svg
        save_button.appendChild(save_icon);
            
            
        option_wrapper.appendChild(delete_button);
        option_wrapper.appendChild(alternate_color_button);
        const card_flip = document.createElement('div');
        card_flip.id = "card_flip";
        card_flip.appendChild(save_button);
        option_wrapper.appendChild(card_flip);

        card.addEventListener('submit', (e) => this._onNoteSave(e, this));
        card.appendChild(option_wrapper);
        this._shadowRoot.appendChild(card);

        this._onInputUpdate(this._shadowRoot);  
    }

}

customElements.define(name, EditNoteInterface);