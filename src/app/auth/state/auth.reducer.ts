import { createReducer, createSelector, on } from '@ngrx/store';
import { AppState } from '@/app.reducer';
import { AuthUser } from '@/auth/types';
import * as actions from '@/auth/state/auth.actions';
import { CoreStatusType } from '@/core/types';
import {
  CORE_PENDING_STATUS,
  CORE_INPROGRESS_STATUS,
  CORE_DONE_STATUS
} from '@/core/config';


export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  status: CoreStatusType;
  error: string | null;
  token: string | null;
  user: AuthUser | null;
}

export const initialAuthState: AuthState = {
  status: CORE_PENDING_STATUS,
  error: null,
  token: null,
  user: null
};

export const selectAuth = (state: AppState) => state.auth;

export const selectAuthStatus = createSelector(
  selectAuth,
  (state: AuthState) => state.status
);

export const selectAuthError = createSelector(
  selectAuth,
  (state: AuthState) => state.error
);

export const selectAuthToken = createSelector(
  selectAuth,
  (state: AuthState) => state.token
);

export const selectAuthUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);

export const authReducer = createReducer(
  initialAuthState,
  on(actions.login, state => {
    return {
      ...state,
      status: CORE_INPROGRESS_STATUS,
      error: null,
      token: null,
      user: null,
    }
  }),
  on(actions.loginSuccess, (state, { token, user }) => {
    return {
      ...state,
      status: CORE_DONE_STATUS,
      error: null,
      token,
      user,
    }
  }),
  on(actions.loginError, (state, { error }) => {
    return {
      ...state,
      status: CORE_DONE_STATUS,
      error,
      token: null,
      user: null,
    }
  }),
  on(actions.logout, state => {
    return {
      ...state,
      status: CORE_INPROGRESS_STATUS,
    }
  }),
  on(actions.logoutSuccess, state => {
    return {
      ...state,
      status: CORE_DONE_STATUS,
      token: null,
      user: null,
      error: null
    }
  }),
);