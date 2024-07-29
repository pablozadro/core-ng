import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-profile',
  standalone: true,
  imports: [],
  templateUrl: './auth-profile.component.html',
  styleUrl: './auth-profile.component.scss'
})
export class AuthProfileComponent {
  title = '';

  constructor(
    private readonly route: ActivatedRoute
  ) {
    this.title = this.route.snapshot.data['title'];
  }
}
