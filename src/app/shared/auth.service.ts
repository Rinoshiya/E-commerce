import { Injectable, signal } from '@angular/core';
import { DEMO_ADMIN_ACCOUNT, DEMO_ADMIN_EMAILS } from './demo-admin-emails';

export type AccountRole = 'user' | 'admin';

export interface DemoAccount {
  name: string;
  email: string;
  role: AccountRole;
}

interface StoredDemoAccount extends DemoAccount {
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly accounts = new Map<string, StoredDemoAccount>();
  readonly currentUser = signal<DemoAccount | null>(null);

  constructor() {
    this.accounts.set(DEMO_ADMIN_ACCOUNT.email, { ...DEMO_ADMIN_ACCOUNT, role: 'admin' });
  }

  register(name: string, email: string, password: string): string | null {
    const normalizedEmail = email.trim().toLowerCase();
    if (this.accounts.has(normalizedEmail)) return 'An account with this email already exists.';

    const role: AccountRole = DEMO_ADMIN_EMAILS
      .map(allowedEmail => allowedEmail.toLowerCase())
      .includes(normalizedEmail) ? 'admin' : 'user';
    const account: StoredDemoAccount = { name: name.trim(), email: normalizedEmail, password, role };

    this.accounts.set(normalizedEmail, account);
    this.currentUser.set({ name: account.name, email: account.email, role: account.role });
    return null;
  }

  login(email: string, password: string): string | null {
    const normalizedEmail = email.trim().toLowerCase();
    const account = this.accounts.get(normalizedEmail);
    if (!account || account.password !== password) return 'Email or password is incorrect.';

    this.currentUser.set({ name: account.name, email: account.email, role: account.role });
    return null;
  }

  logout(): void {
    this.currentUser.set(null);
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }
}
