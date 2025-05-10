import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { HttpParams } from '@angular/common/http';
import { Observable, tap, map, mergeMap, withLatestFrom } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';

import * as actions from '@/nutrition/state/nutrition.actions';

import { AppState } from '@/app.reducer';
import { 
  NutritionItemsQueryState, 
  selectNutrition 
} from '@/nutrition/state/nutrition.reducer';

import { NutritionApiService } from '@/nutrition/services/nutrition-api.service';

@Injectable()
export class NutritionEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store<AppState>,
    private readonly nutritionService: NutritionApiService,
    private location: Location
  ) {
  }

  setQuery$ = createEffect((): Observable<Action> => this.actions$.pipe(
    ofType(actions.setQuery),
    tap((action) => {
      const query: NutritionItemsQueryState = action.query;
      let queryParams = new HttpParams();
      for (const key in query) {
        if (query[key as keyof NutritionItemsQueryState]) {
          const x = query[key as keyof NutritionItemsQueryState] || '';
          queryParams = queryParams.set(key, x);
        }
      }
      this.location.replaceState(window.location.pathname, queryParams.toString());
    }),
  ), { dispatch: false });

  getCategories$ = createEffect((): Observable<Action> => this.actions$.pipe(
    ofType(actions.getCategories),
    mergeMap(() => {
      console.log('->  getCategories$')
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
    withLatestFrom(this.store.select(selectNutrition)),
    mergeMap(([action, state]) => {
      const { query } = state;
      console.log('->  getItems$')
      return this.nutritionService.getItems(query).pipe(
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