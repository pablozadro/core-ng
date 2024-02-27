import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '@/auth/services/auth.service';

export const authIsLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const user = authService.getUser();
  if (user) return true;
  router.navigateByUrl('/auth/login');
  return false;
};
