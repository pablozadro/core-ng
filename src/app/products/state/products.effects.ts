import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as actions from '@app/products/state/products.actions';
import { ProductsApiService } from '@app/products/services/products-api.service';
import { Product } from '@app/products/models';


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
          const products: Product[] = res.payload.products;

          return {
            type: actions.FETCH_PRODUCTS_SUCCESS,
            products
          }
        }),
        catchError((e: any) => {
          return of({
            type: actions.FETCH_PRODUCTS_ERROR, 
            error: 'Error Fetching Products.'
          })
        })
      ))
    )
  );

  fetchProduct$ = createEffect(() => this.actions$.pipe(
    ofType(actions.FETCH_PRODUCT_PENDING),
    mergeMap((action: any) => this.productsApiService.getProductByID(action.id)
      .pipe(
        map((res: any) => {
          const product: Product[] = res.payload.product;

          return {
            type: actions.FETCH_PRODUCT_SUCCESS,
            product
          }
        }),
        catchError((e: any) => {
          return of({
            type: actions.FETCH_PRODUCT_ERROR, 
            error: 'Error Fetching Product.'
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
          const products: Product[] = res.payload.products;

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