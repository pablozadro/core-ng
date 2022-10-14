import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthLoggedGuard } from './guards/auth-logged.guard';
import { AuthLoginComponent } from '@app/auth/components/auth-login/auth-login.component';
import { AuthProfileComponent } from '@app/auth/components/auth-profile/auth-profile.component';


const routes: Routes = [
  {
    path: 'auth/login',
    component: AuthLoginComponent,
  },
  {
    path: 'auth/profile',
    component: AuthProfileComponent,
    canActivate: [ AuthLoggedGuard ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
