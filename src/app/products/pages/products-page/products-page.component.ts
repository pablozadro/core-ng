import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductsService } from '@/products/services/products.service';
import { LoadingComponent } from '@/material/components/loading/loading.component';


@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [NgIf, LoadingComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit, OnDestroy {
  products: [] | null = null;
  loading = false;
  productsSub?: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsService: ProductsService
  ) {
    
  }

  ngOnInit() {
    this.route.queryParams.subscribe((params: any) => {
      console.log('-> params:', params);
    });

    this.loading = true;

    this.productsSub = this.productsService.getProducts().subscribe((res: any) => {
      this.products = res && res.products || null;
      this.loading = false;
      console.log('-> products:', this.products);
    });
  }

  ngOnDestroy() {
    this.productsSub?.unsubscribe();
  }
}
