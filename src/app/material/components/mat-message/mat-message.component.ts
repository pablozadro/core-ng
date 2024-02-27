import { Component, Input } from '@angular/core';
import { MatMixTheme } from '../../types';


@Component({
  selector: 'mat-message',
  standalone: true,
  imports: [],
  templateUrl: './mat-message.component.html',
  styleUrl: './mat-message.component.scss'
})
export class MatMessageComponent {
  @Input() theme: MatMixTheme = 'success';
  @Input() label = '-';
 }
