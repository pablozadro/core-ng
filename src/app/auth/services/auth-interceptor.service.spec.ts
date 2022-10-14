import { TestBed } from '@angular/core/testing';

import { AuthApiService } from './auth-api.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { AuthApiServiceMock } from '@app/auth/mocks/auth-api.service.mock';


describe('InterceptorService', () => {
  let service: AuthInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthApiService, useValue: AuthApiServiceMock }
      ]
    });
    service = TestBed.inject(AuthInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
