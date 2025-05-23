import { createAction, props } from '@ngrx/store';
import { AuthUser } from '@/auth/types';


export const AUTH_LOGIN = '[Auth] Login';
export const login = createAction(
  AUTH_LOGIN,
  props<{ email: string; password: string }>()
);

export const AUTH_LOGIN_SUCCESS = '[Auth] Login Success';
export const loginSuccess = createAction(
  AUTH_LOGIN_SUCCESS,
  props<{ token: string; user: AuthUser; }>()
);

export const AUTH_LOGIN_ERROR = '[Auth] Login Error';
export const loginError = createAction(
  AUTH_LOGIN_ERROR,
  props<{ error: string; }>()
);


export const AUTH_LOGOUT = '[Auth] Logout';
export const logout = createAction(
  AUTH_LOGOUT,
);

export const AUTH_LOGOUT_SUCCESS = '[Auth] Logout Success';
export const logoutSuccess = createAction(
  AUTH_LOGOUT_SUCCESS,
);