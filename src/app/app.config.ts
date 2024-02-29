import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { routes } from '@/app.routes';
import { coreInterceptor } from '@/core/interceptors/core-interceptor.service';
import { authReducer } from '@/auth/state/auth.reducer';
import { AuthEffects } from '@/auth/state/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideStore(),
    provideHttpClient(withInterceptors([coreInterceptor])),
    provideState({ name: 'auth', reducer: authReducer }),
    provideEffects(AuthEffects)
]
};
