import { Injectable } from '@angular/core';
import { TitleStrategy, RouterStateSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { APP_TITLE } from '@/core/config';


@Injectable({
  providedIn: 'root'
})
export class PageTitleService extends TitleStrategy {
  constructor(private readonly title: Title) {
    super();
  }

  override updateTitle(routerState: RouterStateSnapshot) {
    const title = this.buildTitle(routerState);
    if (title) {
      this.title.setTitle(`${APP_TITLE} | ${title}`);
    } else {
      this.title.setTitle(`${APP_TITLE} | Unknown Page`);
    }
  }
}
