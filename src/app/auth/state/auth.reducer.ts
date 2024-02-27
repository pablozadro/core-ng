import { createReducer, on } from '@ngrx/store';
import * as actions from './auth.actions';

export interface AuthState {
  loading: boolean;
  token: string | null;
  error: any;
};

const initialState: AuthState = {
  loading: false,
  token: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(actions.login, (state: AuthState): AuthState => {
    return {
      ...state,
      loading: true,
      error: null,
      token: null
    }
  }),
  on(actions.loginSuccess, (state: AuthState, action): AuthState => {
    return {
      ...state,
      loading: false,
      error: null,
      token: action.token
    }
  }),
  on(actions.loginError, (state: AuthState, action): AuthState => {
    return {
      ...state,
      loading: false,
      token: null,
      error: action.error
    }
  }),

);