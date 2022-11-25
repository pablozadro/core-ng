import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Product } from '@app/products/models';
import { 
  getProduct, 
  getFetchProductStatus,
  getFetchProductError,
} from '@app/products/state/products.selectors';

import { fetchProduct } from '@app/products/state/products.actions';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  productID?: number;

  loading = false;

  product$: Observable<Product | null> = this.store.select(getProduct);
  status$: Observable<string> = this.store.select(getFetchProductStatus);
  error$: Observable<string> = this.store.select(getFetchProductError);


  constructor(
    private route: ActivatedRoute,
    private store: Store<any>,
  ) { }

  ngOnInit(): void {
    this.productID = Number(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(fetchProduct({ id: this.productID }));
  }

}
