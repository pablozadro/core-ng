import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

import config from '@app/config';
import authConfig from '@app/auth/config';

import { AuthApiServiceMock } from '@app/auth/mocks/auth-api.service.mock';
import { AuthApiService } from '@app/auth/services/auth-api.service';
import { AuthLoggedGuard } from '@app/auth/guards/auth-logged.guard';



describe('AuthGuard', () => {
  let guard: AuthLoggedGuard;
  let router: Router;
  let store: MockStore;

  const authInitialStateMock = {
    user: null,
    loginStatus: config.status.PENDING,
    loginError: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: AuthApiService, useValue: AuthApiServiceMock },
        provideMockStore({ initialState: { auth: authInitialStateMock } }),
      ]
    });
    guard = TestBed.inject(AuthLoggedGuard);
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);

    spyOn(router, 'navigateByUrl').and.callFake(
      (url: string): Promise<boolean> => Promise.resolve(true)
    );
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });


  describe('When there is NO user: ', () => {
    beforeEach(() => {
      AuthApiServiceMock.isTokenExpired.and.returnValue(true);
      AuthApiServiceMock.getUser.and.returnValue(null);
    });

    it('should not activate', () => {
      expect(guard.canActivate()).toEqual(false);
    });

    it('should redirect properly', () => {
      guard.canActivate();
      expect(router.navigateByUrl).toHaveBeenCalledWith('auth/login');
    });
  });

  describe('When there is user: ', () => {
    beforeEach(() => {
      AuthApiServiceMock.isLoggedIn.and.callFake(() => true);
    });

    it('should activate if token is NOT expired', () => {
      AuthApiServiceMock.isTokenExpired.and.returnValue(false);
      AuthApiServiceMock.getUser.and.returnValue({ id: 1, email: 'developer@localhost' });
      expect(guard.canActivate()).toEqual(true);
    });

    it('should NOT activate if token is expired', () => {
      AuthApiServiceMock.isTokenExpired.and.returnValue(true);
      AuthApiServiceMock.getUser.and.returnValue({ id: 1, email: 'developer@localhost' });
      expect(guard.canActivate()).toEqual(false);
    });
  });
});
