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
          console.log('-> Error', error);
          return of({ token: null, error: 'Network Error' })
        }),
        map((res: any): AuthLoginResponse => {
          console.log('-> Res', res);
          if (res.error) {
            return ({ token: null, error: res.error })
          }
          return res.body;
        }),
        map((res: any) => {
          if (res.error) {
            return ({ token: null, error: res.error.message })
          }
          return ({ token: res.payload.token, error: null })
        })
      )
  }
}
