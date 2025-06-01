import { Component, Input } from '@angular/core';

import { MatColorMix, MatSize } from '@/material/types';

import { 
  MAT_COLOR_MIX_PRIMARY,
  MAT_SIZE_RG
} from '@/material/config';


@Component({
  selector: 'core-btn',
  standalone: true,
  imports: [],
  templateUrl: './core-btn.component.html',
  styleUrl: './core-btn.component.scss'
})
export class CoreBtnComponent {
  @Input() mix: MatColorMix = MAT_COLOR_MIX_PRIMARY;
  @Input() size: MatSize = MAT_SIZE_RG;
  @Input() label: string | null = null;
  @Input() icon: string | null = null;
  @Input() squared = false;
  @Input() disabled = false;
  type: 'button' | 'submit' | 'reset' = 'button';
}
