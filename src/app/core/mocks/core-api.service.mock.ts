export const CoreApiServiceMock = {
  get: jasmine.createSpy('get'),
  post: jasmine.createSpy('post'),
  put: jasmine.createSpy('put'),
  delete: jasmine.createSpy('delete'),
  handleResponse: jasmine.createSpy('handleResponse'),
}
