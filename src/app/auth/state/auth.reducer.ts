import { createReducer, on } from '@ngrx/store';

import * as actions from './auth.actions';
import {
  CoreStatusType,
  CORE_PENDING_STATUS,
  CORE_INPROGRESS_STATUS,
  CORE_DONE_STATUS
} from '@/material/types';


export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  status: CoreStatusType,
  error: string,
  token: string,
}

export const initialAuthState: AuthState = {
  status: CORE_PENDING_STATUS,
  error: '',
  token: '',
};

export const authReducer = createReducer(
  initialAuthState,
  on(actions.login, state => {
    return {
      ...state,
      status: CORE_INPROGRESS_STATUS,
      error: '',
      token: '',
    }
  }),
  on(actions.loginSuccess, (state, { token }) => {
    return {
      ...state,
      status: CORE_DONE_STATUS,
      error: '',
      token,
    }
  }),
  on(actions.loginError, (state, { error }) => {
    return {
      ...state,
      status: CORE_DONE_STATUS,
      error,
      token: '',
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
      token: '',
    }
  }),
);