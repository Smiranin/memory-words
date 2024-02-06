// Currently store user in localStorage.
// In future will move it into firebase and expand the functionality.

import { AppUser } from 'models/user.model';

export default class LoginService {
  static login(user: AppUser): void {
    localStorage.setItem(user.username, JSON.stringify(user));
  }

  static update(user: AppUser): void {
    if (localStorage.getItem(user.username)) {
      localStorage.setItem(user.username, JSON.stringify(user));
    }
  }

  static logout(user: AppUser): void {
    if (localStorage.getItem(user.username)) {
      localStorage.removeItem(user.username);
    }
  }
}
