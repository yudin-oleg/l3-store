import localforage from 'localforage';
import { ProductData } from 'types';

const FAV = '__wb-favorites';

class FavoritesService {
    init() {
        this._showHideFavorites();
    }

    async addProduct(product: ProductData) {
        const products = await this.get();
        await this.set([...products, product]);
    }

    async removeProduct(product: ProductData) {
        const products = await this.get();
        await this.set(products.filter(({ id }) => id !== product.id));
    }

    async clear() {
        await localforage.removeItem(FAV);
        this._showHideFavorites();
    }

    async get(): Promise<ProductData[]> {
        return (await localforage.getItem(FAV)) || [];
    }

    async set(data: ProductData[]) {
        await localforage.setItem(FAV, data);
        this._showHideFavorites();
    }

    async isInFav(product: ProductData) {
        const products = await this.get();
        return products.some(({ id }) => id === product.id);
    }

    private async _showHideFavorites() {
        const products = await this.get();
        const favorites = document.querySelector('#favorites');
        if(favorites){
            products.length >= 1 ? favorites.classList.remove('hide') : favorites.classList.add('hide');
        }
    }
}

export const favoritesService = new FavoritesService();
