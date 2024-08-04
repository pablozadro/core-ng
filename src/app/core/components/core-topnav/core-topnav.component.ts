import { Component } from '@angular/core';
import { CoreBrandComponent, CoreBtnComponent } from 'core-x';


@Component({
  selector: 'app-core-topnav',
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
