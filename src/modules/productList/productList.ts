import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './productList.tpl.html';
import { ProductData } from 'types';
import { Product } from '../product/product';

export class ProductList {
  view: View;
  products: ProductData[];
  observer: IntersectionObserver;

  constructor() {
    this.products = [];
    this.view = new ViewTemplate(html).cloneView();
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          fetch('/api/sendEvent', {
            method: 'POST',
            body: JSON.stringify({
              type: 'viewCard',
              // @ts-ignore
              payload: {...entry.target.$product , secretKey: entry.target.$secretKey },
              timestamp: new Date().getTime(),
            }),
          });
        }
      })
    });
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(products: ProductData[]) {
    this.products = products;
    this.render();
  }

  render() {
    this.view.root.innerHTML = '';

    this.products.forEach((product) => {
      const productComp = new Product(product);
      productComp.render();
      productComp.attach(this.view.root);
      productComp.observe(this.observer);
    });
  }
}
