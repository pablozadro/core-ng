import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreStorageService {

  constructor() { }

  getItem(key: string): any {
    if(!window) return;
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item):null;
  }

  setItem(key: string, data: any) {
    if(!window) return;
    const item = JSON.stringify(data);
    window.localStorage.setItem(key, item);
  }

  removeItem(key: string) {
    window.localStorage.removeItem(key);
  }
}
