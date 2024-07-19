import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router, RouterOutlet, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

import { AuthApiService } from '@/auth/services/auth-api.service';
import { loginSuccess } from './auth/state/auth.actions';
import { MatTopnavComponent } from '@/material/components/mat-topnav/mat-topnav.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatTopnavComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  pageTitle = 'Unknown Page';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authApiService: AuthApiService,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => {
        const route = this.route.firstChild || this.route;
        route.data.subscribe(data => {
          if(!data['title']) return;
          this.pageTitle = data['title'];
        });
      });

    const token = this.authApiService.getToken();
    if(token) {
      this.store.dispatch(loginSuccess({ token }));
    }
  }
}
