import { TestBed } from '@angular/core/testing';

import { CoreApiService } from '@app/core/services/core-api.service';
import { CoreApiServiceMock } from '@app/core/mocks/core-api.service.mock';
import { AuthApiService } from './auth-api.service';


describe('AuthApiService', () => {
  let service: AuthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CoreApiService, useValue: CoreApiServiceMock },
      ]
    });
    service = TestBed.inject(AuthApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('Login', () => {
    
    it('should set query properly', () => {
      const spy = CoreApiServiceMock.post.and.callThrough();
      const body = { email: 'mock@localhost.io', password: 'abc123'};
      service.login(body);
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.calls.argsFor(0)[0]).toEqual('http://localhost:9000/api/v1/auth/login?delay=750');
      expect(spy.calls.argsFor(0)[1]).toEqual(body);
    });
  });
});
