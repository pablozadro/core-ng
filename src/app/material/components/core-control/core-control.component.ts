import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { 
  CoreSize,
  CORE_SIZE_RG
} from '../../types';


@Component({
  selector: 'core-control',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './core-control.component.html',
  styleUrl: './core-control.component.scss'
})
export class CoreControlComponent implements OnInit {
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() placeholder = '-';
  @Input() id!: string;
  @Input() size: CoreSize = CORE_SIZE_RG;
  @Input() floatLabel = false;
  @Input() showHide = false;
  @Input() block = false;
  @Input() showHideIcon = 'visibility';
  @Input() controlStyle: 'flat' | 'invisible' = 'flat';

  ngOnInit(): void {
    if(!this.control) {
      throw new Error('<app-mat-control> control is required.')
    }
    if(!this.id) {
      throw new Error('<app-mat-control> id is required.')
    }
  }

  onShowHide() {
    this.type = this.type === 'password' ? 'text':'password';
    this.showHideIcon = this.type === 'password' ? 'visibility':'visibility_off';
  }
}
