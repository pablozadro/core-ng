import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatBrandComponent } from '@/material/components/mat-brand/mat-brand.component';


@Component({
  selector: 'app-core-landing',
  standalone: true,
  imports: [
    MatBrandComponent
  ],
  templateUrl: './core-landing.component.html',
  styleUrl: './core-landing.component.scss'
})
export class CoreLandingComponent {
  title = '';

  constructor(
    private readonly route: ActivatedRoute
  ) {
    this.title = this.route.snapshot.data['title'];
  }
}
