import { Injectable } from '@angular/core';
import { CoreApiResponse, CoreApiService } from '@/core/services/core-api.service';
import { Observable, map, of } from 'rxjs';


export interface AuthLoginBody {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  readonly AUTH_LOGIN_URL = 'http://localhost:9001/api/v1/auth/login';

  constructor(
    private readonly coreApiService: CoreApiService
  ) { }

  login(body: AuthLoginBody): Observable<string | null> {
    return this.coreApiService
      .post(this.AUTH_LOGIN_URL,body)
      .pipe(
        map((res: CoreApiResponse) => {
          if(res.error) return null;
          return res.payload.token || null;
        })
      )
  }
}
