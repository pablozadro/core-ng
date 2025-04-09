import { combineReducers } from "@ngrx/store";

import { 
  authReducer, 
  initialAuthState, 
  AuthState 
} from "@/auth/state/auth.reducer";


export const APP_FEATURE_KEY = 'app';


export interface AppState {
  auth: AuthState;
}

export interface RootState {
  app: AppState;
}

export const initialAppState: AppState = {
  auth: initialAuthState,
}

export const appReducer = combineReducers({
  auth: authReducer,
});