import { createAction, props } from '@ngrx/store';
import { Product } from '@app/products/models';


export const FETCH_PRODUCTS_PENDING = '[Products Component] Fetch Products Pending';
export const FETCH_PRODUCTS_SUCCESS = '[Products Component] Fetch Products Success';
export const FETCH_PRODUCTS_ERROR = '[Products Component] Fetch Products Error';

export const fetchProducts = createAction(
  FETCH_PRODUCTS_PENDING,
);

export const fetchProductsSuccess = createAction(
  FETCH_PRODUCTS_SUCCESS,
  props<{ products: Product[]; }>()
);

export const fetchProductsError = createAction(
  FETCH_PRODUCTS_ERROR,
  props<{ error: string; }>()
);



export const FETCH_PRODUCT_PENDING = '[Products Component] Fetch Product Pending';
export const FETCH_PRODUCT_SUCCESS = '[Products Component] Fetch Product Success';
export const FETCH_PRODUCT_ERROR = '[Products Component] Fetch Product Error';

export const fetchProduct = createAction(
  FETCH_PRODUCT_PENDING,
  props<{ id: number; }>()
);

export const fetchProductSuccess = createAction(
  FETCH_PRODUCT_SUCCESS,
  props<{ product: Product; }>()
);

export const fetchProductError = createAction(
  FETCH_PRODUCT_ERROR,
  props<{ error: string; }>()
);



export const DELETE_PRODUCT_PENDING = '[Products Component] Delete product Pending';
export const DELETE_PRODUCT_SUCCESS = '[Products Component] Delete product Success';
export const DELETE_PRODUCT_ERROR = '[Products Component] Delete product Error';

export const deleteProduct = createAction(
  DELETE_PRODUCT_PENDING,
  props<{ id: Number; }>()
);

export const deleteProductSuccess = createAction(
  DELETE_PRODUCT_SUCCESS,
);

export const deleteProductError = createAction(
  DELETE_PRODUCT_ERROR,
);