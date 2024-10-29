import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { 
  CoreBrowserTheme, 
  CORE_BROWSER_THEME_LIGHT,
  CORE_BROWSER_THEME_DARK
} from '../types';

import { CoreStorageService } from './core-storage.service';


@Injectable({
  providedIn: 'root'
})
export class CoreThemeService {
  readonly THEME_STORAGE_KEY = 'theme';
  private html;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private readonly coreStorageService: CoreStorageService
  ) {
    this.html = this.document.querySelector('html');
  }

  setTheme(theme: CoreBrowserTheme) {
    if (!this.html) return;
    this.html.dataset[this.THEME_STORAGE_KEY] = theme;
    this.coreStorageService.setItem(this.THEME_STORAGE_KEY, theme);
  }

  getTheme() {
    if (!this.html) return;
    return this.coreStorageService.getItem(this.THEME_STORAGE_KEY);
  }

  initTheme() {
    if (!this.html) return;
    const theme = this.getTheme();
    if (theme) {
      this.html.dataset[this.THEME_STORAGE_KEY] = theme;
    } else {
      this.setTheme(CORE_BROWSER_THEME_LIGHT);
    };
  }

  toggleTheme(): CoreBrowserTheme {
    const currentTheme = this.coreStorageService.getItem(this.THEME_STORAGE_KEY);
    let newTheme: CoreBrowserTheme;
    switch(currentTheme) {
      case CORE_BROWSER_THEME_DARK:
        newTheme = CORE_BROWSER_THEME_LIGHT;
        break;
      case CORE_BROWSER_THEME_LIGHT:
        newTheme = CORE_BROWSER_THEME_DARK;
        break;
      default:
        newTheme = CORE_BROWSER_THEME_LIGHT;
    }
    this.setTheme(newTheme);
    return newTheme;
  }
}
