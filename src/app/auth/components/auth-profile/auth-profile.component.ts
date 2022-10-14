import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthUser } from '@app/auth/interfaces';
import { getUser } from '@app/auth/state/auth.selectors';


@Component({
  selector: 'app-auth-profile',
  templateUrl: './auth-profile.component.html',
  styleUrls: ['./auth-profile.component.scss']
})
export class AuthProfileComponent implements OnInit {
  user$: Observable<AuthUser | null> = this.store.select(getUser);

  constructor(
    private store: Store<any>,
  ) { }

  ngOnInit(): void {}

}
