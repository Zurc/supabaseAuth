import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router
} from '@angular/router';
import { USER_STORAGE_KEY } from '@shared/constants/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly router: Router) {}
  canActivate(): boolean {
    // if user is logged in we want to prevent access to the sign in/up pages
    if (localStorage.getItem(USER_STORAGE_KEY)) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
