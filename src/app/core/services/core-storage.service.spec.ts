import { TestBed } from '@angular/core/testing';

import { CoreStorageService } from './core-storage.service';

describe('CoreTokenService', () => {
  let service: CoreStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
