import * as utils from '../utils.js';


const name = 'content-header';
export default class ContentHeader extends HTMLElement {

    constructor() {
        super();
        this._type = this.getAttribute('type');
    }

    connectedCallback() {
        this.render();
    }

    render() {

        const style = document.createElement('style');
        style.textContent = `            
            ${name} > h1 {
                display: inline;
                margin: 0px;
                color: ${utils.css_transparent(utils.palette.primary0, 65)};
                font-weight: 100;
                font-size: 2.5rem;
                letter-spacing: 5%;
            }
                
            ${name} > h2 {
                display: inline;
                margin: 0px;
                margin-inline-start: 2rem;
                color: ${utils.css_transparent(utils.palette.primary0, 20)};
                font-weight: 100;
                font-size: 1.5rem;
                letter-spacing: 5%;
            }

            ${name} > p {
                display: inline;
                margin: 0px;
                color: ${utils.css_transparent(utils.palette.primary0, 50)};
                font-size: 1.125rem;
                letter-spacing: 2.5%;
            }
                
            ${name} > .header-content-divide {
                background-color: ${utils.css_transparent(utils.palette.primary0, 20)};
                margin-top: .75rem;
                margin-bottom: 1.75rem;
                height: 1px;
                width: 100%;
            }
        `;
        this.appendChild(style);


        const header_name = document.createElement('h1');
        header_name.innerText = this._type === 'notes' ? 'My Notes' : 'Archived Notes';
        this.appendChild(header_name);


        const header_count = document.createElement('h2');
        header_count.innerText = this._type === 'notes' ? `(${utils.getNotes(false).length})` : `(${utils.getNotes(true).length})`;
        this.appendChild(header_count);
        

        const header_edit = document.createElement('p');
        header_edit.innerText = `Terakhir diedit ${30} yang lalu`;
        this.appendChild(header_edit);


        const content_divide = document.createElement('div');
        content_divide.classList.add('header-content-divide');
        this.appendChild(content_divide);
    }

}

customElements.define(name, ContentHeader);