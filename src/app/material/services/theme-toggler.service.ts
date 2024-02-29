import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { CoreStorageService } from '@/core/services/storage.service';
import { CoTheme } from '../types';
import { LIGHT_THEME, DARK_THEME } from '../config';




@Injectable({
  providedIn: 'root'
})
export class ThemeTogglerService {
  private readonly THEME_KEY = 'core-theme';
  private theme: CoTheme = LIGHT_THEME;
  private html;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly coreStorageService: CoreStorageService
  ) {
    this.html = this.document.querySelector('html');
    const t = this.coreStorageService.getItem(this.THEME_KEY);
    if (t) {
      this.theme = t;
      this.setTheme(this.theme);
    }
  }

  toggleTheme() {
    const d = Object.assign({}, this.html?.dataset);
    this.theme = d['theme'] === LIGHT_THEME ? DARK_THEME:LIGHT_THEME;
    this.setTheme(this.theme);
  }

  private setTheme(theme: CoTheme) {
    if (!this.html) return;
    this.html.dataset['theme'] = theme;
    this.coreStorageService.setItem(this.THEME_KEY, theme);
  }
}
