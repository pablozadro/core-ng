import { TestBed } from '@angular/core/testing';

import { MaterialThemeService } from './material-theme.service';

describe('MaterialThemeService', () => {
  let service: MaterialThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
