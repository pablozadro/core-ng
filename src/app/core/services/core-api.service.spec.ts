import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { CoreApiService } from './core-api.service';

describe('CoreApiService', () => {
  let service: CoreApiService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient()
      ]
    });
    service = TestBed.inject(CoreApiService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('get()', () => {

    it('should call http client properly', () => {
      const spy = spyOn(http,'request');
      spy.and.callThrough();
      service.get('abc');
      expect(spy).toHaveBeenCalledOnceWith('get', 'abc');
    });
  });


  describe('post()', () => {

    it('should call http client properly', () => {
      const spy = spyOn(http, 'request');
      spy.and.callThrough();
      service.post('abc', { id: 1 });
      expect(spy).toHaveBeenCalledOnceWith('post', 'abc', { body: { id: 1 } });
    });
  });
});
