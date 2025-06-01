import { Component, Input } from '@angular/core';

import { MatColorMix, MatSize } from '@/material/types';
import { MAT_SIZE_RG, MAT_COLOR_MIX_SUCCESS  } from '@/material/config';

@Component({
  selector: 'core-message',
  standalone: true,
  imports: [],
  templateUrl: './core-message.component.html',
  styleUrl: './core-message.component.scss'
})
export class CoreMessageComponent {
  @Input() mix: MatColorMix = MAT_COLOR_MIX_SUCCESS;
  @Input() size: MatSize = MAT_SIZE_RG;
  @Input() label = '-';
  @Input() icon!: string;
}
