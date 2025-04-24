import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import * as jose from 'jose';
import { CoreApiService } from '@/core/services/core-api.service';
import config from '@/auth/config';
import { CoreStorageService } from '@/core/services/core-storage.service';
import { AuthUser } from '@/auth/types';


export interface AuthLoginBody {
  email: string;
  password: string;
}

export interface AuthLoginResponse {
  token: string | null;
  error: string | null;
  user: AuthUser | null;
}

export interface GetLoggedUserResponse {
  user: AuthUser;
  token: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly LOGIN_URL = config.loginApiUrl;

  constructor(
    private readonly coreApiService: CoreApiService,
    private readonly coreStorageService: CoreStorageService
  ) { }

  private getToken(): string | null {
    const authStorage = this.coreStorageService.getItem(config.authStorageKey);
    const token = authStorage?.token || null;
    return token;
  }

  private decodeUserFromToken(token: string): AuthUser {
    return jose.decodeJwt(token);
  }

  removeLoggedUser() {
    this.coreStorageService.removeItem(config.authStorageKey);
  }

  getLoggedUser(): GetLoggedUserResponse | null {
    const token = this.getToken();
    if (!token) return null;
    const user = this.decodeUserFromToken(token);
    return { user, token };
  }

  login(body: AuthLoginBody): Observable<AuthLoginResponse> {
    return this.coreApiService
      .post(this.LOGIN_URL, body)
      .pipe(
        map(res => {
          let user = null;
          let token = null;
          if(res.payload?.token) {
            token = res.payload.token;
            user = this.decodeUserFromToken(token);
          }
          const error = res.error ? `${res.error.msg}: ${res.error.cause}` : null
          return { token, user, error };
        })
      );
  }
}