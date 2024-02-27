import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthState } from '@/auth/state/auth.reducer';
import { AppState } from '@/app.state';

@Component({
  selector: 'core-topnav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.scss'
})
export class TopnavComponent {
  token: string | null = null;
  auth$: Observable<AuthState> = this.store.select((state: any): AuthState => state.auth);

  constructor(
    private store: Store<AppState>
  ) {
    this.auth$.subscribe((auth: AuthState) => {
      this.token = auth.token;
    })
  }
}
