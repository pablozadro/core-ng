import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import {
  MatSize,
  MAT_SIZE_RG
} from '@/material/config';


@Component({
  selector: 'app-mat-control',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './mat-control.component.html',
  styleUrl: './mat-control.component.scss'
})
export class MatControlComponent implements OnInit {
  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() id!: string;
  @Input() size: MatSize = MAT_SIZE_RG;
  @Input() floatLabel = false;
  @Input() showHide = false;
  @Input() showHideIcon = 'visibility';

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
