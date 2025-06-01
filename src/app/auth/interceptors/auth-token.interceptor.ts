import { HttpRequest, HttpHandlerFn, HttpEvent } from "@angular/common/http";
import { inject } from '@angular/core';
import { Observable } from "rxjs"; 
import { AuthService } from "@/auth/services/auth-api.service";

export function authTokenInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  const authService = inject(AuthService);
  const loggedUser = authService.getLoggedUser();
  const token = loggedUser ? loggedUser.token : null;

  if(req.url.includes('login') || req.url.includes('register')) {
    return next(req);
  }

  if(!token) {
    return next(req);
  }

  const reqWithHeader = req.clone({ 
    headers: req.headers.set('Authorization', `Bearer ${token}`),
  });

  return next(reqWithHeader);
}
