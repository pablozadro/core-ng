import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';

import { AuthApiService } from '@app/auth/services/auth-api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  token: string | null = null;

  constructor(
    private authApiService: AuthApiService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.authApiService.getUserToken();

    if (req.url.includes('auth') || !this.token) {
      return next.handle(req);
    }

    const tokenizedReq = req.clone({ 
      headers: req.headers.set('Authorization', 'Bearer ' + this.token)
    });

    return next.handle(tokenizedReq);
  }
}
