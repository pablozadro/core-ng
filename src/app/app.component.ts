import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TopnavComponent } from '@/core/components/topnav/topnav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    TopnavComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'core-ng';
}
