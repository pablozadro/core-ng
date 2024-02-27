import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { 
  FormControl, 
  FormGroup, 
  Validators, 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';

import { PASSWORD_MIN_LEN, PASSWORD_MAX_LEN } from '@/auth/config';
import { login } from '../../state/auth.actions';
import { AuthState } from '@/auth/state/auth.reducer';
import { AppState } from '@/app.state';

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
  auth$: Observable<AuthState> = this.store.select((state: any): AuthState => state.auth);
  loading = false;
  error: string |  null = null;
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
    this.auth$.subscribe((auth: AuthState) => {
      this.loading = auth.loading;
      this.error = auth.error;
    })
  }

  onSubmit() {
    if (this.form.invalid) return;
    const email = this.email.value || '';
    const password = this.password.value || '';
    this.store.dispatch(login({ email, password }));
  }
}
