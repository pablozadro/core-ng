import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Products } from '@app/products/services/products-api.service';
import { fetchProducts } from '@app/products/state/products.actions';
import { 
  getProducts, 
  getFetchProductsStatus,
  getFetchProductsError,
  getDeleteProductStatus,
  getDeleteProductError,
} from '@app/products/state/products.selectors';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {
  loading = false;

  products$: Observable<Products[]> = this.store.select(getProducts);
  status$: Observable<string> = this.store.select(getFetchProductsStatus);
  error$: Observable<string> = this.store.select(getFetchProductsError);

  deleteStatus$: Observable<string> = this.store.select(getDeleteProductStatus);
  deleteError$: Observable<string> = this.store.select(getDeleteProductError);

  constructor(private store: Store<any>) {

  }

  ngOnInit(): void {
    this.store.dispatch(fetchProducts());
  }

  onDelete(e: any) {

  }
}
