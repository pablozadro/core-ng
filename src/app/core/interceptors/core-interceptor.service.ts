import { HttpInterceptorFn } from '@angular/common/http';

export const coreInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('-> Core Interceptor', req);
  return next(req);
};