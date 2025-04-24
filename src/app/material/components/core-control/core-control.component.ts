import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import { MatSize } from '@/material/types';
import { MAT_SIZE_RG } from '@/material/config';


export interface ValidationMessages {
  required?: string;
  email?: string;
  minlength?: string;
  maxlength?: string;
}

@Component({
  selector: 'core-control',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './core-control.component.html',
  styleUrl: './core-control.component.scss'
})
export class CoreControlComponent implements OnInit {
  readonly defaultValidationMessages: ValidationMessages = {
    required: 'Field required',
    email: 'Invalid email',
    minlength: 'Too short',
    maxlength: 'Too long',
  };

  @Input() type: 'text' | 'email' | 'password' = 'text';
  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() id!: string;
  @Input() size: MatSize = MAT_SIZE_RG;
  @Input() floatLabel = false;
  @Input() showHide = false;
  @Input() block = false;
  @Input() showHideIcon = 'visibility';
  @Input() controlStyle: 'flat' | 'invisible' = 'flat';
  @Input() validationMessages?: ValidationMessages;
  
  messages!: ValidationMessages;

  ngOnInit(): void {
    if(!this.control) {
      throw new Error('<app-mat-control> control is required.')
    }
    if(!this.id) {
      throw new Error('<app-mat-control> id is required.')
    }

    this.messages = this.getValidationMessages();
  }

  onShowHide() {
    this.type = this.type === 'password' ? 'text':'password';
    this.showHideIcon = this.type === 'password' ? 'visibility':'visibility_off';
  }

  private getValidationMessages(): ValidationMessages {
    const o = Object.assign(
      {}, 
      this.defaultValidationMessages, 
      this.validationMessages
    );
    return o;
  }
}
