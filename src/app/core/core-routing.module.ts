import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoreLandingComponent } from './components/core-landing/core-landing.component';
import { CorePnfComponent } from './components/core-pnf/core-pnf.component';

const routes: Routes = [
  {
    path: '',
    component: CoreLandingComponent,
  },
  {
    path: '**',
    component: CorePnfComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
