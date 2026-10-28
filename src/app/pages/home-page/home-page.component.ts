import { Component, computed, inject } from '@angular/core';
import { HeroComponent } from '../../home/hero/hero.component';
import { CollectionTilesComponent } from '../../home/collection-tiles/collection-tiles.component';
import { ProductSectionComponent } from '../../home/product-section/product-section.component';
import { PerksStripComponent } from '../../home/perks-strip/perks-strip.component';
import { NewsletterComponent } from '../../home/newsletter/newsletter.component';
import { ProductCatalogService } from '../../shared/product-catalog.service';

@Component({
  selector: 'app-home-page',
  imports: [HeroComponent, CollectionTilesComponent, ProductSectionComponent, PerksStripComponent, NewsletterComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent {
  private catalog = inject(ProductCatalogService);
  newIn = computed(() => this.catalog.products().filter(p => p.isNew || p.id < 5).slice(0, 4));
  accessories = computed(() => this.catalog.products().filter(p => ['bags', 'jewellery', 'shoes', 'scarves'].includes(p.category)));
}
