import { TestBed } from '@angular/core/testing';

import { ParseItemsQueryService } from './parse-items-query.service';

describe('ParseItemsQueryService', () => {
  let service: ParseItemsQueryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParseItemsQueryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
