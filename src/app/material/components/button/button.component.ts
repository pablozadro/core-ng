import { Component, Input } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { CoSize, CoTheme } from '../../types';
import { CO_SIZE_RG, CO_THEME_PRIMARY } from '../../config';

@Component({
  selector: 'co-button',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() size: CoSize = CO_SIZE_RG;
  @Input() theme: CoTheme = CO_THEME_PRIMARY;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() label: string | null = null;
  @Input() icon: string | null = null;
  @Input() disabled = false;
  @Input() squared = false;
  @Input() iconPosition: 'left' | 'right' = 'right';
}
