import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as actions from '@app/products/state/products.actions';
import { Products, ProductsApiService } from '@app/products/services/products-api.service';


@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsApiService: ProductsApiService,
  ) {}

  fetchProducts$ = createEffect(() => this.actions$.pipe(
    ofType(actions.FETCH_PRODUCTS_PENDING),
    mergeMap((action: any) => this.productsApiService.getProducts()
      .pipe(
        map((res: any) => {
          const products: Products[] = res;

          return {
            type: actions.FETCH_PRODUCTS_SUCCESS,
            products
          }
        }),
        catchError((e: any) => {
          return of({
            type: actions.FETCH_PRODUCTS_ERROR, 
            error: 'error fetching products'
          })
        })
      ))
    )
  );

  deleteProduct$ = createEffect(() => this.actions$.pipe(
    ofType(actions.DELETE_PRODUCT_PENDING),
    mergeMap((action: any) => this.productsApiService.deleteProductByID(action.id)
      .pipe(
        map((res: any) => {
          const products: Products[] = res;

          return {
            type: actions.DELETE_PRODUCT_SUCCESS,
            products
          }
        }),
        catchError((e: any) => {
          return of({
            type: actions.DELETE_PRODUCT_ERROR, 
            error: 'error deleting product'
          })
        })
      ))
    )
  );

}