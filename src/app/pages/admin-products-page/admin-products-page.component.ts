import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { CATEGORIES } from '../../data/mock-data';
import { ProductCatalogService } from '../../shared/product-catalog.service';

@Component({
  selector: 'app-admin-products-page',
  imports: [DecimalPipe, FormsModule, InputTextModule, SelectModule, ButtonModule],
  templateUrl: './admin-products-page.component.html',
  styleUrl: './admin-products-page.component.scss',
})
export class AdminProductsPageComponent {
  catalog = inject(ProductCatalogService);
  categories = CATEGORIES.map(category => ({ label: category.label, value: category.slug }));
  message = signal('');

  addProduct(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const { name, category, price, oldPrice, image } = form.value;
    this.catalog.add({
      name: name.trim(),
      category,
      price: Number(price),
      ...(oldPrice ? { oldPrice: Number(oldPrice) } : {}),
      colors: [],
      sizes: [],
      image: image.trim(),
      hoverImage: image.trim(),
    });
    form.resetForm();
    this.message.set('Product added to the catalog.');
  }
}
