import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { logout } from '@app/auth/state/auth.actions';
import { getUser } from '@app/auth/state/auth.selectors';
import { AuthUser } from '@app/auth/interfaces';


interface TopnavLink {
  route?: string;
  icon?: string;
  onClick?: any;
  text: string;
}


@Component({
  selector: 'app-core-topnav',
  templateUrl: './core-topnav.component.html',
  styleUrls: ['./core-topnav.component.scss']
})
export class CoreTopnavComponent implements OnInit {
  isToggled = false;
  user$: Observable<AuthUser | null> = this.store.select(getUser);

  authProfileLink: TopnavLink = { 
    route: '/auth/profile', icon: 'account_circle', text: '-' 
  };

  logoutLink: TopnavLink = { 
    route: '', onClick: this.logout, icon: 'power_settings_new', text: 'logout'
  };

  loginLink: TopnavLink = { 
    route: '/auth/login', icon: 'account_circle', text: 'Login'
  };

  links: TopnavLink[] = [];

  constructor(
    private store: Store<any>
  ) { }

  ngOnInit(): void {
    this.user$?.subscribe(user => {
      if (user) {
        this.authProfileLink.text = user.email;

        this.links = [
          this.authProfileLink,
          this.logoutLink
        ];
      } else {
        this.links = [
          this.loginLink
        ];
      }
    });
  }

  onKeydown(e: any) {
    if (e.key !== 'Escape') return;
    this.close();
  }

  toggle() {
    this.isToggled = !this.isToggled;
  }

  open() {
    this.isToggled = true;
  }

  close() {
    this.isToggled = false;
  }

  getClass() {
    return this.isToggled ? 'topnav__content is--active' : 'topnav__content';
  }

  logout() {
    this.store.dispatch(logout());
  }
}
