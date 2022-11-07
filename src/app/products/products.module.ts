import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';

import { ProductsRoutingModule } from '@app/products/products-routing.module';

import { ProductsPageComponent } from '@app/products/components/products-page/products-page.component';
import { ProductsListComponent } from '@app/products/components/products-list/products-list.component';
import { ProductDetailComponent } from '@app/products/components/product-detail/product-detail.component';

@NgModule({
  declarations: [
    ProductsPageComponent,
    ProductsListComponent,
    ProductDetailComponent,
  ],
  imports: [
    SharedModule,
    ProductsRoutingModule,
  ]
})
export class ProductsModule { }
