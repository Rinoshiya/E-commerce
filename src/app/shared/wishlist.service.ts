import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../models/product';
import { ProductCatalogService } from './product-catalog.service';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private readonly catalog = inject(ProductCatalogService);
  private readonly savedIds = signal<number[]>([]);
  readonly products = computed(() => this.catalog.products().filter(product => this.savedIds().includes(product.id)));
  readonly count = computed(() => this.savedIds().length);

  has(productId: number): boolean {
    return this.savedIds().includes(productId);
  }

  add(product: Product): void {
    this.savedIds.update(ids => ids.includes(product.id) ? ids : [...ids, product.id]);
  }

  toggle(product: Product): void {
    this.savedIds.update(ids =>
      ids.includes(product.id)
        ? ids.filter(id => id !== product.id)
        : [...ids, product.id],
    );
  }
}
