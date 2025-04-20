import { Routes } from '@angular/router';
import { authTokenGuard } from '@/auth/guards/auth-token.guard';
import { CoreLandingComponent } from '@/core/pages/core-landing/core-landing.component';
import { AuthProfileComponent } from '@/auth/pages/auth-profile/auth-profile.component';
import { AuthLoginComponent } from '@/auth/pages/auth-login/auth-login.component';
import { MaterialDemoComponent } from '@/material/pages/material-demo/material-demo.component';


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
  },
  { 
    path: 'material/demo', 
    component: MaterialDemoComponent,
    title: 'Material',
    data: {
      title: 'Material'
    }
  }
];
