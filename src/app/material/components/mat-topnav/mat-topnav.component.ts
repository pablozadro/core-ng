import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from '@/auth/state/auth.reducer';
import { Observable } from 'rxjs';
import { logout } from '@/auth/state/auth.actions';


@Component({
  selector: 'app-mat-topnav',
  standalone: true,
  imports: [
    RouterModule,
  ],
  templateUrl: './mat-topnav.component.html',
  styleUrl: './mat-topnav.component.scss'
})
export class MatTopnavComponent {
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
