import { Component } from '../component';
import html from './catalog.tpl.html';
import { userService } from '../../services/user.service';

import { ProductList } from '../productList/productList';

class Catalog extends Component {
  productList: ProductList;

  constructor(props: any) {
    super(props);

    this.productList = new ProductList();
    this.productList.attach(this.view.products);
  }

  async render() {
    const productsResp = await fetch('/api/getProducts', {
      headers: {
        'X-User-Id': await userService.getId(),
      }
    })
    const products = await productsResp.json();
    this.productList.update(products);
  }
}

export const catalogComp = new Catalog(html);
