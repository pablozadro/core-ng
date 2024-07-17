import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthApiService } from './auth-api.service';
import { of } from 'rxjs';
import { CoreApiService, CoreApiResponse } from '@/core/services/core-api.service';

const CoreApiServiceMock = {
  post: jasmine.createSpy('post')
}

describe('AuthApiService', () => {
  let service: AuthApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        { provide: CoreApiService, useValue: CoreApiServiceMock }
      ]
    });
    service = TestBed.inject(AuthApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('login()', () => {

    it('should call core api', done => {
      const body = { email: 'abc@mock.io', password: 'abc123' };
      const res: CoreApiResponse = { error: null, payload: { token: 'abc123' }};
      CoreApiServiceMock.post.and.returnValue(of(res));
      service
        .login(body)
        .subscribe(() => {
          expect(CoreApiServiceMock.post).toHaveBeenCalledOnceWith(
            service.AUTH_LOGIN_URL,
            body
          );
          done();
        });
    });

    it('should return token if no error', done => {
      const body = { email: 'abc@mock.io', password: 'abc123' };
      const res: CoreApiResponse = { error: null, payload: { token: 'abc123' }};
      CoreApiServiceMock.post.and.returnValue(of(res));
      service
        .login(body)
        .subscribe(token => {
          expect(token).toEqual('abc123');
          done();
        });
    });

    it('should return null if error', done => {
      const body = { email: 'abc@mock.io', password: 'abc123' };
      const res: CoreApiResponse = { error: 'Mock error', payload: null};
      CoreApiServiceMock.post.and.returnValue(of(res));
      service
        .login(body)
        .subscribe(token => {
          expect(token).toEqual(null);
          done();
        });
    });
  });

});
