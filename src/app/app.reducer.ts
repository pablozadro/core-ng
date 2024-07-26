import { combineReducers } from "@ngrx/store";
import { authReducer, initialAuthState, AuthState } from "@/auth/state/auth.reducer";
import { materialReducer, initialMaterialState, MaterialState } from "@/material/state/material.reducer";


export const APP_FEATURE_KEY = 'app';

export interface AppState {
  auth: AuthState;
  material: MaterialState;
}

export const initialAppState: AppState = {
  auth: initialAuthState,
  material: initialMaterialState
}

export const appReducer = combineReducers({
  auth: authReducer,
  material: materialReducer
});