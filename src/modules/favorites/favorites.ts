import { Component } from '../component';
import html from './favorites.tpl.html';
import { favoritesService } from '../../services/favorites.service';
import { ProductList } from '../productList/productList';
import { View } from '../../utils/view';
import { ViewTemplate } from '../../utils/viewTemplate';

class Favorites extends Component{
    productList: ProductList;
    view: View;

    constructor(props: any) {
        super(props);

        this.view = new ViewTemplate(html).cloneView();
        this.productList = new ProductList();
        this.productList.attach(this.view.favorites);
    }

    async render() {
        const products = await favoritesService.get();
        this.productList.update(products);
    }
}

export const favoritesComp = new Favorites(html);
