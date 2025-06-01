import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { authReducer, AuthState } from '@/auth/state/auth.reducer';
export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  'auth': authReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];