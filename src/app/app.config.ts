import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { authReducer, AUTH_FEATURE_KEY } from './auth/state/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(),
    provideState({ name: AUTH_FEATURE_KEY, reducer: authReducer })
  ]
};
