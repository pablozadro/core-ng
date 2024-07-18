import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, tap } from 'rxjs/operators';

import * as actions from '@/auth/state/auth.actions';
import { AuthApiService } from '@/auth/services/auth-api.service';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authApiService: AuthApiService,
    private readonly router: Router
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(actions.login),
    mergeMap(action => this.authApiService.login({ 
      email: action.email, 
      password: action.password
    })
    .pipe(
      map(token => {
        if (!token) {
          return actions.loginError({ error: 'Error while login' })
        }
        this.router.navigate(['/']);
        return actions.loginSuccess({ token });
      })
    ))
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(actions.logout),
    tap(() => {
      this.authApiService.removeToken();
      this.router.navigate(['/']);
    }),
    map(() => {
      return actions.logoutSuccess();
    })
  ));
  
}