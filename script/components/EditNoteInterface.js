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
        this._archive = utils.booleanize(atob(this.getAttribute('archive')));
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
        document.dispatchEvent(new CustomEvent(utils.event_keys.delete_note, {detail: root._id}));
    }

    _onNoteAlternateColor(ev, root) {
        ev.preventDefault();
        root._palette = (root._palette + 1) % utils.note_palette.length;
        root.render();
    }

    _onNoteArchive(ev, root) {
        ev.preventDefault();
        root._archive = !root._archive;
        root.render();
    }

    _onNoteSave(ev, root) {
        ev.preventDefault();
        document.dispatchEvent(new CustomEvent(utils.event_keys.save_noteedit_interface, { 
            detail: {
                note_id: root._id,
                note_archive: root._archive,
                note_new_title: root._title,
                note_new_body: root._body,
                note_new_palette: `${root._palette}`,
            }
        }));
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
                --primary-color: ${chosen_palette[0]};
                --secondary-color: ${chosen_palette[1]};
                --tertiary-color: ${chosen_palette[2]};
                z-index: 1;
            }

            #card {
                display: block;
                position: relative;
                margin: 0px auto;
                padding: 1.75rem;
                width: 32rem;
                height: 30rem;
                background-color: var(--secondary-color);
                border-radius: 15px 15px 100px 15px;
                font-family: ${utils.fontfamily};
                z-index: 2;
            }
            p {
                margin: 0px;
                opacity: 45%;
                color: var(--primary-color);
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
                color: var(--primary-color);
                font-family: ${utils.fontfamily};
                font-size: 2.25rem;
                letter-spacing: 7.5%;
                width: calc(100% - 2.5rem);
                outline: none;
                border: none;
                border-radius: 10px;
                caret-color: var(--primary-color)
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
                color: var(--primary-color);
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
                caret-color: var(--primary-color);
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
                gap: 1rem;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
            }

            #card-flip {
                margin-top: .325rem;
                display:flex;
                flex-direction: column;
                justify-content: center;
                width: 6.5rem;
                height: 6.5rem;
                border-radius: 15px 0px 100px 0px;
                background-color: var(--tertiary-color);
            }
            #save-button {
                margin-left: auto;
                margin-right: auto;
                margin-bottom: .5rem;
                padding-right: .5rem;
                width: 5rem;
                height: 5rem;
                stroke: white;
                transition: scale 75ms ease-in;
            }
            #save-button:hover {
                scale: 1.25;
            }
            #save-button:disabled {
                scale: 1;
                stroke: var(--secondary-color);
            }
            .button_misc {
                margin-right: .5rem;
                padding: .625rem .75rem;
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

            @media screen and (max-width: ${utils.responsive_thresholds[1]}) {
                #card {
                    width: 20rem;
                    height: 23rem;
                    padding: 1.25rem;
                }      
                p {
                    font-size: .85rem;
                }

                #title {
                    font-size: 1.75rem;
                    margin: .125rem 0px;
                }
                
                hr {
                    margin: 1rem 0px;
                }
                
                #body_wrapper {
                    width: 16.5rem;
                }

                #body {
                    font-size: .8rem;
                    height: 9.125rem;
                    scrollbar-width: thin;
                }
                    
                #body + p {
                    margin-top: .125rem;
                }

                #option-wrapper {
                    gap: .125rem;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                }
                #card-flip {
                    width: 4.5rem;
                    height: 4.5rem;
                    translate: -5px -5px;
                    margin-left: 1.25rem;
                    border-radius: 15px 0px 100px 0px;
                }
                #save-button {
                    scale: .625;
                    width: 4rem;
                }
                #save-button:hover {
                    scale: .75;
                }
                #save-button:disabled {
                    scale: .625;
                }

                .button_misc {
                    scale: .75;
                }
                .button_misc:hover {
                    scale: .8;
                }
                .button_misc:active {
                    scale: .7;
                }
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
        delete_button.type = 'button';
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
        alternate_color_button.type = 'button';
        alternate_color_button.classList.add('button_misc');
        alternate_color_button.addEventListener('click', (e) => this._onNoteAlternateColor(e, this));
        const alternate_color_icon = utils.initImage(1, `
            <svg width="56" height="56" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 8.5H15.51M10.5 7.5H10.51M7.5 11.5H7.51M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 13.6569 19.6569 15 18 15H17.4C17.0284 15 16.8426 15 16.6871 15.0246C15.8313 15.1602 15.1602 15.8313 15.0246 16.6871C15 16.8426 15 17.0284 15 17.4V18C15 19.6569 13.6569 21 12 21ZM16 8.5C16 8.77614 15.7761 9 15.5 9C15.2239 9 15 8.77614 15 8.5C15 8.22386 15.2239 8 15.5 8C15.7761 8 16 8.22386 16 8.5ZM11 7.5C11 7.77614 10.7761 8 10.5 8C10.2239 8 10 7.77614 10 7.5C10 7.22386 10.2239 7 10.5 7C10.7761 7 11 7.22386 11 7.5ZM8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5Z" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `); // from ./assets/alternatecolornote.svg
        alternate_color_button.appendChild(alternate_color_icon);
        
        const archive_button = document.createElement('button');
        archive_button.id = 'archive-button';
        archive_button.type = 'button';
        archive_button.classList.add('button_misc');
        archive_button.addEventListener('click', (e) => this._onNoteArchive(e, this));

        const archive_icon = this._archive ?
        utils.initImage(1, `
            <svg width="44" height="43" viewBox="0 0 44 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.11111 16.6974L18.005 26.468L18.0093 26.4716C19.441 27.5252 20.1573 28.0522 20.9418 28.2559C21.6353 28.4358 22.3642 28.4358 23.0576 28.2559C23.8428 28.0521 24.5612 27.5234 25.9954 26.468L38.8889 16.6974M38.4671 14.6625L26.6469 5.16586C25.1793 3.98671 24.4448 3.39733 23.6287 3.16328C22.9086 2.95677 22.1461 2.94583 21.4206 3.13225C20.5983 3.34353 19.8485 3.9121 18.3489 5.05001L5.68012 14.663C4.69691 15.4091 4.20593 15.7823 3.85145 16.2538C3.53749 16.6714 3.30352 17.1437 3.16096 17.6468C3 18.2149 3 18.8335 3 20.0704V33.2213C3 35.5942 3 36.7812 3.46019 37.6875C3.86499 38.4848 4.51044 39.1325 5.3049 39.5387C6.2072 40 7.38899 40 9.74903 40H34.251C36.611 40 37.7911 40 38.6934 39.5387C39.4879 39.1325 40.1355 38.4843 40.5403 37.6871C41 36.7816 41 35.5968 41 33.2286V19.9311C41 18.7508 41 18.157 40.8495 17.6085C40.7153 17.1194 40.4924 16.6585 40.1957 16.2476C39.8609 15.7839 39.3974 15.41 38.4671 14.6625Z" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `) : // from ./assets/unarchivenote.svg
        utils.initImage(1, `
            <svg width="54" height="41" viewBox="0 0 54 41" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.6244 11.0769H41.3777M12.6244 11.0769C11.1333 11.0769 10.3859 11.0769 9.81642 11.3704C9.31547 11.6285 8.90847 12.0401 8.65323 12.5466C8.36305 13.1226 8.36305 13.877 8.36305 15.3849V29.3849C8.36305 32.4005 8.36305 33.9086 8.9434 35.0605C9.4539 36.0737 10.2679 36.8974 11.2698 37.4137C12.4077 38 13.898 38 16.8743 38H37.1237C40.0999 38 41.5881 38 42.726 37.4137C43.7279 36.8974 44.5456 36.0735 45.0561 35.0603C45.6359 33.9096 45.6359 32.4044 45.6359 29.3946V15.3604C45.6359 13.8689 45.6359 13.1194 45.3473 12.5466C45.092 12.0401 44.6832 11.6285 44.1822 11.3704C43.6127 11.0769 42.8687 11.0769 41.3777 11.0769M12.6244 11.0769H8.29731C6.03673 11.0769 4.9071 11.0769 4.26553 10.6773C3.40936 10.144 2.92393 9.16752 3.00976 8.15435C3.07413 7.39447 3.74699 6.47547 5.09492 4.63529C5.48478 4.10306 5.67976 3.83687 5.91839 3.63364C6.23658 3.36265 6.61415 3.17021 7.01888 3.07295C7.32242 3 7.64822 3 8.30325 3H45.6942C46.3493 3 46.6759 3 46.9795 3.07295C47.3842 3.17021 47.7616 3.36265 48.0798 3.63364C48.3185 3.83687 48.5141 4.10181 48.904 4.63405C50.2519 6.4742 50.9259 7.39432 50.9903 8.1542C51.0761 9.16737 50.5889 10.144 49.7327 10.6773C49.0912 11.0769 47.9589 11.0769 45.6983 11.0769H41.3777M21.6748 24.5385H32.3241" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `); // from ./assets/archivenote.svg

        archive_button.appendChild(archive_icon);
        
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
        option_wrapper.appendChild(archive_button);
        const card_flip = document.createElement('div');
        card_flip.id = "card-flip";
        card_flip.appendChild(save_button);
        option_wrapper.appendChild(card_flip);

        card.addEventListener('submit', (e) => this._onNoteSave(e, this));
        card.appendChild(option_wrapper);
        this._shadowRoot.appendChild(card);

        this._onInputUpdate(this._shadowRoot);  
    }

}

customElements.define(name, EditNoteInterface);