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
});
