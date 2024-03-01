import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(
    @Inject(DOCUMENT) private document: Document,
  ) { }

  open(id: string) {
    const modal = this.document.querySelector(`#${id} .modal`);
    if (!modal) return;
    modal.classList.add('modal--active');
  }

 close(id: string) {
    const modal = this.document.querySelector(`#${id} .modal`);
    if (!modal) return;
    modal.classList.remove('modal--active');
  }
}
