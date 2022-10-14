import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import config from '@app/config';
import authConfig from '@app/auth/config';
import { login } from '@app/auth/state/auth.actions';
import { 
  getLoginError, 
  getLoginStatus 
} from '@app/auth/state/auth.selectors';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {
  readonly IN_PROGRESS = config.status.IN_PROGRESS;
  emailMaxLength = authConfig.emailMaxLength;
  passwordMinLength = authConfig.passwordMinLength;
  passwordMaxLength = authConfig.passwordMaxLength;

  loginStatus$: Observable<string> = this.store.select(getLoginStatus);
  loginError$: Observable<string> = this.store.select(getLoginError);

  email = new FormControl('', [ 
    Validators.required,
    Validators.maxLength(authConfig.emailMaxLength),
    Validators.email,
  ]);

  password = new FormControl('', [ 
    Validators.required,
    Validators.minLength(authConfig.passwordMinLength),
    Validators.maxLength(authConfig.passwordMaxLength),
  ]);

  form = new FormGroup({
    email: this.email,
    password: this.password,
  });

  constructor(
    private store: Store<any>,
  ) {

  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.form.status === 'INVALID') return;
    const body = {
      email: this.email.value || '',
      password: this.password.value || '',
    };
    this.store.dispatch(login({ body }));
  }
}
