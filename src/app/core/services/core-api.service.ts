import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, catchError, of, map } from 'rxjs';
import { environment } from '@root/environments/environment';


export interface LiteApiError {
  status: number;
  msg: string;
  cause: any;
}

export interface LiteApiResponse {
  msg: string;
  payload: any;
  error: LiteApiError | null;
}


@Injectable({
  providedIn: 'root'
})
export class CoreApiService {
  readonly BASE_URL = environment.liteApiBaseUrl;

  constructor(
    private readonly http: HttpClient,
  ) { }

  post(url: string, body: any = {}): Observable<LiteApiResponse> {
    const fullUrl = `${this.BASE_URL}/${url}`;
    return this.http
      .request('post', fullUrl, { observe: 'response', body })
      .pipe(this.handleResponse);
  }

  put(url: string, body: any = {}): Observable<LiteApiResponse> {
    const fullUrl = `${this.BASE_URL}/${url}`;
    return this.http
      .request('put', fullUrl, { observe: 'response', body })
      .pipe(this.handleResponse);
  }

  delete(url: string): Observable<LiteApiResponse> {
    const fullUrl = `${this.BASE_URL}/${url}`;
    return this.http
      .request('delete', fullUrl, { observe: 'response' })
      .pipe(this.handleResponse);
  }

  get(url: string): Observable<LiteApiResponse> {
    const fullUrl = `${this.BASE_URL}/${url}`;
    return this.http
      .request('get', fullUrl, { observe: 'response' })
      .pipe(this.handleResponse);
  }

  handleResponse(obs:Observable<HttpResponse<any>>): Observable<LiteApiResponse> {
    return obs.pipe(
      map(res => {
        return res.body;
      }),
      catchError(res => {
        return of(res.error)
      })
    )
  }
}