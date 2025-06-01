import { TestBed } from '@angular/core/testing';
import { provideHttpClient, HttpClient } from '@angular/common/http';
import { CoreApiService } from './core-api.service';
import { environment } from '@root/environments/environment';


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
      const spyHandleResponse = spyOn(service, 'handleResponse');
      const spyRequest = spyOn(http,'request');
      spyRequest.and.callThrough();
      spyHandleResponse.and.callThrough();
      service.get('abc');
      expect(spyHandleResponse).toHaveBeenCalledTimes(1);
      expect(spyRequest).toHaveBeenCalledOnceWith('get', `${environment.coreApiBaseUrl}/abc`);
    });
  });


  describe('post()', () => {

    it('should call http client properly', () => {
      const spyHandleResponse = spyOn(service, 'handleResponse');
      const spyRequest = spyOn(http,'request');
      spyRequest.and.callThrough();
      spyHandleResponse.and.callThrough();
      service.post('abc', { id: 1 });
      expect(spyHandleResponse).toHaveBeenCalledTimes(1);
      expect(spyRequest).toHaveBeenCalledOnceWith('post', `${environment.coreApiBaseUrl}/abc`, { body: { id: 1 } });
    });
  });
});
