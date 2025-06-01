import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CoreBtnComponent } from '@/material/components/core-btn/core-btn.component';
import { CoreTopnavComponent } from '@/material/components/core-topnav/core-topnav.component';
import { CoreThemeService } from '@/material/services/core-theme.service';
import { CoreFooterComponent } from '@/core/components/core-footer/core-footer.component';
import { AuthState } from '@/auth/state/auth.reducer';
import { loginSuccess, logout } from '@/auth/state/auth.actions';
import { AuthService } from '@/auth/services/auth-api.service';
import { AppState } from '@/app.reducer';
import { selectAuth } from '@/auth/state/auth.reducer';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    AsyncPipe,
    RouterModule,
    RouterOutlet,
    CoreBtnComponent,
    CoreTopnavComponent,
    CoreFooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  pageTitle = 'Unknown Page';
  authState$!: Observable<AuthState>;

  constructor(
    private readonly coreThemeService: CoreThemeService,
    private readonly authService: AuthService,
    private readonly store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.authState$ = this.store.select(selectAuth);
    const loggedUser  = this.authService.getLoggedUser();

    if(loggedUser) {
      const { user, token } = loggedUser;
      this.store.dispatch(loginSuccess({ user, token }))
    }

    this.coreThemeService.initTheme();
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  onToggleTheme() {
    this.coreThemeService.toggleTheme();
  }
}
