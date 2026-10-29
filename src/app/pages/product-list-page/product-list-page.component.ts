import { Component, computed, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { PaginatorModule } from 'primeng/paginator';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { ProductFiltersComponent } from '../product-filters/product-filters.component';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';
import { ProductSkeletonComponent } from '../../shared/product-skeleton/product-skeleton.component';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state.component';
import { CATEGORIES } from '../../data/mock-data';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { ProductCatalogService } from '../../shared/product-catalog.service';
import { Product } from '../../models/product';
import { DEFAULT_PRODUCT_FILTERS, ProductFilters } from '../product-filters/product-filters.component';

type ProductSort = 'newest' | 'price-asc' | 'price-desc';

@Component({
  selector: 'app-product-list-page',
  imports: [FormsModule, SelectModule, PaginatorModule, BreadcrumbModule, DrawerModule, ButtonModule, ProductFiltersComponent, ProductCardComponent, ProductSkeletonComponent, EmptyStateComponent],
  templateUrl: './product-list-page.component.html',
  styleUrl: './product-list-page.component.scss',
})
export class ProductListPageComponent {
  loading = false;
  filtersOpen = signal(false);

  sortOptions = [
    { label: 'Newest', value: 'newest' }, { label: 'Price: low to high', value: 'price-asc' }, { label: 'Price: high to low', value: 'price-desc' },
  ];
  sort = signal<ProductSort>('newest');
  first = signal(0);
  rows = 12;
  filters = signal<ProductFilters>({
    ...DEFAULT_PRODUCT_FILTERS,
    sizes: [],
    priceRange: [...DEFAULT_PRODUCT_FILTERS.priceRange],
    offerRange: [...DEFAULT_PRODUCT_FILTERS.offerRange],
  });
  category = input<string>();
  router = inject(Router);
  route = inject(ActivatedRoute);
  catalog = inject(ProductCatalogService);
  q = toSignal(this.route.queryParamMap.pipe(map(params => params.get('q') ?? '')), { initialValue: '' });

  crumbs = computed<MenuItem[]>(() => {
    const slug = this.category();
    const label = CATEGORIES.find(c => c.slug === slug)?.label;

    return [
      { label: 'Home', routerLink: '/' },
      { label: 'Shop', routerLink: slug ? '/shop' : undefined },
      ...(label ? [{ label }] : []),
    ];
  });

  products = computed(() => {
    const slug = this.category();
    const term = this.q().trim().toLowerCase();
    const { sizes, priceRange, offerRange, onSale } = this.filters();

    const filtered = this.catalog.products().filter(p => {
      const matchesRouteCategory = !slug || p.category === slug;
      const matchesSize = sizes.length === 0 || sizes.some(size => p.sizes.includes(size));
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const discount = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;
      const matchesOffer = discount >= offerRange[0] && discount <= offerRange[1];
      const matchesSale = !onSale || Boolean(p.oldPrice);
      const productText = `${p.name} ${p.category}`.toLowerCase();
      const matchesSearch = !term || productText.includes(term);

      return matchesRouteCategory
        && matchesSize
        && matchesPrice
        && matchesOffer
        && matchesSale
        && matchesSearch;
    });

    return filtered.sort((a, b) => this.compareProducts(a, b, this.sort()));
  });

  visibleProducts = computed(() => this.products().slice(this.first(), this.first() + this.rows));

  private compareProducts(a: Product, b: Product, sort: ProductSort): number {
    switch (sort) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'newest':
        return b.id - a.id;
    }
  }

  updateFilters(filters: ProductFilters): void {
    this.filters.set(filters);
    this.first.set(0);
  }

  onPageChange(event: { first?: number }): void {
    this.first.set(event.first ?? 0);
  }

  title = computed(() => {
    const term = this.q().trim();
    if (term) return `Results for "${term}"`;
    return CATEGORIES.find(c => c.slug === this.category())?.label ?? 'All products';
  });
}
