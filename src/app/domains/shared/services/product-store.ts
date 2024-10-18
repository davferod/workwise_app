import { Injectable, computed, signal } from '@angular/core';
import { Product } from '@shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductStore {

  products = signal<Product[]>([]);
  originalData = signal<Product[]>([]);

  total = computed(() => {
    const productos = this.products();
    return productos.reduce((acc, product) => acc + product.price, 0);
  });

  constructor() { }

  setProducts(products: Product[]): void {
    this.products.set(products);
    this.originalData.set(products);
  }

  updateProduct(index: number): void {
    this.products.update((prevState) => {
      return prevState.map((prevProduct) => {
        if (prevProduct.id === index) {
          return { ...prevProduct, price: 20};
        }
        return prevProduct;
      });
    });
  }

  findProduct(query: string): void {
    const filteredProducts = this.originalData().filter((product) => {
      return product.title.toLowerCase().includes(query.toLowerCase())
        || product.price == Number(query)
    });
    this.products.set(filteredProducts);
  }
}
