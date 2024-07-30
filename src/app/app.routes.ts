import { Routes } from '@angular/router';
import { AuthProfileComponent } from '@/auth/components/auth-profile/auth-profile.component';
import { AuthLoginComponent } from '@/auth/components/auth-login/auth-login.component';
import { CoreLandingComponent } from '@/core/components/core-landing/core-landing.component';
import { authTokenGuard } from '@/auth/guards/auth-token.guard';


export const routes: Routes = [
  { 
    path: '', 
    component: CoreLandingComponent,
    title: 'Welcome',
    data: {
      title: 'Welcome'
    }
  },
  { 
    path: 'auth/login', 
    component: AuthLoginComponent,
    title: 'Login',
    data: {
      title: 'Login'
    }
  },
  { 
    path: 'auth/profile', 
    component: AuthProfileComponent,
    canActivate: [authTokenGuard],
    title: 'Profile',
    data: {
      title: 'Profile'
    }
  }
];
