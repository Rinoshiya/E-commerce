import { Component, computed, inject, input, output } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { Product } from '../../models/product';
import { ColorSwatchesComponent } from '../color-swatches/color-swatches.component';
import { WishlistService } from '../wishlist.service';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-card',
  imports: [DecimalPipe, RouterLink, ButtonModule, TagModule, ColorSwatchesComponent],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent {
  product = input.required<Product>();
  quickAdd = output<Product>();
  private wishlist = inject(WishlistService);
  private cart = inject(CartService);
  wishlisted = computed(() => this.wishlist.has(this.product().id));

  get discount(): number {
    const p = this.product();
    return p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
  }

  toggleWishlist(): void {
    this.wishlist.toggle(this.product());
  }

  quickAddToCart(): void {
    this.cart.add(this.product());
    this.quickAdd.emit(this.product());
  }
}
