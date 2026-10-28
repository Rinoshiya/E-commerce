import { Component } from '@angular/core';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-product-skeleton',
  imports: [SkeletonModule],
  templateUrl: './product-skeleton.component.html',
  styleUrl: './product-skeleton.component.scss',
})
export class ProductSkeletonComponent {
  items = Array.from({ length: 8 });
}
