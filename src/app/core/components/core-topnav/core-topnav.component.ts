import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from '@/auth/state/auth.reducer';
import { Observable } from 'rxjs';
import { logout } from '@/auth/state/auth.actions';


@Component({
  selector: 'app-core-topnav',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './core-topnav.component.html',
  styleUrl: './core-topnav.component.scss'
})
export class CoreTopnavComponent {
  token = '';
  auth$!: Observable<AuthState>;


  constructor(
    private readonly store: Store<any>,
  ) {
    this.auth$ = this.store.pipe(select(AUTH_FEATURE_KEY));
    this.auth$.subscribe(auth => {
      this.token = auth ? auth.token:'';
    });
  }

  onLogout() {
    this.store.dispatch(logout());
  }
}
