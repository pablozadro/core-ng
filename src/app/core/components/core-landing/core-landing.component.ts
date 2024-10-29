import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CoreBrandComponent } from '@/material/components/core-brand/core-brand.component';
import { CoreModalService } from '@/material/services/core-modal.service';
import { CoreInfoComponent } from '../core-info/core-info.component';

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
    private readonly route: ActivatedRoute,
    private readonly coreModalService: CoreModalService
  ) {
    this.title = this.route.snapshot.data['title'];
  }

  onOpenModal() {
    this.coreModalService.open(CoreInfoComponent);
  }
}
