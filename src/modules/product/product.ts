import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { formatPrice } from '../../utils/helpers'
import html from './product.tpl.html';
import { ProductData } from 'types';

type ProductComponentParams = { [key: string]: any };

export class Product {
  view: View;
  product: ProductData;
  params: ProductComponentParams;

  constructor(product: ProductData, params: ProductComponentParams = {}) {
    this.product = product;
    this.params = params;
    this.view = new ViewTemplate(html).cloneView();
    this.getSecretKey();
  }

  attach($root: HTMLElement) {
    // @ts-ignore
    this.view.root.$product = this.product;
    $root.appendChild(this.view.root);
  }

  render() {
    const { id, name, src, salePriceU } = this.product;

    this.view.root.setAttribute('href', `/product?id=${id}`);
    this.view.img.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.price.innerText = formatPrice(salePriceU);

    if (this.params.isHorizontal) this.view.root.classList.add('is__horizontal')
  }

  observe(observer: IntersectionObserver){
    observer.observe(this.view.root);
  }

  async getSecretKey(){
    fetch(`/api/getProductSecretKey?id=${this.product.id}`)
      .then((res) => res.json())
      .then((secretKey) => {
        // @ts-ignore
        this.view.root.$secretKey = secretKey;
      });
  }
}