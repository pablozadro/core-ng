import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';

import authConfig from '@app/auth/config';
import { AuthApiService } from '@app/auth/services/auth-api.service';
import { logout } from '@app/auth/state/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthLoggedGuard implements CanActivate {
  constructor(
    private authApiService: AuthApiService,
    private router: Router,
    private store: Store<any>,
  ) {

  }

  canActivate(): boolean {
    const user = this.authApiService.getUser();

    if (!user) {
      this.router.navigateByUrl('auth/login');
      return false;
    }

    if (this.authApiService.isTokenExpired(user)) {
      this.store.dispatch(logout());
      return false;
    }

    return true;
  }
  
}
