import { combineReducers } from "@ngrx/store";
import { AUTH_FEATURE_KEY, authReducer } from "@/auth/state/auth.reducer";
import { MATERIAL_FEATURE_KEY, materialReducer } from "@/material/state/material.reducer";

export const APP_FEATURE_KEY = 'app';

export const appReducer = combineReducers({
  auth: authReducer,
  material: materialReducer
});