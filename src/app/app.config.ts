import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from './app.routes';
import { AuthEffects } from '@/auth/state/auth.effects';
import { APP_FEATURE_KEY, appReducer } from './app.reducer';
import { MaterialEffects } from '@/material/state/material.effects';
import { PageTitleService } from '@/core/services/page-title.service';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(),
    provideState({ name: APP_FEATURE_KEY, reducer: appReducer }),
    provideEffects(AuthEffects, MaterialEffects),
    { provide: TitleStrategy, useClass: PageTitleService }
  ]
};
