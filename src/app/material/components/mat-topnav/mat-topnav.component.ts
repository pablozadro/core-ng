import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store, } from '@ngrx/store';
import { AuthState } from '@/auth/state/auth.reducer';
import { Observable } from 'rxjs';
import { logout } from '@/auth/state/auth.actions';
import { toggleTheme } from '@/material/state/material.actions';
import { MatBtnComponent } from '@/material/components/mat-btn/mat-btn.component';
import { MatBrandComponent } from '@/material/components/mat-brand/mat-brand.component';

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


  constructor(
    private readonly store: Store<any>,
  ) {
    this.store.subscribe(state => {
      this.token = state.app.auth ? state.app.auth.token:'';
    });
  }

  onLogout() {
    this.store.dispatch(logout());
  }

  onToggleTheme() {
    this.store.dispatch(toggleTheme());
  }

  onToggleNav() {}
}
