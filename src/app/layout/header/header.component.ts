import { Component, inject, output, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { map } from 'rxjs';
import { DatePipe, DecimalPipe } from '@angular/common';
import { WishlistService } from '../../shared/wishlist.service';
import { CartService } from '../../shared/cart.service';
import { OrderHistoryService } from '../../shared/order-history.service';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-header',
  imports: [DatePipe, DecimalPipe, RouterLink, ButtonModule, BadgeModule, InputTextModule, IconFieldModule, InputIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  bagClick = output<void>();
  bag = inject(CartService);
  orderHistory = inject(OrderHistoryService);
  auth = inject(AuthService);
  profileOpen = signal(false);
  wishlist = inject(WishlistService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  searchQuery = toSignal(
    this.route.queryParamMap.pipe(map(params => params.get('q') ?? '')),
    { initialValue: '' },
  );
  links = [
    { label: 'Dresses', slug: 'dresses' }, { label: 'Bags', slug: 'bags' },
    { label: 'Jewellery', slug: 'jewellery' }, { label: 'Shoes', slug: 'shoes' }, { label: 'Scarves', slug: 'scarves', sale: "Red" },
  ];

  search(value: string): void {
    const q = value.trim();
    this.router.navigate(['/shop'], { queryParams: { q: q || null } });
  }

  clearSearchFilter(value: string): void {
    if (value.trim()) return;

    const urlTree = this.router.parseUrl(this.router.url);
    if (!('q' in urlTree.queryParams)) return;

    delete urlTree.queryParams['q'];
    this.router.navigateByUrl(urlTree);
  }
}
