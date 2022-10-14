import { createAction, props } from '@ngrx/store';
import { AuthLoginBody } from '@app/auth/services/auth-api.service';
import { AuthUser } from '@app/auth/interfaces';


/**
 * Load alredy logged user
 */

export const LOAD_LOGGED_USER = '[App Component] Load Logged User';
export const LOAD_LOGGED_USER_SUCCESS = '[App Component] Load Logged User Success';
export const LOAD_LOGGED_USER_EMPTY = '[App Component] Load Logged User Empty';

export const loadLoggedUser = createAction(
  LOAD_LOGGED_USER
);

export const loadLoggedUserSuccess = createAction(
  LOAD_LOGGED_USER_SUCCESS,
  props<{ user: AuthUser; }>()
);

export const loadLoggedUserEmpty = createAction(
  LOAD_LOGGED_USER_EMPTY
);


/**
 * Login
 */

export const LOGIN = '[Auth Login Component] Login';
export const LOGIN_SUCCESS = '[Auth API Service] Login Success';
export const LOGIN_ERROR = '[Auth API Service] Login Error';

export const login = createAction(
  LOGIN,
  props<{ body: AuthLoginBody }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: AuthUser; }>()
);

export const loginError = createAction(
  LOGIN_ERROR,
  props<{ error: string; }>()
);


/**
 * Logout
 */

export const LOGOUT = '[Auth Logout] Logout';
export const LOGOUT_SUCCESS = '[Auth Logout] Logout Success';
export const LOGOUT_ERROR = '[Auth Logout] Logout Error';

export const logout = createAction(
  LOGOUT
);

export const logoutSuccess = createAction(
  LOGOUT_SUCCESS
);

export const logoutError = createAction(
  LOGOUT_ERROR,
  props<{error: string; }>()
);
