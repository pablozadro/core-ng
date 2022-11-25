import { createReducer, on } from '@ngrx/store';

import * as actions from '@app/products/state/products.actions';
import { Product } from '@app/products/models';


export interface ProductsState {
  product: Product | null;
  fetchProductStatus: string;
  fetchProductError: string;
  products: Product[];
  fetchProductsStatus: string;
  fetchProductsError: string;
  deleteProductStatus: string;
  deleteProductError: string;
}


const productsInitialState: ProductsState = {
  product: null,
  fetchProductStatus: 'PENDING',
  fetchProductError: '',
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
  on(actions.fetchProduct, (state: ProductsState): ProductsState => {
    return { 
      ...state, 
      fetchProductStatus: 'INPROGRESS',
    }
  }),
  on(actions.fetchProductSuccess, (state: ProductsState, action: any): ProductsState => {
    return { 
      ...state,
      product: action.product,
      fetchProductStatus: 'COMPLETED',
      fetchProductError: '',
    }
  }),
  on(actions.fetchProductError, (state: ProductsState, action: any): ProductsState => {
    return { 
      ...state,
      product: null,
      fetchProductStatus: 'COMPLETED',
      fetchProductError: action.error,
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