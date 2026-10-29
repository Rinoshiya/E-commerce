import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-newsletter',
  imports: [FormsModule, InputTextModule, ButtonModule],
  templateUrl: './newsletter.component.html',
  styleUrl: './newsletter.component.scss',
})
export class NewsletterComponent {
  email = signal('');
}
