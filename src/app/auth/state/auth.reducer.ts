import { createReducer, on } from '@ngrx/store';
import * as actions from './auth.actions';
import { AuthUser } from '../types';

export interface AuthState {
  loading: boolean;
  user: AuthUser | null;
  error: any;
};

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(actions.login, (state: AuthState): AuthState => {
    return {
      ...state,
      loading: true,
      error: null,
      user: null
    }
  }),
  on(actions.loginSuccess, (state: AuthState, action): AuthState => {
    return {
      ...state,
      loading: false,
      error: null,
      user: action.user
    }
  }),
  on(actions.loginError, (state: AuthState, action): AuthState => {
    return {
      ...state,
      loading: false,
      user: null,
      error: action.error
    }
  }),

);