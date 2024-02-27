import { createAction, props } from '@ngrx/store';

export const LOGIN_TYPE = '[Auth] Login';
export const login = createAction(
  LOGIN_TYPE,
  props<{ email: string; password: string; }>()
);

export const LOGIN_SUCCESS_TYPE = '[Auth] Login Success';
export const loginSuccess = createAction(
  LOGIN_SUCCESS_TYPE,
  props<{ token: string; }>()
);

export const LOGIN_ERROR_TYPE = '[Auth] Login Error';
export const loginError = createAction(
  LOGIN_ERROR_TYPE,
  props<{ error: string; }>()
);
