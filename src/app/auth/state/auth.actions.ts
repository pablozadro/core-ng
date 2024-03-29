import { createAction, props } from '@ngrx/store';
import { AuthUser } from '../types';


export const LOGIN_TYPE = '[Auth] Login';
export const login = createAction(
  LOGIN_TYPE,
  props<{ email: string; password: string; }>()
);

export const LOGIN_SUCCESS_TYPE = '[Auth] Login Success';
export const loginSuccess = createAction(
  LOGIN_SUCCESS_TYPE,
  props<{ user: AuthUser; }>()
);


export const LOGIN_ERROR_TYPE = '[Auth] Login Error';
export const loginError = createAction(
  LOGIN_ERROR_TYPE,
  props<{ error: string; }>()
);

export const LOGOUT_TYPE = '[Auth] Logout';
export const logout = createAction(
  LOGOUT_TYPE
);
