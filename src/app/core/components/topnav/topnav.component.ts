import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'core-topnav',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.scss'
})
export class TopnavComponent {

}
