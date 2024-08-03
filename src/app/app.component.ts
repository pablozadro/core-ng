import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';


import { CoreFooterComponent } from '@/core/components/core-footer/core-footer.component';
// import { MatTopnavComponent } from '@/material/components/mat-topnav/mat-topnav.component';
// import { MatBtnComponent } from '@/material/components/mat-btn/mat-btn.component';

import { AuthState } from '@/auth/state/auth.reducer';
import { loginSuccess, logout } from '@/auth/state/auth.actions';
import { AuthApiService } from '@/auth/services/auth-api.service';
import { toggleTheme } from '@/material/state/material.actions';
import { initTheme } from '@/material/state/material.actions';
import { AuthUser } from '@/auth/types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    // MatTopnavComponent,
    // MatBtnComponent,
    CoreFooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  // @ViewChild(MatTopnavComponent) matTopnav!:MatTopnavComponent;

  pageTitle = 'Unknown Page';
  auth$!: Observable<AuthState>;
  token = '';
  user: AuthUser | null = null;


  constructor(
    private readonly authApiService: AuthApiService,
    private readonly store: Store<any>
  ) {
    this.store.subscribe(state => {
      this.token = state.app.auth ? state.app.auth.token:'';
      this.user = this.authApiService.getUser();
    });
  }

  ngOnInit(): void {
    this.store.dispatch(initTheme());
    const token = this.authApiService.getToken();
    
    if(token) {
      this.store.dispatch(loginSuccess({ token }));
    }
  }

  ngAfterViewInit() {
    // this.matTopnav
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  onToggleTheme() {
    this.store.dispatch(toggleTheme());
  }

}
