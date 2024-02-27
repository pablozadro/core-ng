import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authIsLoggedGuard } from './auth-is-logged.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authIsLoggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
