import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authIsLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  return router.parseUrl('/auth/login');
};
