import { Component, Input } from '@angular/core';
import { MatSize, MatBrandTheme } from '../../types';

@Component({
  selector: 'mat-brand',
  standalone: true,
  imports: [],
  templateUrl: './mat-brand.component.html',
  styleUrl: './mat-brand.component.scss'
})
export class MatBrandComponent {
  @Input() size: MatSize = 'rg';
  @Input() theme: MatBrandTheme = 'black';
}
