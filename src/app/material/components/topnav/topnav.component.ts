import { Component } from '@angular/core';
import { NgClass, NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AppState } from '@/app.state';
import { selectAuthUser } from '@/auth/state/auth.selector';
import { AuthUser } from '@/auth/types';
import { AuthService } from '@/auth/services/auth.service';
import { ThemeTogglerService } from '../../services/theme-toggler.service';
import { ButtonComponent } from '../button/button.component';
import { BrandComponent } from '../brand/brand.component';


@Component({
  selector: 'co-topnav',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgIf,
    AsyncPipe,
    ButtonComponent,
    BrandComponent
  ],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.scss'
})
export class TopnavComponent {
  user$: Observable<AuthUser | null> = this.store.select(selectAuthUser);
  toggled = false;
  icon = 'menu';

  constructor(
    private readonly store: Store<AppState>,
    private readonly themeTogglerService: ThemeTogglerService,
    private readonly authService: AuthService,
  ){}

  onToggle() {
    this.toggled = !this.toggled;
    this.icon = this.toggled === true ? 'close':'menu';
  }

  onToggleTheme() {
    this.themeTogglerService.toggleTheme();
  }

  onLogout() {
    this.authService.logout();
  }
}
