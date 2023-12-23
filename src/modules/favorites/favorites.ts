import { Component } from '../component';
import { Product } from '../product/product';
import html from './favorites.tpl.html';
// import { formatPrice } from '../../utils/helpers';
import { favoritesService } from '../../services/favorites.service';
import { ProductData } from 'types';

class Favorites extends Component {
    products!: ProductData[];

    async render() {
        // await favoritesService.clear();
        this.products = await favoritesService.get();

        if (this.products.length < 1) {
            this.view.root.classList.add('is__empty');
            return;
        }

        this.products.forEach((product) => {
        const productComp = new Product(product, { isHorizontal: true });
        productComp.render();
        productComp.attach(this.view.favorites);
        });

        // const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
        // this.view.price.innerText = formatPrice(totalPrice);

        // this.view.btnOrder.onclick = this._makeOrder.bind(this);
    }

    // private async _makeOrder() {
    //     await cartService.clear();
    //     fetch('/api/makeOrder', {
    //     method: 'POST',
    //     body: JSON.stringify(this.products)
    //     });
    //     window.location.href = '/?isSuccessOrder';
    // }
}

export const favoritesComp = new Favorites(html);
