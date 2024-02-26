import { Routes } from '@angular/router';

import { LandingPageComponent } from './core/pages/landing-page/landing-page.component';
import { PnfPageComponent } from './core/pages/pnf-page/pnf-page.component';


export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: '**', component: PnfPageComponent, pathMatch: 'full' },
];
