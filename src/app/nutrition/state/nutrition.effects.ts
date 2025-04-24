import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Observable, map, mergeMap, tap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { AppState } from '@root/app/app.reducer';
import { 
  getItems,
  getItemsSuccess,
  getItemsError,
  getCategories,
  getCategoriesSuccess,
  getCategoriesError,
  setQuery
} from '@/nutrition/state/nutrition.actions';
import { NutritionApiService } from '@/nutrition/services/nutrition-api.service';
import { GetItemsQuery } from '../types';


@Injectable()
export class NutritionEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly nutritionService: NutritionApiService,
    private readonly store: Store<AppState>,
    private readonly router: Router,
    private location: Location
  ) {
  }

  getCategories$ = createEffect((): Observable<Action> => this.actions$.pipe(
    ofType(getCategories),
    mergeMap(() => {
      return this.nutritionService.getCategories().pipe(
        map(categories => {
          if(!categories.length) {
            return getCategoriesError({ error: 'Error getting nutrition categories' })
          }
          return getCategoriesSuccess({ payload: categories });
        })
      )
    })
  ));

  getItems$ = createEffect((): Observable<Action> => this.actions$.pipe(
    ofType(getItems),
    mergeMap((action) => {
      return this.nutritionService.getItems(action.query).pipe(
        map(items => {
          if(!items.length) {
            return getItemsError({ error: 'Error getting nutrition items' })
          }
          return getItemsSuccess({ payload: items });
        })
      )
    })
  ));

  setQuery$ = createEffect((): Observable<Action> => this.actions$.pipe(
    ofType(setQuery),
    map(action => getItems({ query: action.query })),
    tap(action => {
      const query: GetItemsQuery = action.query;
      let queryParams = new HttpParams();
      for (const key in query) {
        if (query[key as keyof GetItemsQuery]) {
          const x = query[key as keyof GetItemsQuery] || '';
          queryParams = queryParams.set(key, x);
        }
      }
      this.location.replaceState(
        window.location.pathname, 
        queryParams.toString()
      );
    })
  ));
}