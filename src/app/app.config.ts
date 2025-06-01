import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideRouter, TitleStrategy } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { authTokenInterceptor } from '@/auth/interceptors/auth-token.interceptor';
import { PageTitleService } from '@/core/services/page-title.service';
import { AuthEffects } from '@/auth/state/auth.effects';
import { routes } from './app.routes';
import { reducers, metaReducers } from './app.reducer';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withFetch(),
      withInterceptors([authTokenInterceptor])
    ),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore(reducers, { metaReducers }),
    provideEffects([
      AuthEffects, 
    ]),
    { provide: TitleStrategy, useClass: PageTitleService }
  ]
};
