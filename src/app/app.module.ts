import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CoreModule } from '@app/core/core.module';
import { SharedModule } from '@app/shared/shared.module';
import { AuthModule } from '@app/auth/auth.module';

import { AuthInterceptorService } from '@app/auth/services/auth-interceptor.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { authReducer } from '@app/auth/state/auth.reducer';
import { AuthEffects } from '@app/auth/state/auth.effects';

import { productsReducer } from '@app/products/state/products.reducer';
import { ProductsEffects } from '@app/products/state/products.effects';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    SharedModule,
    StoreModule.forRoot({ 
      auth: authReducer,
      products: productsReducer
    }),
    EffectsModule.forRoot([
      AuthEffects,
      ProductsEffects,
    ]),
  ],
    providers: [
    { 
      provide: Window, 
      useValue: window 
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
