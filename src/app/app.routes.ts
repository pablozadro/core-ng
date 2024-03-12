import { Routes } from '@angular/router';

import { LandingPageComponent } from '@/core/pages/landing-page/landing-page.component';
import { PnfPageComponent } from '@/core/pages/pnf-page/pnf-page.component';
import { LoginPageComponent } from '@/auth/pages/login-page/login-page.component';
import { ProfilePageComponent } from './auth/pages/profile-page/profile-page.component';
import { ProductsPageComponent } from './products/pages/products-page/products-page.component';

import { authIsLoggedGuard } from './auth/guards/auth-is-logged.guard';

export const routes: Routes = [
  { 
    path: '', 
    component: LandingPageComponent 
  },
  { 
    path: 'products', 
    component: ProductsPageComponent 
  },
  { 
    path: 'auth/login', 
    component: LoginPageComponent 
  },
  { 
    path: 'auth/profile', 
    component: ProfilePageComponent, 
    canActivate: [authIsLoggedGuard] 
  },
  { 
    path: '**', 
    component: PnfPageComponent, pathMatch: 'full' 
  },
];
