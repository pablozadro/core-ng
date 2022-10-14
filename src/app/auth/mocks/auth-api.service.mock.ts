export const AuthApiServiceMock = {
  login: jasmine.createSpy('login'),
  logout: jasmine.createSpy('logout'),
  isLoggedIn: jasmine.createSpy('isLoggedIn'),
  getUser: jasmine.createSpy('getUser'),
  isTokenExpired: jasmine.createSpy('isTokenExpired'),
};
