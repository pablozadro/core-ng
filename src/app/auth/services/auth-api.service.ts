import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CoreApiResponse, CoreApiService } from '@/core/services/core-api.service';
import { Observable, map, of } from 'rxjs';
import { CoreStorageService } from '@/core/services/core-storage.service';


export interface AuthLoginBody {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  readonly AUTH_LOGIN_URL = 'http://localhost:9001/api/v1/auth/login';
  readonly AUTH_STORAGE_TOKEN = 'auth-user';

  constructor(
    private readonly coreApiService: CoreApiService,
    private readonly coreStorageService: CoreStorageService,
    private readonly router: Router,
  ) { }


  login(body: AuthLoginBody): Observable<string | null> {
    const storageToken = this.getToken();
    if(storageToken) return of(storageToken);
    return this.coreApiService
      .post(this.AUTH_LOGIN_URL, body)
      .pipe(
        map((res: CoreApiResponse) => {
          if(res.error) return null;
          const token = res.payload.token || null;
          if(token) {
            this.setToken(token);
          } else {
            this.removeToken();
          }
          return token;
        })
      )
  }

  logout() {
    this.removeToken();
    this.router.navigate(['auth/login']);
  }

  getToken(): string | null {
    return this.coreStorageService.getItem(this.AUTH_STORAGE_TOKEN);
  }

  removeToken() {
    return this.coreStorageService.removeItem(this.AUTH_STORAGE_TOKEN);
  }

  setToken(token: string) {
    return this.coreStorageService.setItem(this.AUTH_STORAGE_TOKEN, token);
  }
}
