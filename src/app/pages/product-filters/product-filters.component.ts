import { Component, computed, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { CheckboxModule } from 'primeng/checkbox';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../models/product';

export interface ProductFilters {
  sizes: string[];
  priceRange: [number, number];
  offerRange: [number, number];
  onSale: boolean;
}

export const DEFAULT_PRODUCT_FILTERS: ProductFilters = {
  sizes: [],
  priceRange: [0, 2000],
  offerRange: [0, 100],
  onSale: false,
};

@Component({
  selector: 'app-product-filters',
  imports: [FormsModule, SliderModule, CheckboxModule, SelectButtonModule, ButtonModule],
  templateUrl: './product-filters.component.html',
  styleUrl: './product-filters.component.scss',
})
export class ProductFiltersComponent {
  products = input.required<Product[]>();
  filters = model.required<ProductFilters>();

  sizes = computed(() => {
    const sizes = new Set(this.products().flatMap(product => product.sizes));
    return [...sizes].sort((a, b) => {
      const aNumber = Number(a);
      const bNumber = Number(b);
      return Number.isNaN(aNumber) || Number.isNaN(bNumber)
        ? a.localeCompare(b)
        : aNumber - bNumber;
    });
  });

  update<K extends keyof ProductFilters>(key: K, value: ProductFilters[K]): void {
    this.filters.update(filters => ({ ...filters, [key]: value }));
  }

  clear(): void {
    this.filters.set({ ...DEFAULT_PRODUCT_FILTERS, sizes: [], priceRange: [0, 2000], offerRange: [0, 100] });
  }
}
