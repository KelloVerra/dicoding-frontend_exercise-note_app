import * as utils from '../utils.js';

const name = 'search-bar';
export default class SearchBar extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    _onSearchQueried() {
        document.dispatchEvent(utils.on_search_queried_event);
    }

    render() {

        const style = document.createElement('style');
        style.textContent = `
            ${name} > #search_input {
                padding: .625rem 1rem .625rem 3.75rem;
                border: none;
                border-radius: 8px;
                outline: none;
                font-family: ${utils.fontfamily};
                font-size: 1.325rem;
                letter-spacing: 7.5%;
                background-color: ${utils.palette.secondary1};
                color: ${utils.css_transparent(utils.palette.primary0, 20)};
                caret-color: ${utils.palette.primary0};
            }
            ${name} > #search_input:focus-visible::placeholder {
                color: ${utils.css_transparent(utils.palette.primary0, 20)};
            }
            ${name} > #search_input:focus-visible {
                color: ${utils.css_transparent(utils.palette.primary0, 75)};
            }
            
            ${name} > img {
                position: absolute;
                width: 1.75rem;
                top: .5rem;
                left: 1.125rem;
                pointer-events: none;
            }
        `;
        this.appendChild(style);


        const search_icon = utils.initImage(0, './assets/searchnote.svg');
        this.appendChild(search_icon);


        const search_input = document.createElement('input');
        search_input.setAttribute('type', 'text');
        search_input.setAttribute('placeholder', 'Cari catatanmu');
        search_input.id = 'search_input';
        search_input.addEventListener('change', () => this._onSearchQueried());
        this.appendChild(search_input);
    }

}

customElements.define(name, SearchBar);