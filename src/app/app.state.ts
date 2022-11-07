import { AuthState } from '@app/auth/state/auth.reducer';
import { ProductsState } from '@app/products/state/products.reducer';

export interface AppState {
  auth: AuthState;
  products: ProductsState;
}