import { Component, Input } from '@angular/core';
import { 
  MatBrandTheme,
  MatSize,
  MAT_BRAND_THEME_PRIMARY,
  MAT_SIZE_RG
} from '@/material/config';



@Component({
  selector: 'app-mat-brand',
  standalone: true,
  imports: [],
  templateUrl: './mat-brand.component.html',
  styleUrl: './mat-brand.component.scss'
})
export class MatBrandComponent {
  @Input() theme: MatBrandTheme = MAT_BRAND_THEME_PRIMARY;
  @Input() size: MatSize = MAT_SIZE_RG;
}
