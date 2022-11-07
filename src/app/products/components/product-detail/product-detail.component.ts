import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Products } from '@app/products/services/products-api.service';
import { deleteProduct } from '@app/products/state/products.actions';

import {
  getDeleteProductStatus,
  getDeleteProductError
} from '@app/products/state/products.selectors';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  @Input() product!: Products;
  status$: Observable<string> = this.store.select(getDeleteProductStatus);
  error$: Observable<string> = this.store.select(getDeleteProductError);

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
  }

  onDelete(id: number) {
    this.store.dispatch(deleteProduct({ id }));
  }
}
