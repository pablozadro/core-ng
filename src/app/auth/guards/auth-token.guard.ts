import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '@/app.reducer';
import { logout } from '@/auth/state/auth.actions';
import config from '@/auth/config';
import { AuthService } from '@/auth/services/auth-api.service';


export const authTokenGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const store: any = inject(Store<AppState>);

  const loggedUser = authService.getLoggedUser();

  if (!loggedUser) {
    store.dispatch(logout());
    router.navigate([config.loginUrl]);
    return false;
  }

  // TODO: check expiration date on API
  // if(loggedUser.user.exp < Date.now()) {
  //   store.dispatch(logout());
  //   router.navigate([config.loginUrl]);
  //   return false;
  // }

  return true;
};
