import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreStorageService {
  constructor() { }

  setItem(key: string, data: any) {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(key, JSON.stringify(data));
    }
  }

  removeItem(key: string) {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(key);
    }
  }

  getItem(key: string) {
    if (typeof window !== "undefined") {
      const item = window.localStorage.getItem(key);
      return item && JSON.parse(item) || null;
    }
  }
}
