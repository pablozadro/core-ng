import { Component } from '@angular/core';
import { BrandComponent } from '@/material/components/brand/brand.component';

@Component({
  selector: 'core-landing-page',
  standalone: true,
  imports: [BrandComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
