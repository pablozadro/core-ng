import { Component } from '@angular/core';
import { MatBrandComponent } from '../../../material/components/mat-brand/mat-brand.component';

@Component({
  selector: 'core-landing-page',
  standalone: true,
  imports: [MatBrandComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
