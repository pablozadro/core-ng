import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, tap } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

import * as actions from './auth.actions';


@Injectable()
export class AuthEffects {
  constructor (
    private route: Router,
    private actions$: Actions,
    private readonly authService: AuthService
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(actions.LOGIN_TYPE),
    mergeMap((action: any) => this.authService.login({ 
      email: action.email, 
      password: action.password
    })
    .pipe(
      map(res => {
        if (res.error) {
          return ({ type: actions.LOGIN_ERROR_TYPE, error: res.error })
        }
        return ({ type: actions.LOGIN_SUCCESS_TYPE, token: res.token })
      })
    ))
  ));
}
