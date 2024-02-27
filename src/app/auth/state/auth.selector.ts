import { createSelector, createFeatureSelector } from '@ngrx/store';

import { AppState } from '@/app.state';
import { AuthState } from './auth.reducer';


// export const selectAuth = (state: AppState) => state.auth;
// export const selectAuthLoading = createSelector(
//   selectAuth,
//   (state: AuthState) => state.loading
// );

export const selectAuth = createFeatureSelector<AuthState>('auth');
export const selectAuthLoading = createSelector(
  selectAuth,
  (state: AuthState) => state.loading
);
