import { Component } from '@angular/core';
import { NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '@/app.state';
import { AuthUser } from '@/auth/types';
import { AuthService } from '@/auth/services/auth.service';
import { selectAuthUser } from '@/auth/state/auth.selector';

@Component({
  selector: 'core-topnav',
  standalone: true,
  imports: [RouterLink, NgIf, AsyncPipe],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.scss'
})
export class TopnavComponent {
  user$: Observable<AuthUser | null> = this.store.select(selectAuthUser);

  constructor(
    private store: Store<AppState>,
    private readonly authService: AuthService
  ) {
  }

  onLogout() {
    this.authService.logout();
  }
}
