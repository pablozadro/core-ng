import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Router } from '@angular/router';

import { CoreApiService } from '@/core/services/core-api.service';
import { CoreStorageService } from '@/core/services/storage.service';
import { AuthUser } from '../types';


interface AuthLoginPayload {
  email: string; 
  password: string;
}

interface AuthLoginResponse {
  user: AuthUser | null;
  error: string | null;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly AUTH_USER_STORAGE_KEY = 'auth-user';

  constructor(
    private readonly coreApiService: CoreApiService,
    private readonly coreStorageService: CoreStorageService,
    private readonly route: Router,
  ) { }

  login(payload: AuthLoginPayload): Observable<AuthLoginResponse> {
    const url = 'http://localhost:9001/api/v1/auth/login';

    return this.coreApiService.post(url, payload)
      .pipe(
        tap(res => {
          if (res.error || !res.payload.token) {
            this.coreStorageService.removeItem(this.AUTH_USER_STORAGE_KEY);
          }
          if(!res.error && res.payload.token) {
            this.coreStorageService.setItem(this.AUTH_USER_STORAGE_KEY, {
              token: res.payload.token,
              email: payload.email
            })
          }
        }),
        map(res => {
          if (res.error) {
            return ({ user: null, error: res.error });
          }
          return ({ user: {token: res.payload.token, email: payload.email }, error: null });
        })
      )
  }

  logout() {
    this.coreStorageService.removeItem(this.AUTH_USER_STORAGE_KEY);
    this.route.navigateByUrl('/auth/login');
  }

  getUser(): AuthUser | null {
    return this.coreStorageService.getItem(this.AUTH_USER_STORAGE_KEY);
  }
}
