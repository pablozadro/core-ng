import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
