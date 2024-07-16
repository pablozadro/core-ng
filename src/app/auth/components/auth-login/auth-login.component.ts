import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthApiService } from '@/auth/services/auth-api.service';


@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
  PASSWORD_MIN_LEN = 6;
  SHOW_HIDE_SHOW_TEXT = 'show';
  SHOW_HIDE_HIDE_TEXT = 'hide';
  SHOW_HIDE_PASSWORD_TYPE = 'password';
  SHOW_HIDE_TEXT_TYPE = 'text';

  showHidePasswordType = this.SHOW_HIDE_PASSWORD_TYPE;
  showHidePasswordText = this.SHOW_HIDE_SHOW_TEXT;

  loading = false;
  msg = '';

  email = new FormControl('abc@mock.io', [
    Validators.required, 
    Validators.email
  ]);

  password = new FormControl('abc123', [
    Validators.required,
    Validators.minLength(this.PASSWORD_MIN_LEN)
  ]);

  form = new FormGroup({
    email: this.email,
    password: this.password,
  });

  constructor(
    private readonly authApiService: AuthApiService
  ) {}

  onShowHide() {
    if(this.showHidePasswordType === this.SHOW_HIDE_PASSWORD_TYPE) {
      this.showHidePasswordType = this.SHOW_HIDE_TEXT_TYPE;
      this.showHidePasswordText = this.SHOW_HIDE_HIDE_TEXT;
    } else {
      this.showHidePasswordType = this.SHOW_HIDE_PASSWORD_TYPE;
      this.showHidePasswordText = this.SHOW_HIDE_SHOW_TEXT;
    }
  }

  onFormSubmit() {
    if(this.form.invalid) return;
    this.loading  = true;
    this.authApiService.login({ 
      email: this.email.value || '', 
      password: this.password.value || ''
    }).subscribe(token => {
      this.loading  = false;
      this.msg = !!token ? 'success':'error';
      console.log('-> token', token);
    });
  }
}
