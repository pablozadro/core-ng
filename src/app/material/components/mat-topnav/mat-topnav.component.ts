import { Component } from '@angular/core';
import { MatBtnComponent } from '@/material/components/mat-btn/mat-btn.component';
import { MatBrandComponent } from '@/material/components/mat-brand/mat-brand.component';


@Component({
  selector: 'app-mat-topnav',
  standalone: true,
  imports: [
    MatBtnComponent,
    MatBrandComponent,
  ],
  templateUrl: './mat-topnav.component.html',
  styleUrl: './mat-topnav.component.scss'
})
export class MatTopnavComponent {
  isToggled = false;

  constructor (
  ) {}

  onToggleNav() {
    this.isToggled = !this.isToggled;
  }
}
