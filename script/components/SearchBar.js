import * as utils from '../utils.js';


class SearchBar extends HTMLElement {

    static observedAttributes = ['value'];

    constructor() {
        super();
        this.search_query = this.getAttribute('value');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        console.log('hola! from serch bar');
    }

}

customElements.define('search-bar', SearchBar);