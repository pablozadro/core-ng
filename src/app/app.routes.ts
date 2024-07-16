import { Routes } from '@angular/router';
import { AuthLoginComponent } from '@/auth/components/auth-login/auth-login.component';
import { CoreLandingComponent } from '@/core/components/core-landing/core-landing.component';


export const routes: Routes = [
  { 
    path: '', 
    component: CoreLandingComponent,
    data: {
      title: 'Welcome'
    }
  },
  { 
    path: 'auth/login', 
    component: AuthLoginComponent,
    data: {
      title: 'Login'
    }
  }
];
