import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CoreApiService } from '@app/core/services/core-api.service';


export interface AuthLoginBody {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(
    private coreApiService: CoreApiService,
  ) {}

  login(body: AuthLoginBody): Observable<any> {
    return this.coreApiService.post('http://localhost:9000/api/v1/auth/login?delay=750', body);
  }
  
  logout() {}

  isLoggedIn() {}

  getUser() {}

  isTokenExpired() {}

  getUserToken() {}
}
