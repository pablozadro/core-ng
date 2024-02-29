import { Component, Input } from '@angular/core';
import { CoSize, CoBrandTheme } from '../../types';
import { CO_SIZE_RG, CO_BRAND_THEME_PRIMARY } from '../../config';

@Component({
  selector: 'co-brand',
  standalone: true,
  imports: [],
  templateUrl: './brand.component.html',
  styleUrl: './brand.component.scss'
})
export class BrandComponent {
  @Input() size: CoSize = CO_SIZE_RG;
  @Input() theme: CoBrandTheme = CO_BRAND_THEME_PRIMARY;
}
