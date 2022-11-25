import { Component, OnInit, Input } from '@angular/core';

import { Product } from '@app/products/models';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @Input() products: Product[] | null = null;

  constructor() { }

  ngOnInit(): void {

  }

}
