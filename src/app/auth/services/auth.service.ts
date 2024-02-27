import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { CoreApiService } from '@/core/services/core-api.service';

interface AuthLoginPayload {
  email: string; 
  password: string;
}

interface AuthLoginResponse {
  token: string | null;
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly coreApiService: CoreApiService
  ) { }

  login(payload: AuthLoginPayload): Observable<AuthLoginResponse> {
    const url = 'http://localhost:9001/api/v1/auth/login';

    return this.coreApiService.post(url, payload)
      .pipe(
        map(res => {
          if (res.error) {
            return ({ token: null, error: res.error });
          }
          return ({ token: res.payload.token, error: null });
        })
      )
  }
}
