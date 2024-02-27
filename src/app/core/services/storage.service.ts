import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreStorageService {
  constructor() { }

  setItem(key: string, data: any) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  getItem(key: string) {
    const item = localStorage.getItem(key);
    return item && JSON.parse(item) || null;
  }
}
