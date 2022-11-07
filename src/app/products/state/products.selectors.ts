import { createSelector } from '@ngrx/store';

import { AppState} from '@app/app.state';
import { ProductsState } from '@app/products/state/products.reducer';


export const selectProducts = (state: AppState) => state.products;


export const getProducts = createSelector(
  selectProducts,
  (state: ProductsState) => state.products
);

export const getFetchProductsStatus = createSelector(
  selectProducts,
  (state: ProductsState) => state.fetchProductsStatus
);

export const getFetchProductsError = createSelector(
  selectProducts,
  (state: ProductsState) => state.fetchProductsError
);


export const getDeleteProductStatus = createSelector(
  selectProducts,
  (state: ProductsState) => state.deleteProductStatus
);

export const getDeleteProductError = createSelector(
  selectProducts,
  (state: ProductsState) => state.deleteProductError
);