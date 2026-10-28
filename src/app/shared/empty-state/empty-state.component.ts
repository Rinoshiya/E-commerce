import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-empty-state',
  imports: [RouterLink, ButtonModule],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
})
export class EmptyStateComponent {
  icon = input('pi pi-heart');
  heading = input('Nothing here yet');
  message = input('');
  actionLabel = input('');
  actionLink = input('/shop');
}
