import { Component, inject, model } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { CartService } from '../../shared/cart.service';

@Component({
  selector: 'app-mini-cart',
  imports: [DecimalPipe, RouterLink, DrawerModule, ButtonModule, ProgressBarModule],
  templateUrl: './mini-cart.component.html',
  styleUrl: './mini-cart.component.scss',
})
export class MiniCartComponent {
  visible = model(false);
  cart = inject(CartService);
  freeShippingAt = 300;
  get progress(): number { return Math.min(100, Math.round((this.cart.subtotal() / this.freeShippingAt) * 100)); }
}
