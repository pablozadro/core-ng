import { Component, OnInit, Input } from '@angular/core';

import { Products } from '@app/products/services/products-api.service';


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  @Input() products: Products[] | null = null;

  constructor() { }

  ngOnInit(): void {

  }

}
