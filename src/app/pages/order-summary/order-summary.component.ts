import { Component, input, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-summary',
  imports: [DecimalPipe, FormsModule, ButtonModule, InputTextModule, CheckboxModule],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss',
})
export class OrderSummaryComponent {
  subtotal = input(0);
  shipping = input(0);
  discount = input(0);
  showExtras = input(true);
  giftWrap = signal(false);
}
