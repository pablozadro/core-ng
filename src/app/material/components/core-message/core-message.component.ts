import { Component, Input } from '@angular/core';

import { 
  CoreColorMix,
  CORE_COLOR_MIX_SUCCESS,
  CoreSize,
  CORE_SIZE_SM
} from '../../types';


@Component({
  selector: 'core-message',
  standalone: true,
  imports: [],
  templateUrl: './core-message.component.html',
  styleUrl: './core-message.component.scss'
})
export class CoreMessageComponent {
  @Input() mix: CoreColorMix = CORE_COLOR_MIX_SUCCESS;
  @Input() size: CoreSize = CORE_SIZE_SM;
  @Input() label = '-';
  @Input() icon!: string;
}
