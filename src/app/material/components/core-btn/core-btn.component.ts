import { Component, Input } from '@angular/core';

import { 
  CoreColorMix,
  CORE_COLOR_MIX_PRIMARY,
  CoreSize,
  CORE_SIZE_RG
} from '../../types';


@Component({
  selector: 'core-btn',
  standalone: true,
  imports: [],
  templateUrl: './core-btn.component.html',
  styleUrl: './core-btn.component.scss'
})
export class CoreBtnComponent {
  @Input() mix: CoreColorMix = CORE_COLOR_MIX_PRIMARY;
  @Input() size: CoreSize = CORE_SIZE_RG;
  @Input() label: string | null = null;
  @Input() icon: string | null = null;
  @Input() squared = false;
  @Input() disabled = false;
  type: 'button' | 'submit' | 'reset' = 'button';
}
