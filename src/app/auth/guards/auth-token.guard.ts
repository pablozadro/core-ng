import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthApiService } from '@/auth/services/auth-api.service';

export const authTokenGuard: CanActivateFn = (route, state) => {
  const authApiService = inject(AuthApiService);
  const router = inject(Router);
  const storageToken = authApiService.getToken();
  if (!storageToken) {
    router.navigate(['auth/login']);
    return false;
  }
  return true;
};
