import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { MatBrowserTheme } from '@/material/types';

import { 
  MAT_BROWSER_THEME_LIGHT,
  MAT_BROWSER_THEME_DARK
} from '@/material/config';

import { CoreStorageService } from '../../core/services/core-storage.service';


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

  setTheme(theme: MatBrowserTheme) {
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
      this.setTheme(MAT_BROWSER_THEME_LIGHT);
    };
  }

  toggleTheme(): MatBrowserTheme {
    const currentTheme = this.coreStorageService.getItem(this.THEME_STORAGE_KEY);
    let newTheme: MatBrowserTheme;
    switch(currentTheme) {
      case MAT_BROWSER_THEME_DARK:
        newTheme = MAT_BROWSER_THEME_LIGHT;
        break;
      case MAT_BROWSER_THEME_LIGHT:
        newTheme = MAT_BROWSER_THEME_DARK;
        break;
      default:
        newTheme = MAT_BROWSER_THEME_LIGHT;
    }
    this.setTheme(newTheme);
    return newTheme;
  }
}
