import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import config from '@/auth/config';
import { AuthService } from '@/auth/services/auth-api.service';


export const authTokenGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const loggedUser = authService.getLoggedUser();
  if (!loggedUser) {
    router.navigate([config.loginUrl]);
    return false;
  }
  return true;
};
