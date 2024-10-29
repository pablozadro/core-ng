import { Component, Input } from '@angular/core';

import { 
  CoreSize,
  CORE_SIZE_SM
} from '../../types';


@Component({
  selector: 'core-loading',
  standalone: true,
  imports: [],
  templateUrl: './core-loading.component.html',
  styleUrl: './core-loading.component.scss'
})
export class CoreLoadingComponent {
  @Input() size: CoreSize = CORE_SIZE_SM;
  @Input() label = 'loading...';
}
