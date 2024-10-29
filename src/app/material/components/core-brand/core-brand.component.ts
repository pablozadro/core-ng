import { Component, Input } from '@angular/core';

import { 
  CoreBrandMix,
  CORE_BRAND_MIX_PRIMARY,
  CoreSize,
  CORE_SIZE_MD
} from '../../types';


@Component({
  selector: 'core-brand',
  standalone: true,
  imports: [],
  templateUrl: './core-brand.component.html',
  styleUrl: './core-brand.component.scss'
})
export class CoreBrandComponent {
  @Input() mix: CoreBrandMix = CORE_BRAND_MIX_PRIMARY;
  @Input() size: CoreSize = CORE_SIZE_MD;
}
