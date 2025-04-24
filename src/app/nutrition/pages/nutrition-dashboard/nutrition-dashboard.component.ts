import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import { ParseItemsQueryService } from '@/nutrition/services/parse-items-query.service';

import { DashboardFiltersComponent } from '@/nutrition/components/dashboard-filters/dashboard-filters.component';
import { DashboardItemsComponent } from '@/nutrition/components/dashboard-items/dashboard-items.component';
import { DashboardCalculatorComponent } from '@/nutrition/components/dashboard-calculator/dashboard-calculator.component';

import { AppState } from '@/app.reducer';

import { 
  getItems, 
  getCategories,
  setQuery
} from '@/nutrition/state/nutrition.actions';


@Component({
  selector: 'app-nutrition-dashboard',
  standalone: true,
  imports: [
    DashboardFiltersComponent,
    DashboardItemsComponent,
    DashboardCalculatorComponent,
  ],
  templateUrl: './nutrition-dashboard.component.html',
  styleUrl: './nutrition-dashboard.component.scss'
})
export class NutritionDashboardComponent implements OnInit {
  title = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store<AppState>,
    private readonly parseItemsQueryService: ParseItemsQueryService
  ) {
    this.title = this.route.snapshot.data['title'];
    this.store.dispatch(getCategories());
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const query = this.parseItemsQueryService.getQueryFromParams(params);
      this.store.dispatch(setQuery({ query }));
    });
  }
}
