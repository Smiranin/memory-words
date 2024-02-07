// Currently store user in localStorage.
// In future will move it into firebase and expand the functionality.

import { AppUser } from 'models/user.model';

const AUTH_KEY = 'mw-auth';

export default class AuthService {
  static init(): AppUser | null {
    const existed = localStorage.getItem(AUTH_KEY);
    return existed ? JSON.parse(existed) : null;
  }

  static login(user: AppUser): void {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }

  static update(user: Partial<AppUser>): void {
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
  }

  static logout(): void {
    if (localStorage.getItem(AUTH_KEY)) {
      localStorage.removeItem(AUTH_KEY);
    }
  }
}
