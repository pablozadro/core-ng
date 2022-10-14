import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as actions from '@app/auth/state/auth.actions';

import { AuthUser } from '@app/auth/interfaces';
import { AuthApiService } from '@app/auth/services/auth-api.service';
import { AuthTokenService } from '@app/auth/services/auth-token.service'; 


@Injectable()
export class AuthEffects {
  constructor(
    private router: Router,
    private actions$: Actions,
    private authApiService: AuthApiService,
    private authTokenService: AuthTokenService,
  ) {}

  loadLoggedUser$ = createEffect(() => this.actions$.pipe(
    ofType(actions.LOAD_LOGGED_USER),
    map(() => {
      const user: AuthUser | null = this.authApiService.getUser();

      if (!user) {
        return { type: actions.LOAD_LOGGED_USER_EMPTY }
      }

      return {
        type: actions.LOAD_LOGGED_USER_SUCCESS,
        user
      }
    })
  ));


  login$ = createEffect(() => this.actions$.pipe(
    ofType(actions.LOGIN),
    mergeMap((action: any) => this.authApiService.login(action.body)
      .pipe(
        map((res: any) => {
          const token: string = res.payload.token;

          if (!token) {
            return {
              type: actions.LOGIN_ERROR, 
              error: 'invalid token'
            }
          }

          const dToken: any | null = this.authTokenService.decodeToken(token);

          /** @todo: check token expiration time */
          const user: AuthUser = dToken;

          if (this.authApiService.isTokenExpired(user)) {
            return {
              type: actions.LOGIN_ERROR, 
              error: 'expired token'
            }
          }

          this.authApiService.createUser(user, token);

          this.router.navigateByUrl('auth/profile');

          return {
            type: actions.LOGIN_SUCCESS,
            user
          }
        }),
        catchError((e: any) => {
          return of({
            type: actions.LOGIN_ERROR, 
            error: 'error login'
          })
        })
      ))
    )
  );


  logout$ = createEffect(() => this.actions$.pipe(
    ofType(actions.LOGOUT),
    map(() => {
      this.authApiService.logout();
      this.router.navigateByUrl('auth/login');
      return {
        type: actions.LOGOUT_SUCCESS
      }
    }),
    catchError((e: any) => {
      return of({
        type: actions.LOGOUT_ERROR, 
        error: 'error whie logout',
      })
    })
  ));
}