import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoreBrandComponent } from 'core-material';


@Component({
  selector: 'app-core-landing',
  standalone: true,
  imports: [
    CoreBrandComponent
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
