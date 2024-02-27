import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { HydrationFeature } from '@angular/platform-browser';

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
    private readonly http: HttpClient
  ) { }

  login(payload: AuthLoginPayload): Observable<AuthLoginResponse> {
    const url = 'http://localhost:9001/api/v1/auth/login';
    return this.http.post(url, payload, { observe: 'response' })
      .pipe(
        catchError((error: any) => {
          // Request not completed
          return of({ token: null, error: 'Network Error' })
        }),
        map((res: any): AuthLoginResponse => {
          if (res.error) {
            // Request not completed cathched error
            return ({ token: null, error: res.error })
          }
          // Request completed
          return res.body;
        }),
        map((res: any) => {
          if (res.error) {
            // Request completed with errors
            return ({ token: null, error: res.error.message })
          }
          // Request completed and success
          return ({ token: res.payload.token, error: null })
        })
      )
  }
}
