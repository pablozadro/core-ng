import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CoreApiService } from '@/core/services/core-api.service';


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
  AUTH_LOGIN_URL = 'http://localhost:9001/api/v1/auth/login';

  showHidePasswordType = this.SHOW_HIDE_PASSWORD_TYPE;
  showHidePasswordText = this.SHOW_HIDE_SHOW_TEXT;

  email = new FormControl('', [
    Validators.required, 
    Validators.email
  ]);

  password = new FormControl('', [
    Validators.required,
    Validators.minLength(this.PASSWORD_MIN_LEN)
  ]);

  form = new FormGroup({
    email: this.email,
    password: this.password,
  });

  constructor(
    private readonly coreApiService: CoreApiService
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
    this.coreApiService
      .post(
        this.AUTH_LOGIN_URL, 
        { email: this.email.value, password: this.password.value }
      )
      .subscribe(res => {
      })
  }
}
