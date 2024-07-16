import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CoreApiService {

  constructor(
    private readonly http: HttpClient
  ) { }

  get(url: string) {
    return this.http.request('get', url);
  }

  post(url: string, body: any) {
    return this.http.request('post', url, { body });
  }
}
