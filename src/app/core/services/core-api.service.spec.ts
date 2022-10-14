import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

import { CoreApiService } from './core-api.service';


describe('CoreApiService', () => {
  let service: CoreApiService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });

    service = TestBed.inject(CoreApiService);
    http = TestBed.inject(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should GET properly', () => {
    const spy = spyOn(http, 'get').and.callThrough();
    service.get('foo');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.calls.argsFor(0)[0]).toEqual('foo');
  });

  it('should POST properly', () => {
    const spy = spyOn(http, 'post').and.callThrough();
    service.post('foo', { foo: 'foo' });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.calls.argsFor(0)[0]).toEqual('foo');
    expect(spy.calls.argsFor(0)[1]).toEqual({ foo: 'foo' });
  });

  it('should PUT properly', () => {
    const spy = spyOn(http, 'put').and.callThrough();
    service.put('foo', { foo: 'foo' });
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.calls.argsFor(0)[0]).toEqual('foo');
    expect(spy.calls.argsFor(0)[1]).toEqual({ foo: 'foo' });
  });

  it('should DELETE properly', () => {
    const spy = spyOn(http, 'delete').and.callThrough();
    service.delete('foo');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.calls.argsFor(0)[0]).toEqual('foo');
  });
});
