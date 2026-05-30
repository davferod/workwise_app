import { Injectable, computed, signal } from '@angular/core';
import { AuthUser } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {

  #currentUser = signal<AuthUser | null>(null);
  currentUser = computed(() => this.#currentUser());

  isAuthenticated = computed(() => {
    const user = this.#currentUser();
    return user !== null && user.isActive;
  });

  constructor() { }

  setUser(user: AuthUser): void {
    this.#currentUser.set(user);
  }

  clearUser(): void {
    this.#currentUser.set(null);
  }
}
