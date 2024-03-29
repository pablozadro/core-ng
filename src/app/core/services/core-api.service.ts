import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';


interface CoreApiResponse {
  error: string | null;
  payload: any;
}

@Injectable({
  providedIn: 'root'
})
export class CoreApiService {

  constructor(
    private readonly http: HttpClient
  ) { }

  post(url: string, body: any): Observable<CoreApiResponse> {
    return this.http.post(url, body, {
      observe: 'response'
    }).pipe(this.handleResponse)
  }

  get(url: string): Observable<CoreApiResponse> {
    return this.http.get(url, {
      observe: 'response'
    }).pipe(this.handleResponse)
  }

  handleResponse(obs:Observable<any>): Observable<CoreApiResponse> {
    return obs.pipe(
      catchError((error: any) => {
        return of({ payload: null, error: 'Request Error' })
      }),
      map((res: any) => {
        if (res.error) {
          return ({ payload: null, error: res.error })
        };
        if (res.body.error) {
          return ({ payload: null, error: res.body.error.message })
        }
        return ({ payload: res.body.payload, error: null})
      })
    )
  }
}
