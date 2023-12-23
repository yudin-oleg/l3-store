import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import { formatPrice, genUUID } from '../../utils/helpers';
import { cartService } from '../../services/cart.service';
import { ProductData } from 'types';

class Checkout extends Component {
  products!: ProductData[];

  async render() {
    this.products = await cartService.get();

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: true });
      productComp.render();
      productComp.attach(this.view.cart);
    });

    const totalPrice = this._getPrice();
    this.view.price.innerText = formatPrice(totalPrice);

    this.view.btnOrder.onclick = this._makeOrder.bind(this);
  }

  private async _makeOrder() {
    await cartService.clear();
    fetch('/api/makeOrder', {
      method: 'POST',
      body: JSON.stringify(this.products)
    });
    window.location.href = '/?isSuccessOrder';
    fetch('/api/sendEvent', {
      method: 'POST',
      body: JSON.stringify({
        type: 'purchase',
        payload: {
          orderId: genUUID(),
          totalPrice: this._getPrice(),
          productIds: this.products.map((product) => product.id),
        },
        timestamp: new Date().getTime(),
      }),
    });
  }

  private _getPrice(){
    return this.products.reduce((acc, product) => (acc += product.salePriceU), 0)
  }
}

export const checkoutComp = new Checkout(html);
