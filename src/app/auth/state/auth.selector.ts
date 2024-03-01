import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AuthState } from './auth.reducer';

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectAuthLoading = createSelector(
  selectAuth,
  (state: AuthState) => state.loading
);

export const selectAuthError = createSelector(
  selectAuth,
  (state: AuthState) => state.error
);

export const selectAuthUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);
