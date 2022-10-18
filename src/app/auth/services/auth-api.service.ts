import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CoreApiService } from '@app/core/services/core-api.service';
import { AuthUser } from '@app/auth/interfaces'


export interface AuthLoginBody {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private LOGIN_URL = 'http://localhost:9000/api/v1/auth/login?delay=750';

  constructor(
    private window: Window,
    private coreApiService: CoreApiService,
  ) {}

  login(body: AuthLoginBody): Observable<any> {
    return this.coreApiService.post(this.LOGIN_URL, body);
  }
  
  logout() {
    this.removeUser();
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  isTokenExpired(user: AuthUser): boolean {
    // return user.exp < Date.now();
    return false;
  }

  createUser(user: AuthUser, token: string) {
    this.window.localStorage.setItem('User', JSON.stringify(user));
    this.window.localStorage.setItem('UserBearerToken', token);
  }

  removeUser() {
    this.window.localStorage.removeItem('User');
    this.window.localStorage.removeItem('UserBearerToken');
  }

  getUser(): AuthUser | null {
    const user = this.window.localStorage.getItem('User');
    if (user) return JSON.parse(user);
    return null;
  }

  getUserToken(): string | null {
    const token = this.window.localStorage.getItem('UserBearerToken');
    if (token) return token;
    return null;
  }
}
