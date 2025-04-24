import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

import {MatSize } from '@/material/types';
import { MAT_SIZE_RG } from '@/material/config';


export interface CoreSelectOption {
  label: string;
  value: any;
  disabled?: boolean;
}

interface ValidationMessages {
  required?: string;
  email?: string;
  minlength?: string;
  maxlength?: string;
}

@Component({
  selector: 'core-select',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './core-select.component.html',
  styleUrl: './core-select.component.scss'
})
export class CoreSelectComponent implements OnInit {
  readonly defaultValidationMessages: ValidationMessages = {
    required: 'Field required',
    email: 'Invalid email',
    minlength: 'Too short',
    maxlength: 'Too long',
  };

  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() id!: string;
  @Input() size: MatSize = MAT_SIZE_RG;
  @Input() floatLabel = false;
  @Input() block = false;
  @Input() controlStyle: 'flat' | 'invisible' = 'flat';
  @Input() options!: CoreSelectOption[];
  @Input() validationMessages?: ValidationMessages;
  
  messages!: ValidationMessages;

  ngOnInit(): void {
    if(!this.control) {
      throw new Error('<mat-select> control is required.')
    }
    if(!this.id) {
      throw new Error('<mat-select> id is required.')
    }

    this.messages = this.getValidationMessages();
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
