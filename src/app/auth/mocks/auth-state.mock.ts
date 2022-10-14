import config from '@app/config';

export const authInitialStateMock = {
  user: null,
  loginStatus: config.status.PENDING,
  loginError: '',
}