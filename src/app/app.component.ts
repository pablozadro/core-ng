import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { TopnavComponent } from '@/core/components/topnav/topnav.component';
import { AuthState } from '@/auth/state/auth.reducer';
import { AuthService } from '@/auth/services/auth.service';
import { loginSuccess } from '@/auth/state/auth.actions';
import { AppState } from './app.state';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TopnavComponent,
  ],
  providers: [
    AuthService
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'core-ng';
  auth$: Observable<AuthState> = this.store.select((state: any): AuthState => state.auth);

  constructor(
    private readonly authService: AuthService,
    private store: Store<AppState>,
  ) {
    const user = this.authService.getUser();
    if (!user) return;
    this.store.dispatch(loginSuccess({ user }));
  }
 }
