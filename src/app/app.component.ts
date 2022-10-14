import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { loadLoggedUser } from '@app/auth/state/auth.actions';
import { AuthUser } from '@app/auth/interfaces';
import { getUser } from '@app/auth/state/auth.selectors';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  user$: Observable<AuthUser | null> = this.store.select(getUser);

  constructor(
    private store: Store<any>,
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadLoggedUser());
  }
}
