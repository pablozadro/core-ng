import { TestBed } from '@angular/core/testing';
import { AuthTokenService } from './auth-token.service';


describe('AuthTokenService', () => {
  let service: AuthTokenService;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  describe('Encode/Decode', () => {

    it('should encode/decode properly', () => {
      const obj = { foo: 'foo' };
      const eObj = service.encode(obj);
      const dObj = service.decode(eObj);
      expect(obj).toEqual(dObj);
    });
  });


  describe('Mocked tokens', () => {

    it('should generate a mocked token properly', () => {
      const payload = { foo: 'foo' };
      const mToken = service.generateMockedToken(payload);
      const dToken = service.decodeToken(mToken);
      expect(dToken).toEqual(payload);
    });
  });
});
