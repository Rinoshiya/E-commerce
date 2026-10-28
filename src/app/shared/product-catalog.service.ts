import { computed, Injectable, signal } from '@angular/core';
import { Product } from '../models/product';
import { PRODUCTS } from '../data/mock-data';

@Injectable({ providedIn: 'root' })
export class ProductCatalogService {
  private readonly addedProducts = signal<Product[]>([]);
  readonly products = computed(() => [...PRODUCTS, ...this.addedProducts()]);
  readonly added = this.addedProducts.asReadonly();

  add(product: Omit<Product, 'id'>): Product {
    const nextId = Math.max(0, ...this.products().map(item => item.id)) + 1;
    const addedProduct = { ...product, id: nextId };
    this.addedProducts.update(products => [...products, addedProduct]);
    return addedProduct;
  }
}
