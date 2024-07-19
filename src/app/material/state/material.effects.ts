import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, tap } from 'rxjs/operators';
import { MatBrowserTheme } from '@/material/config';
import * as actions from '@/material/state/material.actions';
import { MaterialThemeService } from '@/material/services/material-theme.service';


@Injectable()
export class MaterialEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly materialThemeService: MaterialThemeService,
    private readonly router: Router
  ) {}


  initTheme$ = createEffect(() => this.actions$.pipe(
    ofType(actions.initTheme),
    tap(() => {
      this.materialThemeService.initTheme();
    }),
    map(() => {
      return actions.setThemeSuccess();
    })
  ))

  setTheme$ = createEffect(() => this.actions$.pipe(
    ofType(actions.setTheme),
    tap(action => {
      this.materialThemeService.setTheme(action.theme as MatBrowserTheme)
    }),
    map(() => {
      return actions.setThemeSuccess();
    })
  ))

  toggleTheme$ = createEffect(() => this.actions$.pipe(
    ofType(actions.toggleTheme),
    tap(() => {
      this.materialThemeService.toggleTheme()
    }),
    map(() => {
      return actions.toggleThemeSuccess();
    })
  ))  
}