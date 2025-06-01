import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AuthService } from './auth-api.service';
import { CoreApiService } from '@/core/services/core-api.service';

const CoreApiServiceMock = {
  post: jasmine.createSpy('post')
}

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        { provide: CoreApiService, useValue: CoreApiServiceMock }
      ]
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
