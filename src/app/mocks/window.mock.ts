export const WindowMock = {
  localStorage: {
    setItem: jasmine.createSpy('setItem'),
    removeItem: jasmine.createSpy('removeItem'),
    getItem: jasmine.createSpy('getItem'),
  }
};
