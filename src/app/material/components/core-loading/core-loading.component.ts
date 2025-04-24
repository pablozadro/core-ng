import { Component, Input } from '@angular/core';

import { MatSize } from '@/material/types';
import { MAT_SIZE_SM } from '@/material/config';



@Component({
  selector: 'core-loading',
  standalone: true,
  imports: [],
  templateUrl: './core-loading.component.html',
  styleUrl: './core-loading.component.scss'
})
export class CoreLoadingComponent {
  @Input() size: MatSize = MAT_SIZE_SM;
  @Input() label!: string;
}
