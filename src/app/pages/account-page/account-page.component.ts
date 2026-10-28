import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-account-page',
  imports: [FormsModule, RouterLink, InputTextModule, ButtonModule],
  templateUrl: './account-page.component.html',
  styleUrl: './account-page.component.scss',
})
export class AccountPageComponent {
  auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  mode = signal<'login' | 'signup'>('login');
  error = signal('');
  notice = signal(this.route.snapshot.queryParamMap.has('accessDenied')
    ? 'Admin access is limited to approved admin accounts.'
    : '');

  setMode(mode: 'login' | 'signup'): void {
    this.mode.set(mode);
    this.error.set('');
  }

  submit(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    const { name, email, password } = form.value;
    const error = this.mode() === 'signup'
      ? this.auth.register(name, email, password)
      : this.auth.login(email, password);

    if (error) {
      this.error.set(error);
      return;
    }

    this.error.set('');
    void this.router.navigateByUrl(this.auth.isAdmin() ? '/admin/products' : '/');
  }

  logout(): void {
    this.auth.logout();
    this.notice.set('You have been signed out.');
  }
}
