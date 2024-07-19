import { Component, Input } from '@angular/core';
import { 
  MatTheme, 
  MAT_THEME_PRIMARY,
  MatSize,
  MAT_SIZE_RG
} from '@/material/config';


@Component({
  selector: 'app-mat-btn',
  standalone: true,
  imports: [],
  templateUrl: './mat-btn.component.html',
  styleUrl: './mat-btn.component.scss'
})
export class MatBtnComponent {
  @Input() label!: string;
  @Input() theme: MatTheme = MAT_THEME_PRIMARY;
  @Input() size: MatSize = MAT_SIZE_RG;
  @Input() icon!: string;
  @Input() squared = false;
}
