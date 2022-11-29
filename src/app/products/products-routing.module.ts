import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductPageComponent } from './components/product-page/product-page.component';
import { ProductsPageComponent } from './components/products-page/products-page.component';

const routes: Routes = [
  { path: ':id', component: ProductPageComponent },
  { path: '', component: ProductsPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
