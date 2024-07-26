import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterOutlet, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { Observable, filter } from 'rxjs';


import { CoreFooterComponent } from '@/core/components/core-footer/core-footer.component';
import { AuthState } from '@/auth/state/auth.reducer';
import { loginSuccess, logout } from '@/auth/state/auth.actions';
import { AuthApiService } from '@/auth/services/auth-api.service';
import { toggleTheme } from '@/material/state/material.actions';
import { MatTopnavComponent } from '@/material/components/mat-topnav/mat-topnav.component';
import { MatBtnComponent } from '@/material/components/mat-btn/mat-btn.component';
import { initTheme } from '@/material/state/material.actions';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    MatTopnavComponent,
    MatBtnComponent,
    CoreFooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  pageTitle = 'Unknown Page';
  auth$!: Observable<AuthState>;
  token = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authApiService: AuthApiService,
    private readonly store: Store<any>
  ) {
    this.store.subscribe(state => {
      this.token = state.app.auth ? state.app.auth.token:'';
    });
  }

  ngOnInit(): void {
    this.store.dispatch(initTheme());
    const token = this.authApiService.getToken();
    if(token) {
      this.store.dispatch(loginSuccess({ token }));
    }
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  onToggleTheme() {
    this.store.dispatch(toggleTheme());
  }

}
