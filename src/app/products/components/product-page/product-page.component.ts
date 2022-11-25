import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss']
})
export class ProductPageComponent implements OnInit {
  productID?: number;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productID = Number(this.route.snapshot.paramMap.get('id'));
  }

}
