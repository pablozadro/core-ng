import { Component } from '@angular/core';
import { CoreBrandComponent } from '../core-brand/core-brand.component';
import { CoreBtnComponent } from '../core-btn/core-btn.component';


@Component({
  selector: 'core-topnav',
  standalone: true,
  imports: [
    CoreBrandComponent,
    CoreBtnComponent
  ],
  templateUrl: './core-topnav.component.html',
  styleUrl: './core-topnav.component.scss'
})
export class CoreTopnavComponent {
  isToggled = false;

  onToggleNav() {
    this.isToggled = !this.isToggled;
  }
}
