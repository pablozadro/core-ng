import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppState } from '@/app.reducer';
import { selectNutritionItems, NutritionItemsState } from '@/nutrition/state/nutrition.reducer';


@Component({
  selector: 'app-dashboard-summary',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './dashboard-summary.component.html',
  styleUrl: './dashboard-summary.component.scss'
})
export class DashboardSummaryComponent {
  items$!: Observable<NutritionItemsState>;

  constructor(
    private readonly store: Store<AppState>,
  ) {
    this.items$ = this.store.select(selectNutritionItems);
  }
}
