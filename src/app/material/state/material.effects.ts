import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';

import { CoreBrowserTheme } from 'core-x';
import * as actions from '@/material/state/material.actions';
import { CoreThemeService } from 'core-x';


@Injectable()
export class MaterialEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly coreThemeService: CoreThemeService,
    private readonly router: Router
  ) {}


  initTheme$ = createEffect(() => this.actions$.pipe(
    ofType(actions.initTheme),
    tap(() => {
      this.coreThemeService.initTheme();
    }),
    map(() => {
      return actions.setThemeSuccess();
    })
  ))

  setTheme$ = createEffect(() => this.actions$.pipe(
    ofType(actions.setTheme),
    tap(action => {
      this.coreThemeService.setTheme(action.theme as CoreBrowserTheme)
    }),
    map(() => {
      return actions.setThemeSuccess();
    })
  ))

  toggleTheme$ = createEffect(() => this.actions$.pipe(
    ofType(actions.toggleTheme),
    tap(() => {
      this.coreThemeService.toggleTheme()
    }),
    map(() => {
      return actions.toggleThemeSuccess();
    })
  ))  
}