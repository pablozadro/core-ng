import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '@root/environments/environment';

export interface CoreApiResponse {
  message: string;
  payload: any;
  error: any;
}


@Injectable({
  providedIn: 'root'
})
export class CoreApiService {

  constructor(
    private readonly http: HttpClient
  ) { }

  get(url: string): Observable<CoreApiResponse> {
    return this.http
      .request('get', `${environment.coreApiBaseUrl}/${url}`)
      .pipe(this.handleResponse)
  }

  post(url: string, body: any): Observable<CoreApiResponse> {
    return this.http
      .request('post', `${environment.coreApiBaseUrl}/${url}`, { body })
      .pipe(this.handleResponse)
  }

  handleResponse(obs:Observable<any>): Observable<CoreApiResponse> {
    return obs.pipe(
      catchError(() => {
        return of({ message: 'Error', payload: null, error: 'Request Error' })
      })
    )
  }
}
