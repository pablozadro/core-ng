import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'mat-button',
  standalone: true,
  imports: [NgIf],
  templateUrl: './mat-button.component.html',
  styleUrl: './mat-button.component.scss'
})
export class MatButtonComponent {
  @Input() type: 'submit' | 'reset' | 'button' = 'button';
  @Input() label: string | null = null;
  @Input() icon: string | null = null;
}
