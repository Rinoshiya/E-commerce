import { computed, Injectable, signal } from '@angular/core';
import { CartItem, Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>([]);
  readonly count = computed(() => this.items().reduce((total, item) => total + item.qty, 0));
  readonly subtotal = computed(() => this.items().reduce((total, item) => total + item.product.price * item.qty, 0));

  add(product: Product, quantity = 1): void {
    const qty = Math.max(1, Math.floor(quantity));
    this.items.update(items => {
      const existing = items.find(item => item.product.id === product.id);
      if (existing) {
        return items.map(item =>
          item.product.id === product.id ? { ...item, qty: item.qty + qty } : item,
        );
      }

      return [...items, { product, qty }];
    });
  }

  setQuantity(productId: number, quantity: number): void {
    const qty = Math.max(1, Math.floor(quantity));
    this.items.update(items =>
      items.map(item => item.product.id === productId ? { ...item, qty } : item),
    );
  }

  remove(productId: number): void {
    this.items.update(items => items.filter(item => item.product.id !== productId));
  }

  clear(): void {
    this.items.set([]);
  }
}
