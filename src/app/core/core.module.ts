import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { CoreTopnavComponent } from '@app/core/components/core-topnav/core-topnav.component';
import { CoreFooterComponent } from '@app/core/components/core-footer/core-footer.component';
import { CorePnfComponent } from '@app/core/components/core-pnf/core-pnf.component';
import { CoreLandingComponent } from '@app/core/components/core-landing/core-landing.component';


@NgModule({
  declarations: [
    CoreTopnavComponent,
    CoreFooterComponent,
    CorePnfComponent,
    CoreLandingComponent
  ],
  imports: [
    SharedModule,
    CoreRoutingModule,
    HttpClientModule,
  ],
  exports: [
    CoreFooterComponent,
    CoreTopnavComponent,
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  /**
   * To load services see example:
   * https://angular.io/guide/singleton-services#the-forroot-pattern
   */
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
