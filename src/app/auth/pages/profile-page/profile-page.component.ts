import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

import { AuthService } from '@/auth/services/auth.service';
import { AuthUser } from '@/auth/types';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [NgIf],
  providers: [ AuthService ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent {
  user: AuthUser | null;

  constructor(
    private readonly authUser: AuthService
  ) {
    this.user = this.authUser.getUser();
  }
}
