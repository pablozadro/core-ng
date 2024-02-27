import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { 
  FormControl, 
  FormGroup, 
  Validators, 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';

import { PASSWORD_MIN_LEN, PASSWORD_MAX_LEN } from '../../config';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  passwordMinLen = PASSWORD_MIN_LEN;
  passwordMaxLen = PASSWORD_MAX_LEN;

  email = new FormControl(
    '', [ 
    Validators.required, Validators.email 
  ]);

  password = new FormControl(
    '*******', [ 
    Validators.required, 
    Validators.minLength(PASSWORD_MIN_LEN),
    Validators.maxLength(PASSWORD_MAX_LEN),
  ]);

  form = new FormGroup({
    email: this.email,
    password: this.password,
  });

  onSubmit() {
    if (this.form.invalid) return;
    console.log('-> onSubmit', this.form.value);
  }
}
