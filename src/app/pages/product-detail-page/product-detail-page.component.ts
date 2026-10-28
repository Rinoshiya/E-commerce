import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GalleriaModule } from 'primeng/galleria';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { AccordionModule } from 'primeng/accordion';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ColorSwatchesComponent } from '../../shared/color-swatches/color-swatches.component';
import { ProductSectionComponent } from '../../home/product-section/product-section.component';
import { PRODUCTS, CATEGORIES } from '../../data/mock-data';
import { WishlistService } from '../../shared/wishlist.service';
import { ProductCatalogService } from '../../shared/product-catalog.service';
import { CartService } from '../../shared/cart.service';
import { map } from 'rxjs';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-product-detail-page',
  imports: [DecimalPipe, FormsModule, GalleriaModule, SelectButtonModule, InputNumberModule, ButtonModule, TagModule, AccordionModule, BreadcrumbModule, ColorSwatchesComponent, ProductSectionComponent],
  templateUrl: './product-detail-page.component.html',
  styleUrl: './product-detail-page.component.scss',
})
export class ProductDetailPageComponent {
  private wishlist = inject(WishlistService);
  private catalog = inject(ProductCatalogService);
  private cart = inject(CartService);
  private route = inject(ActivatedRoute);
  private productId = toSignal(this.route.paramMap.pipe(map(params => params.get('id'))), { initialValue: null });
  product = computed(() => this.catalog.products().find(product => product.id === Number(this.productId())) ?? PRODUCTS[0]);
  wishlisted = computed(() => this.wishlist.has(this.product().id));
  related = computed(() => this.catalog.products().filter(product => product.id !== this.product().id).slice(0, 4));
  selectedColor = signal<string | null>(null);
  selectedSize = signal<string | null>(null);
  qty = signal(1);
  crumbs = computed<MenuItem[]>(() => [
    { label: 'Home', routerLink: '/' },
    { label: CATEGORIES.find(category => category.slug === this.product().category)?.label ?? 'Shop', routerLink: ['/shop', this.product().category] },
    { label: this.product().name },
  ]);
  images = computed(() => [{ src: this.product().image, alt: this.product().name }]);

  toggleWishlist(): void {
    this.wishlist.toggle(this.product());
  }

  addToBag(): void {
    this.cart.add(this.product(), this.qty());
  }
}
