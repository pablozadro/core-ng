import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe, NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import config from '@/auth/config';
import { login } from '@/auth/state/auth.actions';
import { selectAuth, AuthState } from '@/auth/state/auth.reducer';
import { AppState } from '@root/app/app.reducer';

import { 
  CORE_INPROGRESS_STATUS,
  CORE_DONE_STATUS,
} from '@/core/config';

import { 
  CoreBtnComponent,
  CoreControlComponent,
  CoreLoadingComponent,
  CoreMessageComponent,
} from '@/material/components';


@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    ReactiveFormsModule,
    CoreLoadingComponent,
    CoreBtnComponent,
    CoreControlComponent,
    CoreMessageComponent
  ],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
  readonly CORE_INPROGRESS_STATUS = CORE_INPROGRESS_STATUS;
  readonly CORE_DONE_STATUS = CORE_DONE_STATUS;
  readonly PASSWORD_MIN_LEN = config.passwordMinLength;
  
  title = '';

  authState$!: Observable<AuthState>;

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
    private readonly route: ActivatedRoute,
    private readonly store: Store<AppState>
  ) {
    this.authState$ = this.store.select(selectAuth);
    this.title = this.route.snapshot.data['title'];
  }

  onFormSubmit() {
    if(this.form.invalid) return;

    this.store.dispatch(login({
      email: this.email.value || '', 
      password: this.password.value || ''
    }));
  }
}
