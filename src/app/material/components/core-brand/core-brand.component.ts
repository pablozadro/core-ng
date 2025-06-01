import { Component, Input } from '@angular/core';

import { MatBrandMix, MatSize } from '@/material/types';
import { 
  MAT_BRAND_MIX_PRIMARY,
  MAT_SIZE_MD
} from '@/material/config';


@Component({
  selector: 'core-brand',
  standalone: true,
  imports: [],
  templateUrl: './core-brand.component.html',
  styleUrl: './core-brand.component.scss'
})
export class CoreBrandComponent {
  @Input() mix: MatBrandMix = MAT_BRAND_MIX_PRIMARY;
  @Input() size: MatSize = MAT_SIZE_MD;
}
