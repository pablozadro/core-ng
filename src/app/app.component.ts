import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CoreBtnComponent } from '@/material/components/core-btn/core-btn.component';
import { CoreTopnavComponent } from '@/material/components/core-topnav/core-topnav.component';
import { CoreThemeService } from '@/material/services/core-theme.service';
import { CoreFooterComponent } from '@/core/components/core-footer/core-footer.component';
import { AuthUser } from '@/auth/types';
import { AuthState } from '@/auth/state/auth.reducer';
import { loginSuccess, logout } from '@/auth/state/auth.actions';
import { AuthApiService } from '@/auth/services/auth-api.service';
import { RootState } from '@/app.reducer';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
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
  auth$!: Observable<AuthState>;
  token = '';
  user: AuthUser | null = null;


  constructor(
    private readonly coreThemeService: CoreThemeService,
    private readonly authApiService: AuthApiService,
    private readonly store: Store<RootState>
  ) {
    this.store.subscribe((state: RootState) => {
      this.token = state.app.auth ? state.app.auth.token:'';
      this.user = this.authApiService.getUser();
    });
  }

  ngOnInit(): void {
    this.coreThemeService.initTheme();
    const token = this.authApiService.getToken();
    if(token) {
      this.store.dispatch(loginSuccess({ token }));
    }
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  onToggleTheme() {
    this.coreThemeService.toggleTheme();
  }
}
