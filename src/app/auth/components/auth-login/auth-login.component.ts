import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { 
  CORE_INPROGRESS_STATUS,
  CoreLoadingComponent,
  CoreBtnComponent,
  CoreControlComponent,
  CoreMessageComponent
} from 'core-material'

import { login } from '@/auth/state/auth.actions';


@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [
    NgIf,
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
  PASSWORD_MIN_LEN = 6;
  title = '';

  state$!: Observable<Store>;

  loading = false;
  error = '';

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
    private readonly store: Store<any>
  ) {
    this.title = this.route.snapshot.data['title'];

    this.store.subscribe((state: any) => {
      this.loading = state.app.auth.status === CORE_INPROGRESS_STATUS;
      this.error = state.app.auth.error;
    });
  }

  onFormSubmit() {
    if(this.form.invalid) return;

    this.store.dispatch(login({
      email: this.email.value || '', 
      password: this.password.value || ''
    }));
  }
}
