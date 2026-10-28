import { Component, inject } from '@angular/core';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { WishlistService } from '../../shared/wishlist.service';

@Component({
  selector: 'app-wishlist-page',
  imports: [ProductCardComponent, EmptyStateComponent],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.scss',
})
export class WishlistPageComponent {
  wishlist = inject(WishlistService);
}
