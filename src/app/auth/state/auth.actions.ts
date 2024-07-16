import { createAction, props } from '@ngrx/store';

export const AUTH_LOGIN = '[Auth] Login';
export const login = createAction(
  AUTH_LOGIN,
  props<{ email: string; password: string }>()
);