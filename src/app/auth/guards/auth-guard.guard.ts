import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { CoreStorageService } from '@/core/services/storage.service';

export const authIsLoggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const coreStorageService = inject(CoreStorageService);
  const user = coreStorageService.getItem('auth-user');
  if (user) return true;
  return router.parseUrl('/auth/login');
};
