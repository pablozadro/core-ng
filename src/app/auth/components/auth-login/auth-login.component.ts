import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthApiService } from '@/auth/services/auth-api.service';
import { login } from '@/auth/state/auth.actions';
import { CORE_INPROGRESS_STATUS } from '@/core/config';
import { MatLoadingComponent } from '@/material/components/mat-loading/mat-loading.component'; 
import { MatBtnComponent } from '@/material/components/mat-btn/mat-btn.component';
import { MatControlComponent } from '@/material/components/mat-control/mat-control.component';


@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatLoadingComponent,
    MatBtnComponent,
    MatControlComponent,
  ],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class AuthLoginComponent {
  PASSWORD_MIN_LEN = 6;

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
    private readonly authApiService: AuthApiService,
    private readonly store: Store<any>
  ) {
    this.store.subscribe((state: any) => {
      this.loading = state.auth.status === CORE_INPROGRESS_STATUS;
      this.error = state.auth.error;
    })
  }

  onFormSubmit() {
    if(this.form.invalid) return;

    this.store.dispatch(login({
      email: this.email.value || '', 
      password: this.password.value || ''
    }));
  }
}
