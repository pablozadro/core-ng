import { Injectable } from '@angular/core';
import { CoreStorageService } from '@/core/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeTogglerService {
  private readonly THEME_KEY = 'core-theme';
  private theme: 'light' | 'dark' | null = null;

  constructor(
    private readonly coreStorageService: CoreStorageService
  ) { }

  toggleTheme() {
    if (typeof window === undefined) return;
    const html$ = document.querySelector('html');
    if(!html$) return;

    const currentTheme = html$.dataset['theme'];
    this.theme = currentTheme === 'light' ? 'dark':'light';
    html$.dataset['theme'] = this.theme;
    this.coreStorageService.setItem(this.THEME_KEY, this.theme);
  }

  initTheme() {
    if (typeof window === undefined) return;
    const storageTheme = this.coreStorageService.getItem(this.THEME_KEY);
    const html$ = document.querySelector('html');
    if(!html$) return;
    if(storageTheme) {
      this.theme = storageTheme;
      html$.dataset['theme'] = storageTheme
      this.coreStorageService.setItem(this.THEME_KEY, this.theme);
    }
  }
}
