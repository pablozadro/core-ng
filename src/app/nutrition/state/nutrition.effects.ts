import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Observable, map, mergeMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import { AppState } from '@root/app/app.reducer';
import * as actions from '@/nutrition/state/nutrition.actions';
import { NutritionApiService } from '@/nutrition/services/nutrition-api.service';



@Injectable()
export class NutritionEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly nutritionService: NutritionApiService,
  ) {
  }

  getCategories$ = createEffect((): Observable<Action> => this.actions$.pipe(
    ofType(actions.getCategories),
    mergeMap(() => {
      return this.nutritionService.getCategories().pipe(
        map(({ error, categories }) => {
          if(error) {
            return actions.getCategoriesError({ error: 'Error getting nutrition categories' })
          }
          return actions.getCategoriesSuccess({ categories });
        })
      )
    })
  ));

  getItems$ = createEffect((): Observable<Action> => this.actions$.pipe(
    ofType(actions.getItems),
    mergeMap(() => {
      return this.nutritionService.getItems().pipe(
        map(({ error, items }) => {
          if(error) {
            return actions.getItemsError({ error: 'Error getting nutrition items' })
          }
          return actions.getItemsSuccess({ items });
        })
      )
    })
  ));
}