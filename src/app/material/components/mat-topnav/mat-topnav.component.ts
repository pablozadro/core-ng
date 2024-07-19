import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store, } from '@ngrx/store';
import { AuthState } from '@/auth/state/auth.reducer';
import { Observable } from 'rxjs';
import { logout } from '@/auth/state/auth.actions';
import { toggleTheme } from '@/material/state/material.actions';
import { MatBtnComponent } from '@/material/components/mat-btn/mat-btn.component';
import { MatBrandComponent } from '@/material/components/mat-brand/mat-brand.component';


export interface MatTopnavLink {
  type: 'link' | 'button';
  url?: string;
  label?: string;
  icon?: string;
  action?: any;
  squared?: boolean;
}

@Component({
  selector: 'app-mat-topnav',
  standalone: true,
  imports: [
    RouterModule,
    MatBtnComponent,
    MatBrandComponent,
  ],
  templateUrl: './mat-topnav.component.html',
  styleUrl: './mat-topnav.component.scss'
})
export class MatTopnavComponent {
  token = '';
  auth$!: Observable<AuthState>;

  homeLink: MatTopnavLink = { type: 'link', label: 'Inicio', url: '' };
  loginLink: MatTopnavLink = { type: 'link', label: 'Login', url: '/auth/login' };
  profileLink: MatTopnavLink = { type: 'link', label: 'Welcome', url: '/auth/profile' };
  themeButton: MatTopnavLink = { type: 'button', action: () => this.onToggleTheme(), icon: "light_mode", squared: true };
  logoutButton: MatTopnavLink = { type: 'button', action: () => this.onLogout(), label: 'Logout' };

  mainLinks: MatTopnavLink[] = [];
  secondaryLinks: MatTopnavLink[] = [];

  constructor (
    private readonly store: Store<any>,
  ) {
    this.store.subscribe(state => {
      this.token = state.app.auth ? state.app.auth.token:'';
      this.setLinks();
    });
  }

  setLinks() {
    this.mainLinks = [
      this.homeLink
    ];
    if (this.token) {
      this.secondaryLinks = [
        this.profileLink,
        this.logoutButton,
        this.themeButton
      ]
    } else {
      this.secondaryLinks = [
        this.loginLink,
        this.themeButton
      ]
    }
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  onToggleTheme() {
    this.store.dispatch(toggleTheme());
  }

  onToggleNav() {}
}
