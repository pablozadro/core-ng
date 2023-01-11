import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialBrandModule } from '@app/material/brand';
import { MaterialButtonModule } from '@app/material/button';
import { MaterialLoadingModule } from '@app/material/loading';
import { MaterialMessageModule } from '@app/material/message';
import { MaterialSpinnerModule } from '@app/material/spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialBrandModule,
    MaterialButtonModule,
    MaterialLoadingModule,
    MaterialMessageModule,
    MaterialSpinnerModule,
  ]
})
export class SharedModule { }
