import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CoreApiService {
  readonly RESPONSE_OBSERVE_TYPE = 'response';
  basicHeaders = {
    'Content-Type': 'application/json'
  };

  constructor(
    private http: HttpClient
  ) { }

  get(url: string, params?: any): Observable<any> {
    return this.http.get(url, { 
      observe: this.RESPONSE_OBSERVE_TYPE,
      params: params || {},
      headers: this.basicHeaders,
    }).pipe(this.handleResponse);
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(url, body, { 
      observe: this.RESPONSE_OBSERVE_TYPE,
      headers: this.basicHeaders,
    }).pipe(this.handleResponse);
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(url, body, { 
      observe: this.RESPONSE_OBSERVE_TYPE,
      headers: this.basicHeaders,
    }).pipe(this.handleResponse);
  }

  delete(url: string): Observable<any> {
    return this.http.delete(url, { 
      observe: this.RESPONSE_OBSERVE_TYPE,
      headers: this.basicHeaders,
    }).pipe(this.handleResponse);
  }

  private handleResponse(observable: Observable<any>): Observable<any> {
    return observable.pipe(
      map((res: any): any => {
        return res.body;
      }),
      catchError((err: any): any => {
        return err;
      }),
    )
  }
}
