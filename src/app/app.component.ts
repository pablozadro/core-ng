import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CoreTopnavComponent } from '@/core/components/core-topnav/core-topnav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CoreTopnavComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'core-ng';
}
