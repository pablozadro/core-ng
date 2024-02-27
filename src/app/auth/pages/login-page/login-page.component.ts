import { Component } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { 
  FormControl, 
  FormGroup, 
  Validators, 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';

import { AppState } from '@/app.state';
import { PASSWORD_MIN_LEN, PASSWORD_MAX_LEN } from '../../config';
import { login } from '../../state/auth.actions';
import { selectAuthLoading, selectAuthError } from '../../state/auth.selector';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  loading$: Observable<boolean> = this.store.select(selectAuthLoading);
  error$: Observable<string | null> = this.store.select(selectAuthError);

  passwordMinLen = PASSWORD_MIN_LEN;
  passwordMaxLen = PASSWORD_MAX_LEN;

  email = new FormControl(
    'foo@localhost.io', [ 
    Validators.required, Validators.email 
  ]);

  password = new FormControl(
    'abc123', [ 
    Validators.required, 
    Validators.minLength(PASSWORD_MIN_LEN),
    Validators.maxLength(PASSWORD_MAX_LEN),
  ]);

  form = new FormGroup({
    email: this.email,
    password: this.password,
  });

  constructor(
    private store: Store<AppState>
  ) {
    
  }

  onSubmit() {
    if (this.form.invalid) return;
    const email = this.email.value || '';
    const password = this.password.value || '';
    this.store.dispatch(login({ email, password }));
  }
}
