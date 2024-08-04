import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { PageTitleService } from '@/core/services/page-title.service';
import { AuthEffects } from '@/auth/state/auth.effects';
import { routes } from './app.routes';
import { APP_FEATURE_KEY, appReducer } from './app.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(),
    provideState({ name: APP_FEATURE_KEY, reducer: appReducer }),
    provideEffects(AuthEffects),
    { provide: TitleStrategy, useClass: PageTitleService }
  ]
};
