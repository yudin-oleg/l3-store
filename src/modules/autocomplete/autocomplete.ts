import { ProductData } from 'types';
import { View } from '../../utils/view';
import html from './autocomplete.tpl.html';
import { ViewTemplate } from '../../utils/viewTemplate';

export class Autocomplete {
    view: View;

    constructor() {
        this.view = new ViewTemplate(html).cloneView();
    }

    attach($root: HTMLElement) {
        $root.appendChild(this.view.root);
    }

    async render() {
        const productsResp = await fetch('/api/getProducts');
        const products: ProductData[] = await productsResp.json();
        const autocompletes = products.slice(0, 3).map(product => product.name);
        const proposalEl = document.createElement("span");
        proposalEl.innerText = "Например, ";
        this.view.root.appendChild(proposalEl);
        let i = 0;
        autocompletes.forEach(autocomplete => {
            const autocompleteEl = document.createElement("a");
            autocompleteEl.innerText = autocomplete;
            this.view.root.appendChild(autocompleteEl);
            if(i === 0){
                const separationEl = document.createElement("span");
                separationEl.innerText = ", ";
                this.view.root.appendChild(separationEl);
            }else if(i === 1){
                const separationEl = document.createElement("span");
                separationEl.innerText = " или ";
                this.view.root.appendChild(separationEl);
            }
            i++;
        });
    }
}