import { createReducer, on } from '@ngrx/store';

import * as actions from '@app/products/state/products.actions';
import { Product } from '@app/products/models';


export interface ProductsState {
  products: Product[];
  fetchProductsStatus: string;
  fetchProductsError: string;
  deleteProductStatus: string;
  deleteProductError: string;
}


const productsInitialState: ProductsState = {
  products: [],
  fetchProductsStatus: 'PENDING',
  fetchProductsError: '',
  deleteProductStatus: 'PENDING',
  deleteProductError: '',
};


export const productsReducer = createReducer(
  productsInitialState,
  on(actions.fetchProducts, (state: ProductsState): ProductsState => {
    return { 
      ...state, 
      fetchProductsStatus: 'INPROGRESS',
    }
  }),
  on(actions.fetchProductsSuccess, (state: ProductsState, action: any): ProductsState => {
    return { 
      ...state,
      products: action.products,
      fetchProductsStatus: 'COMPLETED',
      fetchProductsError: '',
    }
  }),
  on(actions.fetchProductsError, (state: ProductsState, action: any): ProductsState => {
    return { 
      ...state,
      products: [],
      fetchProductsStatus: 'COMPLETED',
      fetchProductsError: action.error,
    }
  }),
  on(actions.deleteProduct, (state: ProductsState): ProductsState => {
    return { 
      ...state,
      deleteProductStatus: 'INPROGRESS'
    }
  }),
  on(actions.deleteProductSuccess, (state: ProductsState, action: any): ProductsState => {
    return { 
      ...state,
      products: action.products,
      deleteProductStatus: 'COMPLETED',
      deleteProductError: '',
    }
  }),
  on(actions.deleteProductError, (state: ProductsState, action: any): ProductsState => {
    return { 
      ...state,
      deleteProductStatus: 'COMPLETED',
      deleteProductError: action.error,
    }
  }),
);