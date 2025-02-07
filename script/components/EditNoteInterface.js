import * as utils from '../utils.js';


const name = 'edit-note-interface'
export default class EditNoteInterface extends HTMLElement {

    constructor() {
        super();
        this._title = this.getAttribute('title');
        this._body = this.getAttribute('body');
        this._body_message = this._title_message = '';
        this._shadowRoot = this.attachShadow({mode:'open'});
        this._has_checked_input = false;
    }

    connectedCallback() {
        this.render();
    }

    _onInputUpdate(shadow_root) {
        const title = shadow_root.querySelector('#title');
        const body = shadow_root.querySelector('#body');
        const title_message = shadow_root.querySelector('#title_message');
        const body_message = shadow_root.querySelector('#body_message');
        const submit_button = shadow_root.querySelector('#submit_button');
        let invalidation_count = 0;


        // title validation
        title_message.innerHTML = '&nbsp;';
        if(parseInt(title.value.length) === 0) title_message.innerHTML = 'Judul tidak boleh kosong';
        if(parseInt(title.value.length) > 26) title_message.innerHTML = 'Judul tidak boleh melebihi 26 karakter';


        // body validation
        body_message.innerHTML = '&nbsp;';
        if(parseInt(body.value.length) === 0) body_message.innerHTML = 'Isi tidak boleh kosong';
        if(parseInt(body.value.length) > 50) body_message.innerHTML = 'Isi tidak boleh melebihi 50 karakter';
    

        // totalize invalidations
        invalidation_count += title_message.innerHTML === '&nbsp;' ? 0 : 1;
        invalidation_count += body_message.innerHTML === '&nbsp;' ? 0 : 1;
        submit_button.disabled = invalidation_count > 0;
    }

    render() {

        const chosen_palette = utils.note_palette[0];

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
            }

            #title {
                display: block;
                padding: .5rem 1.25rem;
                margin: .5rem 0px;
                color: ${chosen_palette[0]};
                font-size: 2.25rem;
                font-weight: 100;
                letter-spacing: 5%;
                width: calc(100% - 2.5rem);
                outline: none;
                border: none;
                border-radius: 10px;
                caret-color: ${chosen_palette[0]}
            }
            #title::placeholder {
                color: ${utils.css_transparent(chosen_palette[0], 20)};
            }
            .divide {
                background-color: ${utils.css_transparent(chosen_palette[0], 30)};
                margin: 1rem 0px;
                height: 2px;
                width: 100%;
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
                height: 18rem;
                width: 100%;
                letter-spacing: 3.5%;
                outline: none;
                border: none;
                border-radius: 10px;
                caret-color: ${chosen_palette[0]}
            }
            #body::placeholder {
                color: ${utils.css_transparent(chosen_palette[0], 20)};
            }
            #body + p {
                margin-top: .5rem;
                width: calc(100% + 1.25rem * 2);
                text-align: right;
            }

            #card_flip {
                position: absolute;
                right: 0;
                bottom: 0;
                width: 6.5rem;
                height: 6.5rem;
                border-radius: 15px 0px 100px 0px;
                background-color: ${chosen_palette[2]};
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
        title.placeholder = 'Title';
        title.addEventListener('input', () => this._onInputUpdate(this._shadowRoot));
        card.appendChild(title);
        
        const title_message = document.createElement('p');
        title_message.id = 'title_message';
        title_message.innerHTML = this._title_message;
        card.appendChild(title_message);


        const content_divide = document.createElement('div');
        content_divide.classList.add('divide');
        card.appendChild(content_divide);
        
        
        const body_wrapper = document.createElement('section');
        body_wrapper.id = 'body_wrapper';

        const body = document.createElement('textarea');
        body.id = 'body';
        body.name = 'body';
        body.value = this._body;
        body.placeholder = 'Body';
        body.addEventListener('input', () => this._onInputUpdate(this._shadowRoot));
        body_wrapper.appendChild(body);
        
        const body_message = document.createElement('p');
        body_message.id = 'body_message';
        body_message.innerHTML = this._body_message;
        body_wrapper.appendChild(body_message);

        card.appendChild(body_wrapper);
        
    

        const card_flip = document.createElement('div');
        card_flip.id = "card_flip";
        card.appendChild(card_flip);

        this._shadowRoot.appendChild(card);
        this._render_count++;

        if(!this._has_checked_input) this._onInputUpdate(this._shadowRoot);
    }

}

customElements.define(name, EditNoteInterface);