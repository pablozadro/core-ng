import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreStorageService {

  getItem(key: string): any {
    if(!window) return;
    const item = window.localStorage.getItem(key);
    if(!item) return null;
    return JSON.parse(item);
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