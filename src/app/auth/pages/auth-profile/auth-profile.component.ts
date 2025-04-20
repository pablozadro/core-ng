import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '@/app.reducer';
import { selectAuth, AuthState } from '@/auth/state/auth.reducer';

@Component({
  selector: 'app-auth-profile',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './auth-profile.component.html',
  styleUrl: './auth-profile.component.scss'
})
export class AuthProfileComponent {
  authState$!: Observable<AuthState>;

  constructor(private store: Store<AppState>) {
    this.authState$ = this.store.select(selectAuth);
  }
}