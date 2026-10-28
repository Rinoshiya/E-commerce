import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { CartService } from '../../shared/cart.service';
import { WishlistService } from '../../shared/wishlist.service';

@Component({
  selector: 'app-cart-page',
  imports: [DecimalPipe, RouterLink, ButtonModule, ProgressBarModule, OrderSummaryComponent, EmptyStateComponent],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss',
})
export class CartPageComponent {
  cart = inject(CartService);
  private wishlist = inject(WishlistService);
  freeShippingAt = 300;
  get progress(): number { return Math.min(100, Math.round((this.cart.subtotal() / this.freeShippingAt) * 100)); }

  moveToWishlist(productId: number): void {
    const item = this.cart.items().find(cartItem => cartItem.product.id === productId);
    if (!item) return;

    this.wishlist.add(item.product);
    this.cart.remove(productId);
  }
}
