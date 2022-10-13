import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-core-topnav',
  templateUrl: './core-topnav.component.html',
  styleUrls: ['./core-topnav.component.scss']
})
export class CoreTopnavComponent implements OnInit {
  isToggled = false;

  constructor() { }

  ngOnInit(): void {
  }

  onKeydown(e: any) {
    if (e.key !== 'Escape') return;
    this.close();
  }

  toggle() {
    this.isToggled = !this.isToggled;
  }

  open() {
    this.isToggled = true;
  }

  close() {
    this.isToggled = false;
  }

  getClass() {
    return this.isToggled ? 'topnav__content is--active' : 'topnav__content';
  }

  logout() {}
}
