import { createAction, props } from '@ngrx/store';

export const AUTH_LOGIN = '[Auth] Login';
export const login = createAction(
  AUTH_LOGIN,
  props<{ email: string; password: string }>()
);

export const AUTH_LOGIN_SUCCESS = '[Auth] Login Success';
export const loginSuccess = createAction(
  AUTH_LOGIN_SUCCESS,
  props<{ token: string; }>()
);

export const AUTH_LOGIN_ERROR = '[Auth] Login Error';
export const loginError = createAction(
  AUTH_LOGIN_ERROR,
  props<{ error: string }>()
);