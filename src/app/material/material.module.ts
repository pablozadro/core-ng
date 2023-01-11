import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialButtonComponent } from './components/material-button/material-button.component';
import { MaterialBrandComponent } from './components/material-brand/material-brand.component';
import { MaterialLoadingComponent } from './components/material-loading/material-loading.component';
import { MaterialMessageComponent } from './components/material-message/material-message.component';
import { MaterialSpinnerComponent } from './components/material-spinner/material-spinner.component';



@NgModule({
  declarations: [
    MaterialButtonComponent,
    MaterialBrandComponent,
    MaterialLoadingComponent,
    MaterialMessageComponent,
    MaterialSpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MaterialButtonComponent,
    MaterialBrandComponent,
    MaterialLoadingComponent,
    MaterialMessageComponent,
    MaterialSpinnerComponent
  ],
})
export class MaterialModule { }
