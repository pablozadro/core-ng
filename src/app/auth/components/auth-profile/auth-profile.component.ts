import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { AuthUser } from '@/auth/types';
import { AuthApiService } from '@/auth/services/auth-api.service';

@Component({
  selector: 'app-auth-profile',
  standalone: true,
  imports: [AsyncPipe, NgIf],
  templateUrl: './auth-profile.component.html',
  styleUrl: './auth-profile.component.scss'
})
export class AuthProfileComponent {
  title = '';
  user: AuthUser | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly authApiService: AuthApiService,
    private readonly store: Store<any>
  ) {
    this.title = this.route.snapshot.data['title'];
    this.store.subscribe(() => {
      this.user = this.authApiService.getUser();
    });
  }
}
