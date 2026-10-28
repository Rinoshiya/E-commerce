import { Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';
import { CartService } from '../../shared/cart.service';
import { OrderHistoryService, PlacedOrder } from '../../shared/order-history.service';

@Component({
  selector: 'app-checkout-page',
  imports: [DecimalPipe, FormsModule, RouterLink, InputTextModule, SelectModule, RadioButtonModule, OrderSummaryComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.scss',
})
export class CheckoutPageComponent {
  cart = inject(CartService);
  private orderHistory = inject(OrderHistoryService);
  order: PlacedOrder | null = null;
  emirates = ['Abu Dhabi', 'Ajman', 'Dubai', 'Fujairah', 'Ras Al Khaimah', 'Sharjah', 'Umm Al Quwain']
    .map(emirate => ({ label: emirate, value: emirate }));

  placeOrder(form: NgForm): void {
    if (form.invalid || this.cart.items().length === 0) {
      form.control.markAllAsTouched();
      return;
    }

    const values = form.value;
    this.order = this.orderHistory.add({
      customerName: values.fullName,
      email: values.email,
      phone: values.phone,
      emirate: values.emirate,
      address: values.address,
      paymentMethod: values.payment,
      itemCount: this.cart.count(),
      total: this.cart.subtotal(),
      items: this.cart.items().map(item => ({ ...item })),
    });
    this.cart.clear();
  }
}
