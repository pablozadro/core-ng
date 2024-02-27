import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthState } from '@/auth/state/auth.reducer';
import { AppState } from '@/app.state';
import { AuthUser } from '@/auth/types';
import { AuthService } from '@/auth/services/auth.service';

@Component({
  selector: 'core-topnav',
  standalone: true,
  imports: [RouterLink, NgIf],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.scss'
})
export class TopnavComponent {
  user: AuthUser | null = null;
  auth$: Observable<AuthState> = this.store.select((state: any): AuthState => state.auth);

  constructor(
    private store: Store<AppState>,
    private readonly authService: AuthService
  ) {
    this.auth$.subscribe((auth: AuthState) => {
      this.user = auth.user;
    })
  }

  onLogout() {
    this.authService.logout();
  }
}
