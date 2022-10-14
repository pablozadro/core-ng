import { createSelector } from '@ngrx/store';

import { AppState } from '@app/app.state';
import { AuthState } from '@app/auth/state/auth.reducer';


export const selectAuth = (state: AppState) => state.auth;


export const getUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);

export const getLoginStatus = createSelector(
  selectAuth,
  (state: AuthState) => state.loginStatus
);

export const getLoginError = createSelector(
  selectAuth,
  (state: AuthState) => state.loginError
);