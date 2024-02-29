import { Component, Input, OnInit } from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { 
  FormControl,
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';

import { CoSize } from '@/material/types';
import { CO_SIZE_RG } from '@/material/config';


@Component({
  selector: 'co-control',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './control.component.html',
  styleUrl: './control.component.scss'
})
export class ControlComponent implements OnInit {
  @Input() size: CoSize = CO_SIZE_RG;
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() placeholder = '';
  @Input() warning = false;
  @Input() error = false;
  @Input() showHidePassword = false;
  @Input() icon: string | null = null;
  // @ts-ignore
  @Input() formControl: FormControl;

  constructor() {}

  ngOnInit(): void {
    if (this.showHidePassword) {
      this.icon = 'visibility';
    }
  }

  onIconClick() {
    if (this.showHidePassword) {
      const currentType = this.type;
      this.type = this.type === 'password' ? 'text':'password';
    }
  }
}
