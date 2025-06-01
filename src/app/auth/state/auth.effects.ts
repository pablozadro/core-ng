import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, tap } from 'rxjs/operators';
import { CoreStorageService } from '@/core/services/core-storage.service';
import { 
  login, 
  loginError, 
  loginSuccess, 
  logout, 
  logoutSuccess, 
  AUTH_LOGIN_SUCCESS
} from '@/auth/state/auth.actions';
import { AuthService } from '@/auth/services/auth-api.service';
import config from '@/auth/config';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly coreStorageService: CoreStorageService,
    private readonly router: Router
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(login),
    mergeMap(action => this.authService.login({ 
      email: action.email, 
      password: action.password
    })
    .pipe(
      map(res => {
        const { error, token, user } = res;
        if(error) return loginError({ error });
        if(token && user) return loginSuccess({ token, user });
        return loginError({ error: 'Unknown Error' });
      }),
      tap(action => {
        if (action.type === AUTH_LOGIN_SUCCESS) {
          const { token, user } = action;
          this.coreStorageService.setItem(config.authStorageKey, { token, user })
          this.router.navigate([config.loginSuccessRedirectUrl]);
        }
      }),
    ))
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(logout),
    tap(() => {
      this.authService.removeLoggedUser();
      this.router.navigate([config.loginUrl]);
    }),
    map(() => {
      return logoutSuccess();
    })
  ));
  
}