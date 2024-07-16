import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, exhaustMap, tap } from 'rxjs/operators';
import { AuthApiService } from '@/auth/services/auth-api.service';
import * as actions from '@/auth/state/auth.actions';


@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authApiService: AuthApiService
  ) {
    console.log('-> actions$', this.actions$);
    this.actions$.pipe(
      tap(a => console.log('-> action', a))
    ).subscribe(() => {})
  }

  // login$ = createEffect(() => this.actions$.pipe(
  //   ofType(actions.login),
  //   exhaustMap((action: any) => this.authApiService.login({ 
  //     email: action.email, 
  //     password: action.password
  //   })
  //   .pipe(
  //     map((token: string | null) => {
  //       if (!token) {
  //         return actions.loginError({ error: 'Error login user' })
  //       }
  //       // this.route.navigateByUrl('/auth/profile');
  //       return actions.loginSuccess({ token })
  //     })
  //   ))
  // ));
}