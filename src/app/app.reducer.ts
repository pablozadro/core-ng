import { isDevMode } from '@angular/core';
import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';

import { authReducer, AuthState } from '@/auth/state/auth.reducer';
import { nutritionReducer, NutritionState } from '@/nutrition/state/nutrition.reducer';

export interface AppState {
  auth: AuthState;
  nutrition: NutritionState;
}

export const reducers: ActionReducerMap<AppState> = {
  'auth': authReducer,
  'nutrition': nutritionReducer,
};

export const metaReducers: MetaReducer<AppState>[] = isDevMode() ? [] : [];