import { Component, OnInit, Input, NgModule, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'material-brand',
  templateUrl: './material-brand.component.html',
  styleUrls: ['./material-brand.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrandComponent implements OnInit {
  @Input() theme: 'primary' | 'black' | 'white' = 'primary';
  @Input() size: 'sm' | 'rg' | 'md' | 'lg' | 'xl' | 'xxl' = 'rg';

  constructor() { }

  ngOnInit(): void {}
}



@NgModule({
  imports: [ CommonModule ],
  declarations: [ BrandComponent ],
  exports: [ BrandComponent ],
})
export class BrandModule { }
