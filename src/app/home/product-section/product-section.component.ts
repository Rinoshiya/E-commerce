import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { Product } from '../../models/product';

@Component({
  selector: 'app-product-section',
  imports: [RouterLink, ProductCardComponent],
  templateUrl: './product-section.component.html',
  styleUrl: './product-section.component.scss',
})
export class ProductSectionComponent {
  heading = input.required<string>();
  products = input.required<Product[]>();
  link = input('/shop');
  // TODO: handle (quickAdd) and (toggleWish) from cards
}
