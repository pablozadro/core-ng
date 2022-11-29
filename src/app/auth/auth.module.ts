import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthProfileComponent } from './components/auth-profile/auth-profile.component';



@NgModule({
  declarations: [
    AuthLoginComponent,
    AuthProfileComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
