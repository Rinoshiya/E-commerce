import { Injectable, signal } from '@angular/core';
import { CartItem } from '../models/product';

export interface PlacedOrder {
  id: string;
  placedAt: Date;
  customerName: string;
  email: string;
  phone: string;
  emirate: string;
  address: string;
  paymentMethod: string;
  itemCount: number;
  total: number;
  items: CartItem[];
}

@Injectable({ providedIn: 'root' })
export class OrderHistoryService {
  readonly orders = signal<PlacedOrder[]>([]);

  add(order: Omit<PlacedOrder, 'id' | 'placedAt'>): PlacedOrder {
    const placedOrder: PlacedOrder = {
      ...order,
      id: `AA-${Date.now().toString(36).toUpperCase()}`,
      placedAt: new Date(),
    };
    this.orders.update(orders => [placedOrder, ...orders]);
    return placedOrder;
  }
}
