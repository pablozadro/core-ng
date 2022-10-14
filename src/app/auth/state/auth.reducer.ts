import { createReducer, on } from '@ngrx/store';

import config from '@app/config';
import * as actions from '@app/auth/state/auth.actions';
import { AuthUser } from '@app/auth/interfaces';


export interface AuthState {
  user: AuthUser | null;
  loginStatus: string;
  loginError: string;
  logoutStatus: string;
  logoutError: string;
  loadingLoggedUserStatus: string;
}


const authInitialState: AuthState = {
  user: null,
  loadingLoggedUserStatus: config.status.PENDING,
  loginStatus: config.status.PENDING,
  loginError: '',
  logoutStatus: config.status.PENDING,
  logoutError: '',
};


export const authReducer = createReducer(
  authInitialState,
  on(actions.loadLoggedUser, (state: AuthState): AuthState => {
    return { 
      ...state, 
      loadingLoggedUserStatus: config.status.IN_PROGRESS,
    }
  }),
  on(actions.loadLoggedUserSuccess, (state: AuthState, action: any): AuthState => {
    return { 
      ...state,
      user: action.user,
      loadingLoggedUserStatus: config.status.COMPLETED
    }
  }),
  on(actions.loadLoggedUserEmpty, (state: AuthState): AuthState => {
    return { 
      ...state,
      user: null,
      loadingLoggedUserStatus: config.status.COMPLETED
    }
  }),
  on(actions.login, (state: AuthState): AuthState => {
    return { 
      ...state, 
      loginStatus: config.status.IN_PROGRESS,
      loginError: '',
    }
  }),
  on(actions.loginSuccess, (state: AuthState, action: any): AuthState => {
    return { 
      ...state, 
      user: action.user,
      loginStatus: config.status.COMPLETED,
      loginError: ''
    }
  }),
  on(actions.loginError, (state: AuthState, action: any): AuthState => {
    return { 
      ...state, 
      user: null,
      loginStatus: config.status.COMPLETED,
      loginError: action.error,
    }
  }),
  on(actions.logout, (state: AuthState): AuthState => {
    return { 
      ...state, 
      logoutStatus: config.status.IN_PROGRESS
    }
  }),
  on(actions.logoutSuccess, (state: AuthState, action: any): AuthState => {
    return { 
      ...state, 
      user: null,
      logoutStatus: config.status.COMPLETED,
      logoutError: ''
    }
  }),
  on(actions.logoutError, (state: AuthState, action: any): AuthState => {
    return { 
      ...state, 
      logoutStatus: config.status.COMPLETED,
      logoutError: action.error
    }
  }),
);